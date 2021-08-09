import { Contract } from "./domain/contract";
import { Endpoint } from "./domain/endpoint";

export type TezosBeaconRemoteOptions = {
  port: number;
  openBrowser: boolean;
};

export type TezosBeaconRemoteContext = {
  contracts: Contract[];
  endpoint: Endpoint;
};