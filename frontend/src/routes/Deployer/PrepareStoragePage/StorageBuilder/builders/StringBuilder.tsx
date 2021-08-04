import React from "react";
import { useTranslation } from "react-i18next";
import { Tag, Form, Input } from 'antd';

import { UnwrappedMichelsonObject } from "../../michelsonStorageParser";
import { extractAnnots } from "./builder";

import "../StorageBuilder.css";

export interface StringBuilderProps {
  object: UnwrappedMichelsonObject;
  index: number;
}

export const StringBuilder: React.FC<StringBuilderProps> = (props) => {
  const {
    object,
    index,
  } = props;
  
  const { t } = useTranslation();
  const name = extractAnnots(index, object.annots);
  
  return (
    <div className="builder-block">
      <div>
        <Tag className="type-tag" color="cyan">String</Tag>
        <label>{name} ({object.prim})</label>
      </div>
      <Form.Item name={name}>
        <Input />
      </Form.Item>
    </div>
  );
}