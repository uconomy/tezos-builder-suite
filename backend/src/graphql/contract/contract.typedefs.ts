import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    contracts: [Contract]
  }

  type Contract @key(fields: "name") {
    name: String!
    code: String!
    michelson: String!
  }
`;