import { buildFederatedSchema } from '@apollo/federation';
import contract from './contract';
import endpoint from './endpoint';

export * from './server';

export const schema = buildFederatedSchema([
  contract,
  endpoint,
]);