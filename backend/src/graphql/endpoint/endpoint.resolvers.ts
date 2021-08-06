
import { Endpoint } from "../../domain/endpoint";
import { getEndpoint } from "../../services/endpoint";
import { ApolloContext } from "../context";

export const resolvers = {
  Query: {
    endpoint: (parent: any, args: any, context: ApolloContext): Promise<Endpoint> => {
      return getEndpoint(context);
    },
  }
};