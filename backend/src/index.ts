import express from 'express';
import serveStatic from 'serve-static';
import open from 'open';
import path from 'path';
import { createApolloServer, schema } from './graphql';
import { TezosBeaconRemoteContext, TezosBeaconRemoteOptions } from './types';
import { NetworkType } from './domain/endpoint';
import { Contract } from "./domain/contract";
import { Endpoint } from "./domain/endpoint";

export {
  TezosBeaconRemoteOptions,
  TezosBeaconRemoteContext,
  NetworkType,
  Contract,
  Endpoint,
};

const defaultOptions: TezosBeaconRemoteOptions = {
  port: 4000,
  openBrowser: true,
};

export async function launchTezosBeaconRemote(context: TezosBeaconRemoteContext, options?: Partial<TezosBeaconRemoteOptions>) {
  const {
    port,
    openBrowser,
  }: TezosBeaconRemoteOptions = Object.assign({}, defaultOptions, options);

  const {
    endpoint,
    contracts,
  } = context;

  const app = express();

  // Instance Graphql server
  const server = await createApolloServer(app, schema, () => ({
    endpoint,
    contracts
  }));

  // Serve frontend bundle
  app.use(serveStatic(path.resolve(__dirname, 'frontend')));

  // Server startup
  await new Promise<void>(resolve => app.listen({ port: port }, () => resolve()));

  if (openBrowser) {
    await open(`http://localhost:${port}`);
  }

  console.log(`🚀  Tezos Beacon Remote is locally available at http://localhost:${port}/`);
}
