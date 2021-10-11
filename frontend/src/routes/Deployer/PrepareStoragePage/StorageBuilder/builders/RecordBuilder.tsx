import React from "react";
import { renderBuilder } from '.';
import { UnwrappedMichelsonObject } from '../../michelsonStorageParser';

import "../StorageBuilder.css";
import { Builder, BuilderProps } from "./Builder";

export const RecordBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  return (
    <Builder className="record-block" object={object} index={index} itemProps={{ ...itemProps, className: "full-width" }}>
      {(object as any).args.map((x: UnwrappedMichelsonObject, i: number) => renderBuilder(x, i))}
    </Builder>
  );
}