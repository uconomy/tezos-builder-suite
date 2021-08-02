import { gql } from 'graphql-tag';

export type {
  Contract,
} from '../../../../backend/src/domain/contract';

export const GET_CONTRACTS = gql`
query GetContracts {
  contracts {
    name
    code
    michelson
  }
}`;