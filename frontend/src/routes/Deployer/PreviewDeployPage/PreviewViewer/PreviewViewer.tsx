import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import "./PreviewViewer.css";
import { Estimate } from '@taquito/taquito/dist/types/contract/estimate';
import { Tezos } from '../../../../shared/Tezos';

export interface PreviewViewerProps {
  estimate?: Estimate;
  onRequestPreview: () => void;
};

type ResultLine = {
  value: number;
  name: string;
  type: 'tez'| 'mutez' | 'number' | 'bytes';
};
type Results = ResultLine[];

const types: { [x: string]: ResultLine['type'] } = {
  "baseFeeMutez": 'mutez',
  "minimalFeeMutez": 'mutez',
  "suggestedFeeMutez": 'mutez',
  "operationFeeMutez": 'mutez',
  "burnFeeMutez": 'mutez',
  "gasLimit": `number`,
  "consumedMilligas": 'number',
  "storageLimit": 'bytes',
  "opSize": 'bytes',
  "minimalFeePerStorageByteMutez": 'mutez',
  "totalCost": 'mutez',
}

export const PreviewViewer: React.FC<PreviewViewerProps> = (props) => {
  const { estimate, onRequestPreview } = props;

  const { t } = useTranslation();

  const [dataSource, setDataSource] = useState<Results>();

  useEffect(() => {
    if(!estimate) {
      onRequestPreview && onRequestPreview();
      return;
    }

    const data: Results = Object.keys(types)
      .map(name => {
        let value = (estimate as any)[name] as number;
        let type = types[name];

        if (type === 'mutez' && value > 1000000) {
          type = 'tez';
          value /= 1000000;
        }

        if (name === 'consumedMilligas') {
          value /= 1000;
        }

        return {
          name,
          value,
          type
        }
      });

    setDataSource(data);
  }, [estimate, onRequestPreview]);

  const columns = [
    {
      width: 150,
      render: ({ value, type, name }: ResultLine) => (
        <div className={`estimate-${type} ${name}`}>
        {
          type === 'number' || type === 'bytes'
          ? <>{value}{type === 'bytes' ? ' bytes' : null}</>
          : <Tezos value={value} mutez={type === 'mutez'} />
        }
        </div>
      )
    },
    {
      render: ({ name }: ResultLine) => <div className={`${name}`}>{t(`deployer.estimates.${name}`)}</div>
    }
  ];

  return (
    <div>
      {
        !dataSource 
        ? <div className="progress-card">
            <LoadingOutlined className="big-icon" />
            <div className="progress-card-message">
              <label>{t('deployer.retrievingEstimates')}</label>
              <span>{t('deployer.retrievingEstimatesInfo')}</span>
            </div>
          </div>
        : <Table className="estimates" columns={columns} dataSource={dataSource} pagination={false} showHeader={false} bordered size="small" />
      }
    </div>
  );
}