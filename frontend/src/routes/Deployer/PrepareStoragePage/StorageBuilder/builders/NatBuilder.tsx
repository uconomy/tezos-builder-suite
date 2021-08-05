import { InputNumber } from 'antd';
import React from "react";

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const NatBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  return (
    <Builder object={object} index={index} itemProps={itemProps}>
      <InputNumber placeholder="0" min={0} />
    </Builder>
  );
}