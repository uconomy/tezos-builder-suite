import { Contract } from "../../domain/contract";
import { ApolloContext } from "../../graphql/context";

export async function getContracts(context: ApolloContext): Promise<Contract[]> {
  return context.contracts;
}

export async function deployCompleted(contract: Contract, address: string, context: ApolloContext): Promise<boolean> {
  if (context.onDeployCompleted) {
    context.onDeployCompleted(contract, address);
  }

  return true;
}