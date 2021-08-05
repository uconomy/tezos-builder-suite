import { createGlobalState } from 'react-hooks-global-state';
import { FormInstance  } from 'antd';
import { Contract } from '../../graphql/contract';

export type DeployerState = {
  contract?: Contract;
  activeForm?: FormInstance;
  initalStorage?: any;
};

const deplyInitialState = {
  contract: undefined,
  activeForm: undefined,
  initalStorage: undefined,
};

const { useGlobalState } = createGlobalState<DeployerState>(deplyInitialState);

export const useDeployState = useGlobalState;