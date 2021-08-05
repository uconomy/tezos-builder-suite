import { DatePicker } from 'antd';
import React from "react";

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const TimestampBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  return (
    <Builder object={object} index={index} itemProps={itemProps}>
      <DatePicker showTime />
    </Builder>
  );
}