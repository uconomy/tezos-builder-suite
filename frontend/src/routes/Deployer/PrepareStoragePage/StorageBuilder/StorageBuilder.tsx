import React, { useEffect, useCallback } from "react";
import { Form } from 'antd';

import { UnwrappedMichelsonObject } from "../michelsonStorageParser";

import "./StorageBuilder.css";
import { renderBuilder } from "./builders";
import { useDeployState } from "../../state";

export interface StorageBuilderProps {
  unwrappedMichelson?: UnwrappedMichelsonObject[];
}

export const StorageBuilder: React.FC<StorageBuilderProps> = ({ unwrappedMichelson }) => {
  const [storageForm] = Form.useForm();
  const [, setActiveForm] = useDeployState('activeForm');
  const [, setInitialStorage] = useDeployState('initalStorage');

  useEffect(() => {
    setActiveForm(storageForm);

    return () => {
      setActiveForm(undefined);
    }
  }, [storageForm, setActiveForm]);

  const handleFinish = useCallback((formValues: any) => {
    console.log('FORM FINISH', JSON.stringify(formValues, null, 2));

    setInitialStorage(formValues);
  }, [setInitialStorage]);

  return (
    <Form 
      form={storageForm}
      onFinish={handleFinish}
    >
      {unwrappedMichelson?.map((x, i) => renderBuilder(x, i))}
    </Form>
  );
}