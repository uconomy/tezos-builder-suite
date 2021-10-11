import { Form, Button, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React from "react";

import "../StorageBuilder.css";
import { Builder, BuilderProps, extractAnnots } from "./Builder";
import { UnwrappedComplexMichelsonObject, UnwrappedMichelsonObject } from '../../michelsonStorageParser';
import { renderBuilder } from '.';

interface FormListFieldData {
  name: number;
  key: number;
  fieldKey: number;
}

export const MapBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;

  const { t } = useTranslation();

  const renderMapBuilders = (name: string, data: FormListFieldData, list: UnwrappedMichelsonObject[]) => {
    return (
      <>
        { list.length > 1
          ? list.map((item, index) => (
              renderBuilder({ ...item }, index, {
                name: [data.name, name, extractAnnots(index, item?.annots)],
                fieldKey: [data.fieldKey, name, extractAnnots(index, item?.annots)],
                rules: [{ required: true }]
              })
            ))
          : renderBuilder({ ...list[0] }, 0, {
            name: [data.name, name],
            fieldKey: [data.fieldKey, name],
            rules: [{ required: true }]
          })
        }
      </>
    );
  }
  
  return (
    <Builder className="list-block" object={object} index={index} render={(name: string, object: UnwrappedMichelsonObject) => (
      <Form.List name={itemProps?.name || name} initialValue={[]}>
        {
          (fields, { add, remove }, { errors }) => {
            // Build table data here
            const columns = [
              {
                title: t(`key`),
                dataInde: 'key',
                key: 'key',
                render: (data: FormListFieldData) => renderMapBuilders('0', data, (object as UnwrappedComplexMichelsonObject).key)
              },
              {
                title: t(`value`),
                dataInde: 'value',
                key: 'value',
                render: (data: FormListFieldData) => renderMapBuilders('1', data, (object as UnwrappedComplexMichelsonObject).value)
              },
              {
                className: 'actions',
                render: (data: FormListFieldData) => <MinusCircleOutlined
                  onClick={() => remove(data.name)}
                />
              }
            ];

            return (
              <div className={ fields.length > 0 ? "list-block-spacer" : "list-add-button" }>
                {fields.length > 0 && <Table columns={columns} dataSource={fields} className="list-table" bordered pagination={false} />}
                <Button
                  type="dashed"
                  size="small"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >{t('add_items_to', { name })}</Button>
                <Form.ErrorList errors={errors} />
              </div>
            );
          }
        }
      </Form.List>
    )} />
  );
}