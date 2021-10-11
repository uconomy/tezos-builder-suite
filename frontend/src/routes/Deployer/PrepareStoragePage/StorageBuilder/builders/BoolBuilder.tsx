import { Switch } from 'antd';
import React from "react";

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const BoolBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  return (
    <Builder object={object} index={index} itemProps={{ ...itemProps, valuePropName: "checked", initialValue: false }}>
      <Switch/>
    </Builder>
  );
}