export type Endpoint = {
  url: string;
  protocolVersion: NetworkType;
};

export enum NetworkType {
  MAINNET = "mainnet",
  DELPHINET = "delphinet",
  EDONET = "edonet",
  FLORENCENET = "florencenet",
  GRANADANET = "granadanet",
  CUSTOM = "custom"
};
