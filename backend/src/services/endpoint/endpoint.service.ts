import { Contract } from "../../domain/contract";
import { Endpoint } from "../../domain/endpoint";
import { ApolloContext } from "../../graphql/context";

export async function getEndpoint(context: ApolloContext): Promise<Endpoint> {
  return context.endpoint;
}