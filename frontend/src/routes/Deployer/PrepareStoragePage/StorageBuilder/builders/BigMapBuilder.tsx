import React from "react";
import { useTranslation } from "react-i18next";
import { Tag } from 'antd';

import { UnwrappedMichelsonObject } from "../../michelsonStorageParser";
import { extractAnnots } from "./builder";

import "../StorageBuilder.css";

export interface BigMapBuilderProps {
  object: UnwrappedMichelsonObject;
  index: number;
}

export const BigMapBuilder: React.FC<BigMapBuilderProps> = (props) => {
  const {
    object,
    index,
  } = props;
  
  const { t } = useTranslation();
  
  return (
    <div className="builder-block">
      <Tag className="type-tag" color="purple">Big Map</Tag>
      <label>{extractAnnots(index, object.annots)}</label>
      
    </div>
  );
}