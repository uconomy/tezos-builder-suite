import { ApolloServer, ExpressContext, Config } from 'apollo-server-express';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import { ApolloContext } from './context';

export async function createApolloServer(
  app: express.Application,
  schema: GraphQLSchema,
  context?: ApolloContext | (() => ApolloContext) | (() => Promise<ApolloContext>),
): Promise<ApolloServer<ExpressContext>> {

  // Same ApolloServer initialization as before
  const server = new ApolloServer({
    schema,
    context,
  });

  // Required logic for integrating with Express
  await server.start();
  
  server.applyMiddleware({
     app,

     // By default, apollo-server hosts its GraphQL endpoint at the
     // server root. However, *other* Apollo Server packages host it at
     // /graphql. Optionally provide this to match apollo-server.
     path: '/graphql'
  });

  return server;
}

