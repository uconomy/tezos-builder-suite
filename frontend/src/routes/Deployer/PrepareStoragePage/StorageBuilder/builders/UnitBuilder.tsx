import React from "react";
import { Input } from 'antd';

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const UnitBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps
  } = props;
  
  return (
    <Builder object={object} index={index} itemProps={{ ...itemProps, rules: [] }}>
      <Input type="hidden" value={object.annots ? object.annots.join(' ') : ''} />
    </Builder>
  );
}