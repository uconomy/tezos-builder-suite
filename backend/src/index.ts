import express from 'express';
import serveStatic from 'serve-static';
import open from 'open';
import { Contract } from './domain/contract';
import { Endpoint, NetworkType } from './domain/endpoint';
import { createApolloServer, schema } from './graphql';
import { TezosBeaconRemoteContext, TezosBeaconRemoteOptions } from './types';

export type {
  TezosBeaconRemoteOptions,
  TezosBeaconRemoteContext
};

const defaultOptions: TezosBeaconRemoteOptions = {
  port: 4000,
  openBrowser: true,
};

export async function launch(context: TezosBeaconRemoteContext, options?: Partial<TezosBeaconRemoteOptions>) {
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
  app.use(serveStatic('../frontend/build'));

  // Server startup
  await new Promise<void>(resolve => app.listen({ port: port }, () => resolve()));

  if (openBrowser) {
    await open(`http://localhost:${port}`);
  }

  console.log(`🚀  Tezos Beacon Remote is locally available at http://localhost:${port}/`);
}
