import { Endpoint } from "../../domain/endpoint";
import { ApolloContext } from "../../graphql/context";

export async function getEndpoint(context: ApolloContext): Promise<Endpoint> {
  const endpoint: any = Object.assign({}, context.endpoint);

  if (endpoint.signerPrivateKey && endpoint.faucet) {
    throw new Error('You cannot specify both a signer Private Key AND a Faucet account, please remove one.');
  }

  if (endpoint.scope === 'sandbox' && !endpoint.faucet && !endpoint.signerPrivateKey) {
    throw new Error('Sandbox requires either signer Private Key or a Faucet account, please set one of those.');
  }

  const faucet = context.endpoint.faucet;
  if (faucet && Array.isArray(faucet.mnemonic)) {
    switch (faucet.mnemonic.length) {
      case 12:
      case 15:
      case 18:
      case 21:
      case 24:
        endpoint.faucet.mnemonic = faucet.mnemonic.join(' ');
        break;
      default:
        throw new Error(`Invalid mnemonic with ${faucet.mnemonic.length} words provided to Faucet account, it must contain 12, 15, 18, 21 or 24 words`);
    }
  }

  if (!context.endpoint.scope) {
    endpoint.scope = 'testnet';
  }

  return endpoint;
}