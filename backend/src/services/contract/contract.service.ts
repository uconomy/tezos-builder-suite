import { Contract } from "../../domain/contract";
import { ApolloContext } from "../../graphql/context";

export async function getContracts(context: ApolloContext): Promise<Contract[]> {
  return context.contracts;
}