import { buildFederatedSchema } from '@apollo/federation';
import { GraphQLSchema } from 'graphql';
import contract from './contract';
import endpoint from './endpoint';

export * from './server';

export const schema: GraphQLSchema = buildFederatedSchema([
  contract,
  endpoint,
]);