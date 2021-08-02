import { buildFederatedSchema } from '@apollo/federation';
import contract from './contract';

export * from './server';

export const schema = buildFederatedSchema([
  contract
]);