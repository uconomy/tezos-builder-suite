import React, { useEffect, useCallback } from "react";
import { Form } from 'antd';

import { UnwrappedMichelsonObject } from "../michelsonStorageParser";

import "./StorageBuilder.css";
import { renderBuilder } from "./builders";
import { useDeployState } from "../../state";
import { StorageImporter } from "../storageImporter";

export interface StorageBuilderProps {
  unwrappedMichelson?: UnwrappedMichelsonObject[];
}

export const StorageBuilder: React.FC<StorageBuilderProps> = ({ unwrappedMichelson }) => {
  const [storageForm] = Form.useForm();
  const [contract] = useDeployState('contract');
  const [, setActiveForm] = useDeployState('activeForm');
  const [, setInitialStorage] = useDeployState('initialStorage');
  const [storageContent, setStorageContent] = useDeployState('storageContent');
  const [, setEstimates] = useDeployState('estimates');

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

    const storage = importer.fromJSON(formValues);

    console.log('GENERATED STORAGE', storage);

    setInitialStorage(storage);
  }, [contract, setStorageContent, setEstimates, setInitialStorage]);

  return (
    <Form 
      form={storageForm}
      initialValues={storageContent}
      onFinish={handleFinish}
    >
      {unwrappedMichelson?.map((x, i) => renderBuilder(x, i))}
    </Form>
  );
}