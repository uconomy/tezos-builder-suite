import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { importKey, InMemorySigner } from '@taquito/signer';
import { Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Endpoint, GET_ENDPOINT } from '../../../../../graphql/endpoint';
import { useDeployState } from '../../../state';
import "./SignerManager.css";
import { SignerCard } from './SignerCard';


export const SignerManager: React.FC = () => {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);

  const [Tezos, setTezosToolkit] = useDeployState('Tezos');
  const [wallet, setWallet] = useDeployState('wallet');
  const [signer, setSigner] = useDeployState('signer');
  const [signWith, setSignedWith] = useDeployState('signWith');
  const [opHash] = useDeployState('operationHash');

  useEffect(() => {
    if (Tezos) {
      return;
    }

    if (!data || loading || error) {
      return;
    }
    
    setTezosToolkit(new TezosToolkit(data.endpoint.url));
  }, [Tezos, data, loading, error, setTezosToolkit]);

  const setupWallet = useCallback(() => {
    if (wallet) {
      return;
    }

    const w = new BeaconWallet({
      name: t('deployer.signer.wallet.name'),
      disclaimerText: t('deployer.signer.wallet.disclaimerText')
    });

    setSignedWith('wallet');
    setWallet(w);
  }, [wallet, setWallet, setSignedWith, t]);

  useEffect(() => {
    if (wallet || signer) {
      return;
    }

    if (!Tezos) {
      return;
    }

    if (!data || loading || error) {
      return;
    }

    const endpoint = data.endpoint;
    if (endpoint.scope === 'mainnet' || (endpoint.scope === 'testnet' && !endpoint.faucet && !endpoint.signerPrivateKey)) {
      setupWallet();
    } else {
      if (endpoint.faucet) {
        const { email, password, mnemonic, secret } = endpoint.faucet;

        // Mnemonic gets always as string from backend
        importKey(Tezos, email, password, mnemonic as string, secret);

        setSigner(email);
        setSignedWith('faucet');
      } else if (endpoint.signerPrivateKey) {
        const pk = endpoint.signerPrivateKey;

        Tezos.setProvider({
          signer: new InMemorySigner(pk)
        });

        setSigner(`${pk.substring(0, 3)}...${pk.substring(pk.length - 4)}`);
        setSignedWith('privateKey');
      }
    }
  }, [t, wallet, signer, Tezos, data, loading, error, setupWallet, setSigner, setSignedWith]);

  const handleSetupSigner = useCallback(async () => {
    if (!Tezos || !wallet || !data) {
      return;
    }

    await wallet.requestPermissions({ 
      network: { type: data.endpoint.protocolVersion },
    });

    const address = await wallet.getPKH();
    
    // Tezos.setWalletProvider(wallet);
    Tezos.setProvider({ wallet });

    setSigner(address);
  }, [Tezos, wallet, data, setSigner]);

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
    <div className="signer-manager">
      <SignerCard signer={signer} signWith={signWith} />

      { (signWith === 'wallet' && !opHash) &&
      <div className="call-to-action">
        { !signer 
          ? <Button 
              type="primary"
              size="large"
              onClick={handleSetupSigner}
              disabled={!!signer}
              loading={loading || !!error || !Tezos}
              icon={<UserOutlined />}
            >{t('deployer.chooseSigner')}</Button>
          : <Button 
              type="default"
              size="middle"
              onClick={handleSetupSigner}
              loading={loading || !!error || !Tezos}
              icon={<UserSwitchOutlined />}
            >{t('deployer.changeSigner')}</Button>
        }
      </div>
      }
    </div>
  );
}