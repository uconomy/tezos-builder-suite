import { InputNumber } from 'antd';
import React from "react";

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const MutezBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  return (
    <Builder object={object} index={index} itemProps={itemProps}>
      <InputNumber min={0} max={Number.MAX_SAFE_INTEGER} placeholder="0" />
    </Builder>
  );
}