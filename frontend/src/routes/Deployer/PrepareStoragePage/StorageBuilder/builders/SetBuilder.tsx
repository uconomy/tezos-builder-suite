import { Form, Button, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import React from "react";

import "../StorageBuilder.css";
import { Builder, BuilderProps, extractAnnots } from "./Builder";
import { UnwrappedMichelsonObject, UnwrappedSimpleMichelsonObject } from '../../michelsonStorageParser';
import { renderBuilder } from '.';

interface FormListFieldData {
  name: number;
  key: number;
  fieldKey: number;
}

export const SetBuilder: React.FC<BuilderProps> = (props) => {
  const {
    object,
    index,
    itemProps,
  } = props;

  const { t } = useTranslation();

  const renderMapBuilders = (data: FormListFieldData, list: UnwrappedMichelsonObject[]) => {
    console.log('BUILKDDDDDDD', {
      name: [data.name, extractAnnots(index, ['annots'])],
      fieldKey: [data.fieldKey, extractAnnots(index, ['annots'])],
      rules: [{ required: true }]
    });

    return (
      <>
        { list.length > 1
          ? list.map((item, index) => (
              renderBuilder({ ...item }, index, {
                name: [data.name, extractAnnots(index, item?.annots)],
                fieldKey: [data.fieldKey, extractAnnots(index, item?.annots)],
                rules: [{ required: true }]
              })
            ))
          : renderBuilder({ ...list[0] }, 0, {
            name: [data.name],
            fieldKey: [data.fieldKey],
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
                title: t(`value`),
                dataInde: 'value',
                key: 'value',
                render: (data: FormListFieldData) => renderMapBuilders(data, (object as UnwrappedSimpleMichelsonObject).value)
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