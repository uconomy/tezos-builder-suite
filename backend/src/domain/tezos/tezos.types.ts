export type FaucetAccount = {
  mnemonic: string | string[];
  activation_code: string;
  amount: string; // mutez
  pkh: string;
  password?: string;
  email: string;
};