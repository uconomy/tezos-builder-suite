import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    endpoint: Endpoint
  }

  type FaucetAccount {
    mnemonic: String!
    secret: String!
    amount: String!
    pkh: String!
    password: String
    email: String!
  }

  enum NetworkScope {
    mainnet
    testnet
    sandbox
  }

  type Endpoint @key(fields: "url") {
    url: String!
    scope: NetworkScope!
    protocolVersion: String!
    signerPrivateKey: String
    faucet: FaucetAccount
  }
`;