import { gql } from 'graphql-tag';

export const CONTRACT_DEPLOY_COMPLETED = gql`
mutation DeloyCompleted($contract: ContractInput!, $address: String!) {
  deployCompleted(contract: $contract, address: $address)
}`;
