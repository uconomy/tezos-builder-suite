import { Contract } from "../../domain/contract";
import { getContracts } from "../../services/contract";
import { ApolloContext } from "../context";

export const resolvers = {
  Query: {
    contracts: (parent: any, args: any, context: ApolloContext): Promise<Contract[]> => {
      return getContracts(context);
    },
  }
};