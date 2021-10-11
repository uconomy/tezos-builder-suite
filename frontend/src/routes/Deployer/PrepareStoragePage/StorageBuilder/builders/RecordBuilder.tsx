import { NamePath } from "antd/lib/form/interface";
import React from "react";
import { renderBuilder } from '.';
import { UnwrappedMichelsonObject } from '../../michelsonStorageParser';

import "../StorageBuilder.css";
import { Builder, BuilderProps, extractAnnots } from "./Builder";

function joinName(name: NamePath | undefined, annots: string[] | undefined, rest: any[]) {
  const res: NamePath = [];
  if (name) {
    if (typeof name === 'number' || typeof name === 'string') {
      res.push(name);
    } else {
      res.push(...name);
    }
  } else {
    res.push(extractAnnots(0, annots));
  }

  res.push(...rest);

  return res;
}

export const RecordBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;
  
  return (
    <Builder className="record-block" object={object} index={index} itemProps={{ ...itemProps, className: "full-width" }} render={
      () => (
        <div>
          {(object as any).args.map((x: UnwrappedMichelsonObject, i: number) => renderBuilder(x, i, {
            name: joinName(itemProps?.name, object.annots, [extractAnnots(i, x.annots)]),
            fieldKey: joinName(itemProps?.fieldKey, object.annots, [extractAnnots(i, x.annots)]),
            rules: [{ required: true }]
          }))}
        </div>
      )
    }/>
  );
}