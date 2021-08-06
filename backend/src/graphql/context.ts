import { Contract } from "../domain/contract";
import { Endpoint } from "../domain/endpoint";

export type ApolloContext = {
  contracts: Contract[];
  endpoint: Endpoint;
};