import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Button } from 'antd';
import { WarningOutlined, ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';

import "./PreviewViewer.css";
import { Tezos } from '../../../../shared/Tezos';
import { useDeployState } from '../../state';
import { ProgressCard } from '../../../../shared/ProgressCard';
import { Endpoint, GET_ENDPOINT } from '../../../../graphql/endpoint';
import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';

type ResultLine = {
  key: string;
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
  "gasLimit": `number`,
  "consumedMilligas": 'number',
  "storageLimit": 'bytes',
  "opSize": 'bytes',
  "minimalFeePerStorageByteMutez": 'mutez',
  "burnFeeMutez": 'mutez',
  "totalCost": 'mutez',
}

export const PreviewViewer: React.FC = () => {
  const { t } = useTranslation();

  const [contract] = useDeployState('contract');
  const [initialStorage] = useDeployState('initialStorage');

  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);
  const [estimate, setEstimates] = useDeployState('estimates');

  const [dataSource, setDataSource] = useState<Results>();
  const [previewError, setPreviewError] = useState<Error>();

  const handlePreviewRequest = useCallback(async () => {
    if (!contract || !initialStorage || !data || loading || error) {
      return;
    }

    setPreviewError(undefined);

    const LocalTezos = new TezosToolkit("https://rpc.tzkt.io/hangzhou2net");

    const faucet = {
      "pkh": "tz1bfrqkLcxWKe7S8VPAooQEdu1xhgx6pNdF",
      "mnemonic": [
        "paper",
        "purse",
        "flock",
        "monitor",
        "hammer",
        "seat",
        "owner",
        "teach",
        "payment",
        "nothing",
        "eternal",
        "math",
        "bring",
        "luxury",
        "club"
      ],
      "email": "gtfdvyfi.jcpkaufh@teztnets.xyz",
      "password": "HfDGi6fBCO",
      "amount": "88934373267",
      "activation_code": "94618f3b77e5f3a4b80a4e664b9948d910766e9d"
    };

    try {
      importKey(LocalTezos, faucet.email, faucet.password, faucet.mnemonic.join(' '), faucet.activation_code);
    } catch(err) {
      console.log('FAILED TO IMPORT KEY', err);
    }

    try {
      const op = await LocalTezos.estimate.originate({
        code: JSON.parse(contract.michelson),
        storage: initialStorage,
      });

      setEstimates(op);
    } catch(err: any) {
      setPreviewError(err);
    }
  }, [contract, initialStorage, data, loading, error, setEstimates, setPreviewError]);

  useEffect(() => {
    if (!contract || !initialStorage || !data || loading || error) {
      return;
    }

    if(!estimate) {
      handlePreviewRequest();
      return;
    }

    const estimatesData: Results = Object.keys(types)
      .map((name, index) => {
        let value = (estimate as any)[name] as number;
        let type = types[name];

        if ((type === 'mutez' && value > 1000000) || name === 'totalCost') {
          type = 'tez';
          value /= 1000000;
        }

        if (name === 'consumedMilligas') {
          value /= 1000;
        }

        return {
          key: `result-${index}`,
          name,
          value,
          type
        }
      });

    setDataSource(estimatesData);
  }, [estimate, contract, initialStorage, data, loading, error, handlePreviewRequest]);

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
      <>
        <ProgressCard 
          Icon={WarningOutlined}
          title={error ? t('deployer.signer.endpointSettingsError') : previewError?.message || ''}
          subtitle={error ? error.message : previewError?.stack || ''}
        />
        <div className="call-to-action">
          <Button onClick={handlePreviewRequest} type="primary" icon={<ReloadOutlined />}>{t('tryAgain')}</Button>
        </div>
      </>
    );
  }

  return (
    <div>
      {
        (!dataSource || !estimate)
        ? <ProgressCard 
            loading={loading || !dataSource || !estimate}
            title={loading ? t('deployer.signer.loadingEndpointSettings') : t('deployer.retrievingEstimates')}
            subtitle={t('deployer.retrievingEstimatesInfo')}
          />
        : <Table className="estimates" columns={columns} dataSource={dataSource} pagination={false} showHeader={false} bordered size="small" />
      }
    </div>
  );
}