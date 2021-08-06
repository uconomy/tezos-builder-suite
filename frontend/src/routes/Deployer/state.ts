import { createGlobalState } from 'react-hooks-global-state';
import { FormInstance  } from 'antd';
import { Contract } from '../../graphql/contract';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';

export type DeployerState = {
  contract?: Contract;
  activeForm?: FormInstance;
  initialStorage?: any;
  storageContent?: any;
  signer?: string;
  Tezos?: TezosToolkit;
  wallet?: BeaconWallet;
};

const deplyInitialState = {
  contract: undefined,
  activeForm: undefined,
  initialStorage: undefined,
  storageContent: undefined,
  signer: undefined,
  Tezos: undefined,
  wallet: undefined,
};

const { useGlobalState } = createGlobalState<DeployerState>(deplyInitialState);

export const useDeployState = useGlobalState;