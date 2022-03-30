import { FaucetAccount } from "../tezos";

export type Endpoint = {
  url: string;
  scope: NetworkScope;
  protocolVersion: NetworkType;
  signerPrivateKey?: string;
  faucet?: FaucetAccount;
};

export type NetworkScope = 'mainnet' | 'testnet' | 'sandbox';

export enum NetworkType {
  MAINNET = "mainnet",
  DELPHINET = "delphinet",
  EDONET = "edonet",
  FLORENCENET = "florencenet",
  GRANADANET = "granadanet",
  HANGZHOUNET = "hangzhounet",
  ITHACANET = "ithacanet",
  CUSTOM = "custom"
};
