import React, { useCallback } from 'react';
import { CloudServerOutlined, CloudUploadOutlined, ContainerOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProgressCard } from '../../../../../shared/ProgressCard';
import { useDeployState } from '../../../state';

import "./DeployManager.css";
import { Endpoint, GET_ENDPOINT } from '../../../../../graphql/endpoint';
import { Contract, CONTRACT_DEPLOY_COMPLETED } from '../../../../../graphql/contract';

export const DeployManager: React.FC = () => {
  const { t } = useTranslation();

  const { data } = useQuery<{ endpoint: Endpoint }>(GET_ENDPOINT);
  const [onDeployCompleted] = useMutation<{ contract: Contract; address: string; }>(CONTRACT_DEPLOY_COMPLETED);

  const [Tezos] = useDeployState('Tezos');
  const [signer] = useDeployState('signer');
  const [contract] = useDeployState('contract');
  const [initialStorage] = useDeployState('initialStorage');

  const [opHash, setOperationHash] = useDeployState('operationHash');
  const [contractAddress, setContractAddress] = useDeployState('contractAddress');

  const handleDeployContract = useCallback(async () => {
    if (!Tezos || !signer || !contract || !initialStorage) {
      return;
    }

    const op = await Tezos.wallet.originate({
      code: JSON.parse(contract.michelson),
      storage: initialStorage,
    }).send();

    const opHash = op.opHash;
    setOperationHash(opHash);

    const deployedContract = await op.contract();
    setContractAddress(deployedContract.address);

    const receipt = await op.receipt();
    console.log('RECEIPT', receipt);

    await onDeployCompleted({
      variables: {
        contract: {
          name: contract.name,
          code: contract.code,
          michelson: contract.michelson
        },
        address: deployedContract.address,
      }
    });
  }, [Tezos, signer, contract, initialStorage, setOperationHash, setContractAddress, onDeployCompleted]);

  const protocolVersion = data?.endpoint.protocolVersion;
  const isSandbox = data?.endpoint.scope === 'sandbox' || false;

  return (
    <div className="deploy-manager">
      { opHash && 
        <ProgressCard
          className={`operation-card${!contractAddress ? ' warning' : ''}`}
          loading={!contractAddress}
          Icon={CloudServerOutlined}
          title={t('deployer.operationForged', { hash: opHash })}
          subtitle={t(`deployer.operationForged${!contractAddress ? 'Warning' : 'Info'}`)}
        />
      }

      { !contractAddress
        ? <div className="call-to-action">
            <Button 
              type="primary"
              size="large"
              className="mega-button"
              onClick={handleDeployContract}
              disabled={!signer}
              loading={!!opHash}
              icon={<CloudUploadOutlined />}
            >{t('deployer.deploy', { name: contract?.name })}</Button>
          </div>
        : <ProgressCard
            className="contract-card"
            Icon={ContainerOutlined}
            title={t('deployer.contractDeployed', { address: contractAddress })}
            subtitle={t('deployer.contractDeployedInfo')}
          />
    }

      { !isSandbox &&
      <div className="call-to-action">
        { opHash && <a rel="noreferrer" href={`https://${protocolVersion !== 'mainnet' ? `${protocolVersion}.` : ''}tzkt.io/${opHash}`} target="_blank">{t('deployer.external.viewOperationTzkt')}</a> }
        { contractAddress && <a rel="noreferrer" href={`https://better-call.dev/search?text=${contractAddress}`} target="_blank">{t('deployer.external.viewContractBcd')}</a> }
      </div>
      }
    </div>
  );
}