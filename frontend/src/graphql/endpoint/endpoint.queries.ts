import { gql } from 'graphql-tag';

export type { Endpoint, NetworkType } from '../../../../backend/src/domain/endpoint';

export const GET_ENDPOINT = gql`
query GetEndpoint {
  endpoint {
    url
    protocolVersion
  }
}`;