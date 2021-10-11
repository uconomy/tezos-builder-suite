import React from "react";
import { useTranslation } from "react-i18next";
import { Tag, TagProps, Form, FormItemProps } from 'antd';

import { MichelsonPrims, UnwrappedMichelsonObject } from "../../michelsonStorageParser";

import "../StorageBuilder.css";

type TagColor = TagProps['color'];

const colors: { [x in UnwrappedMichelsonObject['prim']]: TagColor } = {
  [MichelsonPrims.UNIT]: 'magenta',
  [MichelsonPrims.BOOL]: 'yellow',
  [MichelsonPrims.BYTES]: 'blue',
  [MichelsonPrims.NAT]: 'red',
  [MichelsonPrims.INT]: 'gold',
  [MichelsonPrims.MUTEZ]: 'purple',
  [MichelsonPrims.TIMESTAMP]: 'volcano',
  [MichelsonPrims.STRING]: 'cyan',
  [MichelsonPrims.ADDRESS]: 'green',
  [MichelsonPrims.KEY]: 'orange',
  [MichelsonPrims.KEY_HASH]: 'orange',
  [MichelsonPrims.SIGNATURE]: 'orange',
  [MichelsonPrims.STORAGE]: 'lime',
  [MichelsonPrims.LIST]: 'volcano',
  [MichelsonPrims.SET]: 'volcano',
  [MichelsonPrims.MAP]: 'blue',
  [MichelsonPrims.BIG_MAP]: 'purple',
  [MichelsonPrims.PAIR]: 'lime',
  [MichelsonPrims.OR]: 'lime',
  "record": 'lime',
};

export function extractAnnots(index: number, annots?: string[]) {
  if (!annots)
    return (Math.floor(index).toString());

  return annots.join(' ').substring(1);
}

export interface BuilderProps {
  object: UnwrappedMichelsonObject;
  index: number;
  hidePrim?: boolean;
  itemProps?: FormItemProps;
  render?: (name: string, o: UnwrappedMichelsonObject) => React.ReactNode;
  className?: string;
}

export const Builder: React.FC<BuilderProps> = (props) => {
  const {
    className,
    object,
    index,
    hidePrim,
    itemProps,
    render,
    children,
  } = props;
  
  const { t } = useTranslation();
  const name = extractAnnots(index, object.annots);
  
  return (
    <div className={`builder-block${className ? ` ${className}` : ''}`}>
      {!hidePrim && <div className="builder-block-label">
        <Tag className="type-tag" color={colors[object.prim]}>
          {t(`prim.${object.prim}`)}
        </Tag>
        { isNaN(parseInt(name)) && <label>{name}</label> }
      </div>}
      { !render
        ? (
          <Form.Item name={name} rules={[{ required: true }]} {...itemProps}>
            {children}
          </Form.Item>
        ) : render(name, object)
      }
    </div>
  );
}