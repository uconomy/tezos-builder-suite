import { createGlobalState } from 'react-hooks-global-state';
import { Contract } from '../../graphql/contract';

export type DeployerState = {
  contract?: Contract;
};

const deplyInitialState = {
  contract: undefined,
};

const { useGlobalState } = createGlobalState<DeployerState>(deplyInitialState);

export const useDeployState = useGlobalState;