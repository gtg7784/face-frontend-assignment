export type CreateWalletMessage = {
  type: string;
  address: string;
};

export type SendTransactionMessage = {
  type: string;
  transactionHash: string;
};
