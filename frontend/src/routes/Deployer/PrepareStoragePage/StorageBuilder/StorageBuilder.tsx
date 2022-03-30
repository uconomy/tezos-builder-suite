import React, { useEffect, useCallback, useState } from "react";
import { StopOutlined } from '@ant-design/icons';
import { useTranslation  } from "react-i18next";
import { Form } from 'antd';

import { UnwrappedMichelsonObject } from "../michelsonStorageParser";

import "./StorageBuilder.css";
import { renderBuilder } from "./builders";
import { useDeployState } from "../../state";
import { StorageImporter } from "../storageImporter";
import { ProgressCard } from "../../../../shared/ProgressCard";
import { CodeViewer } from "../../../../shared/CodeViewer";

export interface StorageBuilderProps {
  unwrappedMichelson?: UnwrappedMichelsonObject[];
  onFinish: () => void;
}

export const StorageBuilder: React.FC<StorageBuilderProps> = ({ unwrappedMichelson, onFinish }) => {
  const { t } = useTranslation();

  const [storageForm] = Form.useForm();

  const [contract] = useDeployState('contract');
  const [, setActiveForm] = useDeployState('activeForm');
  const [, setInitialStorage] = useDeployState('initialStorage');
  const [storageContent, setStorageContent] = useDeployState('storageContent');
  const [, setEstimates] = useDeployState('estimates');

  const [error, setError] = useState<any>();

  useEffect(() => {
    setActiveForm(storageForm);

    return () => {
      setActiveForm(undefined);
    }
  }, [storageForm, setActiveForm]);

  const handleFinish = useCallback((formValues: any) => {
    console.log('FORM FINISH', JSON.stringify(formValues, null, 2));

    if (!contract) {
      return;
    }

    const importer = new StorageImporter(contract.michelson);

    setStorageContent(formValues);
    setEstimates(undefined);

    try {
      const storage = importer.fromJSON(formValues);

      console.log('GENERATED STORAGE', storage);

      setInitialStorage(storage);
      onFinish();
    } catch (err: any) {
      if (err.name.endsWith('TypecheckError')) {
        setError(err);
      }

      console.log("STORAGE FAILED", err);
    }
  }, [contract, setStorageContent, setEstimates, setInitialStorage, onFinish]);

  return (
    <>
      { error && 
        <ProgressCard
          Icon={StopOutlined}
          className="validation-error"
          title={t('deployer.storageValidationError', { ...error })}
          subtitle={t('deployer.storageValidationErrorInfo')}
        >
          <CodeViewer code={JSON.stringify(error || '', null, 2)} language="json" />
        </ProgressCard>
      }
      <Form 
        onFieldsChange={() => setError(undefined)}
        form={storageForm}
        initialValues={storageContent}
        onFinish={handleFinish}
      >
        {unwrappedMichelson?.map((x, i) => renderBuilder(x, i))}
      </Form>
    </>
  );
}