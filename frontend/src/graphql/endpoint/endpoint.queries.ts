import { gql } from 'graphql-tag';

export type { Endpoint, NetworkType, NetworkScope } from '../../../../backend/src/domain/endpoint';

export const GET_ENDPOINT = gql`
query GetEndpoint {
  endpoint {
    url
    scope
    protocolVersion
    signerPrivateKey
    faucet {
      mnemonic
      activation_code
      amount
      pkh
      password
      email
    }
  }
}`;