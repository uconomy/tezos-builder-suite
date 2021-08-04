import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from 'antd';

import { UnwrappedMichelsonObject } from "../michelsonStorageParser";
import { BoolBuilder } from "./builders/BoolBuilder";
import { BigMapBuilder } from "./builders/BigMapBuilder";
import { StringBuilder } from "./builders/StringBuilder";

import "./StorageBuilder.css";

export interface StorageBuilderProps {
  unwrappedMichelson?: UnwrappedMichelsonObject[];
}

export const StorageBuilder: React.FC<StorageBuilderProps> = ({ unwrappedMichelson }) => {
  const { t } = useTranslation();
  
  const renderBuilder = (o: UnwrappedMichelsonObject, index: number) => {
    switch (o.prim) {
      case 'bool':
        return <BoolBuilder key={`storage-${index}`} object={o} index={index} />
      case 'big_map':
        return <BigMapBuilder key={`storage-${index}`} object={o} index={index} />
      default:
        return <StringBuilder key={`storage-${index}`} object={o} index={index} />
      // default:
      //   return <div>Unknown prim {o.prim}</div>
    }
  }

  return (
    <Form 
      onFieldsChange={(o, allFields) => console.log('FORM CHANGED', allFields.map(x => x.name + ": " + x.value))}
    >
      {unwrappedMichelson?.map(renderBuilder)}
    </Form>
  );
}