import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Endpoint, GET_ENDPOINT } from '../../../../graphql/endpoint';
import { useDeployState } from '../../state';
import "./SignerManager.css";


export const SignerManager: React.FC = () => {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);

  const [Tezos, setTezosToolkit] = useDeployState('Tezos');
  const [wallet, setWallet] = useDeployState('wallet');
  const [signer, setSigner] = useDeployState('signer');

  useEffect(() => {
    if (Tezos) {
      return;
    }

    if (!data || loading || error) {
      return;
    }
    
    setTezosToolkit(new TezosToolkit(data.endpoint.url));
  }, [Tezos, data, loading, error, setTezosToolkit]);

  useEffect(() => {
    if (wallet) {
      return;
    }

    if (!Tezos) {
      return;
    }

    if (!data || loading || error) {
      return;
    }
    
    const w = new BeaconWallet({
      name: t('deployer.signer.wallet.name'),
      disclaimerText: t('deployer.signer.wallet.disclaimerText')
    });

    setWallet(w);
  }, [t, wallet, Tezos, data, loading, error, setWallet]);

  const handleSetupSigner = useCallback(async () => {
    if (!Tezos || !wallet || !data) {
      return;
    }

    await wallet.requestPermissions({ network: { type: data.endpoint.protocolVersion } });

    const address = await wallet.getPKH();
    
    // Tezos.setWalletProvider(wallet);
    Tezos.setProvider({ wallet });

    setSigner(address);
  }, [Tezos, wallet, data, setSigner, setTezosToolkit]);

  if (loading) {
    return <>{t('loadingEndpointSettings')}</>;
  }

  if (error) {
    return <>
      <h1>{t('endpointSettingsError')}</h1>
      <code>{JSON.stringify(error, null, 2)}</code>
    </>;
  }

  return (
    <div>
      Working on endpoint: {data?.endpoint.url}

      {!!signer 
        ? <>Signer will be <em>{signer}</em></>
        : <Button onClick={handleSetupSigner} disabled={!!signer} loading={loading || !!error || !Tezos} icon={<UserOutlined />}>Choose operations signer</Button>
      }
    </div>
  );
}