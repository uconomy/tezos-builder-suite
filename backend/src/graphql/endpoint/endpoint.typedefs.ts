import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    endpoint: Endpoint
  }

  type Endpoint @key(fields: "url") {
    url: String!
    protocolVersion: String!
  }
`;