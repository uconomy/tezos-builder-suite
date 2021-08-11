import contract from ".";
import { Contract } from "../../domain/contract";
import { deployCompleted, getContracts } from "../../services/contract";
import { ApolloContext } from "../context";

export const resolvers = {
  Query: {
    contracts: (parent: any, args: any, context: ApolloContext): Promise<Contract[]> => {
      return getContracts(context);
    },
  },
  Mutation: {
    deployCompleted: (parent: any, args: any, context: ApolloContext): Promise<boolean> => {
      const { contract, address } = args;

      return deployCompleted(contract, address, context);
    }
  }
};