import { Contract } from "./domain/contract";
import { Endpoint } from "./domain/endpoint";

export type TezosBuilderSuiteOptions = {
  port: number;
  openBrowser: boolean;
};

export type TezosBuilderSuiteContext = {
  contracts: Contract[];
  endpoint: Endpoint;
  onDeployCompleted?: (contract: Contract, address: string) => void;
};