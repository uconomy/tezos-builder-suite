import express from 'express';
import serveStatic from 'serve-static';
import open from 'open';
import path from 'path';
import { createApolloServer, schema } from './graphql';
import { TezosBuilderSuiteContext, TezosBuilderSuiteOptions } from './types';
import { NetworkScope, NetworkType } from './domain/endpoint';
import { Contract } from "./domain/contract";
import { Endpoint } from "./domain/endpoint";

export {
  TezosBuilderSuiteOptions,
  TezosBuilderSuiteContext,
  NetworkScope,
  NetworkType,
  Contract,
  Endpoint,
};

const defaultOptions: TezosBuilderSuiteOptions = {
  port: 4000,
  openBrowser: true,
};

export async function launchDeployer(context: TezosBuilderSuiteContext, options?: Partial<TezosBuilderSuiteOptions>) {
  const {
    port,
    openBrowser,
  }: TezosBuilderSuiteOptions = Object.assign({}, defaultOptions, options);

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

  console.log(`🚀  Tezos Builder Suite is locally available at http://localhost:${port}/`);
}
