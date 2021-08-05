import { Select } from 'antd';
import React from "react";
import { renderBuilder } from '.';
import { UnwrappedMichelsonObject } from '../../michelsonStorageParser';

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const OrBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  const value = (object as unknown as any).args as [UnwrappedMichelsonObject, UnwrappedMichelsonObject];

  return (
    <Builder object={object} index={index} hidePrim itemProps={{ ...itemProps, className: "full-width" }}>
      <Select style={{ padding: 0 }} >
        <Select.Option value={value[0]?.annots?.[0] || 0}>
          {renderBuilder(value[0], 0)}
        </Select.Option>

        <Select.Option value={value[1]?.annots?.[0] || 1}>
          {console.log("VALUE[1]", value[1])}
          {renderBuilder(value[1], 1)}
        </Select.Option>
      </Select>
    </Builder>
  );
}