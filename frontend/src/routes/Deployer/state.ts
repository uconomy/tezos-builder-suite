import { createGlobalState } from 'react-hooks-global-state';
import { FormInstance  } from 'antd';
import { Contract } from '../../graphql/contract';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { Estimate } from '@taquito/taquito/dist/types/estimate/estimate';

export type DeployerState = {
  contract?: Contract;
  activeForm?: FormInstance;
  initialStorage?: any;
  storageContent?: any;
  signer?: string;
  Tezos?: TezosToolkit;
  wallet?: BeaconWallet;
  estimates?: Estimate;
  operationHash?: string;
  contractAddress?: string;
  signWith?: 'wallet' | 'faucet' | 'privateKey';
};

const deplyInitialState: DeployerState = {
  contract: undefined,
  activeForm: undefined,
  initialStorage: undefined,
  storageContent: undefined,
  signer: undefined,
  Tezos: undefined,
  wallet: undefined,
  estimates: undefined,
  operationHash: undefined,
  contractAddress: undefined,
  signWith: undefined,
};

const { useGlobalState } = createGlobalState<DeployerState>(deplyInitialState);

export const useDeployState = useGlobalState;