export type FaucetAccount = {
  mnemonic: string | string[];
  secret: string;
  amount: string; // mutez
  pkh: string;
  password?: string;
  email: string;
};