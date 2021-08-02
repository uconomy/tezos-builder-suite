import express from 'express';
import { Contract } from './domain/contract';
import { createApolloServer, schema } from './graphql';

async function init(contracts: Contract[]) {
  const app = express();

  // Instance Graphql server
  const server = await createApolloServer(app, schema, () => ({
    contracts
  }));

  // Server startup
  await new Promise<void>(resolve => app.listen({ port: 4000 }, () => resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

init([
  {
    name: "Contract 1",
    code: "...",
    michelson: JSON.stringify([{}, {}, {}]),
  },
  {
    name: "Contract 2",
    code: "...",
    michelson: JSON.stringify([{}, {}, {}]),
  },
  {
    name: "My very long contract 3 name",
    code: "...",
    michelson: JSON.stringify([{}, {}, {}]),
  }
]);