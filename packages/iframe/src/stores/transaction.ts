import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TransactionStoreActions = {
  setTo: (to?: string) => void;
  setAmount: (amount?: string) => void;
  clearData: () => void;
};

type TransactionStore = {
  to: string;
  amount: string;
  actions: TransactionStoreActions;
};

export const useTransactionStore = create<TransactionStore>()(
  devtools(
    (set) => ({
      to: '',
      amount: '',
      actions: {
        setTo: (to?: string) => set({ to }),
        setAmount: (amount?: string) => set({ amount }),
        clearData: () => set({ to: '', amount: '' }),
      },
    }),
    {
      name: 'Zustand',
      store: 'TransactionStore',
    }
  )
);

export const useTransactionTo = () => useTransactionStore(({ to }) => to);
export const useTransactionAmount = () => useTransactionStore(({ amount }) => amount);
export const useTransactionActions = () => useTransactionStore(({ actions }) => ({ ...actions }));
