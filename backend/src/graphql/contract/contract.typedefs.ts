import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    contracts: [Contract!]!
  }

  extend type Mutation {
    deployCompleted(contract: ContractInput!, address: String!): Boolean!
  }

  type Contract @key(fields: "name") {
    name: String!
    code: String!
    michelson: String!
  }

  input ContractInput {
    name: String!
    code: String!
    michelson: String!
  }
`;