import { QueryKey, UseQueryOptions, useQuery } from 'react-query';
import { useEthers } from '../contexts/ethers';
import { BaseWallet, ethers } from 'ethers';
import { useTransactionAmount, useTransactionTo } from '../stores/transaction';

type OmittedQueryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export const useGetWallet = (
  options?: OmittedQueryOptions<unknown, unknown, BaseWallet, 'getWallet'>
) => {
  const { getWallet } = useEthers();

  return useQuery('getWallet', getWallet, options);
};

type GetSendTransactionData = {
  to: string;
  amount: string;
  fee: string;
  balance: string;
  insufficientAmount: number;
};

export const useSendTransactionData = (
  options?: OmittedQueryOptions<
    unknown,
    unknown,
    GetSendTransactionData,
    ['getTransactionData', { to: string; amount: string }]
  >
) => {
  const { provider, wallet, estimateFee } = useEthers();
  const amount = useTransactionAmount();
  const to = useTransactionTo();

  return useQuery(
    ['getTransactionData', { to, amount }],
    async () => {
      if (!provider || !wallet) {
        return { to: '', amount: '', fee: '', balance: '', insufficientAmount: 0 };
      }

      const balance = ethers.formatEther(await provider.getBalance(wallet.address));
      const fee = await estimateFee(amount, to);
      const insufficientAmount = (Number(balance) - Number(fee) - Number(amount)) * -1;

      return { to, amount, fee, balance, insufficientAmount };
    },
    options
  );
};
