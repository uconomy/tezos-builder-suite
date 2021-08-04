import React from "react";
import { useTranslation } from "react-i18next";
import { Tag, Switch, Form } from 'antd';

import { UnwrappedMichelsonObject } from "../../michelsonStorageParser";
import { extractAnnots } from "./builder";

import "../StorageBuilder.css";

export interface BoolBuilderProps {
  object: UnwrappedMichelsonObject;
  index: number;
}

export const BoolBuilder: React.FC<BoolBuilderProps> = (props) => {
  const {
    object,
    index,
  } = props;
  
  const { t } = useTranslation();

  const name = extractAnnots(index, object.annots);
  
  return (
    <div className="builder-block">
      <div>
        <Tag className="type-tag" color="yellow">Bool</Tag>
        <label>{name}</label>
      </div>
      <Form.Item name={name} valuePropName="checked">
        <Switch />
      </Form.Item>
    </div>
  );
}