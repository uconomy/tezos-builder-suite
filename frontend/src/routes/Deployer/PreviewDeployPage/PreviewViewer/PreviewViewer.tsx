import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';

import "./PreviewViewer.css";
import { Tezos } from '../../../../shared/Tezos';
import { useDeployState } from '../../state';
import { ProgressCard } from '../../../../shared/ProgressCard';
import { Endpoint, GET_ENDPOINT } from '../../../../graphql/endpoint';
import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';

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

export const PreviewViewer: React.FC = () => {
  const { t } = useTranslation();

  const [contract] = useDeployState('contract');
  const [initialStorage] = useDeployState('initialStorage');

  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);
  const [estimate, setEstimates] = useDeployState('estimates');

  const [dataSource, setDataSource] = useState<Results>();
  const [previewError, throwPreviewError] = useState<Error>();

  const handlePreviewRequest = useCallback(async () => {
    if (!contract || !initialStorage || !data || loading || error) {
      return;
    }

    const LocalTezos = new TezosToolkit(data.endpoint.url);

    const faucet = {
      "mnemonic": [
        "home",
        "project",
        "ladder",
        "wrestle",
        "job",
        "opera",
        "diesel",
        "pelican",
        "abuse",
        "regret",
        "thought",
        "copy",
        "jar",
        "lens",
        "update"
      ],
      "secret": "8590ffddd7accb49fbb530ef24ff659b1f01314f",
      "amount": "8446026769",
      "pkh": "tz1PXAMbT7qszu7kzTCdbf6ZWJ5draAqSQCz",
      "password": "1VnbD0Fpmv",
      "email": "cxjfzamw.rpqmqqvb@tezos.example.org"
    };
    try {
      importKey(LocalTezos, faucet.email, faucet.password, faucet.mnemonic.join(' '), faucet.secret);
    } catch(err) {
      console.log('FAILED TO IMPORT KEY', err);
    }

    try {
      const op = await LocalTezos.estimate.originate({
        code: JSON.parse(contract.michelson),
        storage: initialStorage,
      });

      setEstimates(op);
    } catch(err) {
      throwPreviewError(err);
    }
  }, [contract, initialStorage, data, loading, error]);

  useEffect(() => {
    if (!contract || !initialStorage || !data || loading || error) {
      return;
    }

    if(!estimate) {
      handlePreviewRequest();
      return;
    }

    const estimatesData: Results = Object.keys(types)
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

    setDataSource(estimatesData);
  }, [estimate, contract, initialStorage, data, loading, error]);

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

  if (error || previewError) {
    return (
      <ProgressCard 
        Icon={WarningOutlined}
        title={error ? t('endpointSettingsError') : previewError?.message || ''}
        subtitle={error ? error.message : previewError?.stack || ''}
      />
    );
  }

  return (
    <div>
      {
        (!dataSource || !estimate)
        ? <ProgressCard 
            loading={loading || !dataSource || !estimate}
            title={loading ? t('loadingEndpointSettings') : t('deployer.retrievingEstimates')}
            subtitle={t('deployer.retrievingEstimatesInfo')}
          />
        : <Table className="estimates" columns={columns} dataSource={dataSource} pagination={false} showHeader={false} bordered size="small" />
      }
    </div>
  );
}