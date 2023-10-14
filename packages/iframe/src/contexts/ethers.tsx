import { BaseWallet, ethers } from 'ethers';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const RPC_URL = 'https://rpc-mumbai.maticvigil.com/';

const defaultRpcProvider = new ethers.JsonRpcProvider(RPC_URL);

export interface EthersContextInterface {
  provider: ethers.JsonRpcProvider | null;
  wallet: BaseWallet | null;
  getWallet: () => BaseWallet | null;
  estimateFee: (amount: string, to: string) => Promise<string>;
}

const EthersContext = createContext<EthersContextInterface>({
  provider: null,
  wallet: null,
  getWallet: () => null,
  estimateFee: () => Promise.resolve(''),
});

export const EthersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [provider] = useState(defaultRpcProvider);
  const [wallet, setWallet] = useState<BaseWallet | null>(null);

  useEffect(() => {
    const storedPrivateKey = localStorage.getItem('privateKey');

    if (storedPrivateKey) {
      const _wallet = new ethers.Wallet(storedPrivateKey, provider);

      setWallet(_wallet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWallet = useCallback(() => {
    if (!provider) {
      throw new Error('provider is not initialized');
    }

    if (wallet) {
      return wallet;
    }

    const _wallet = ethers.Wallet.createRandom(provider);

    localStorage.setItem('privateKey', _wallet.privateKey);

    setWallet(_wallet);

    return _wallet;
  }, [provider, wallet]);

  const estimateFee = useCallback(
    async (amount: string, to: string) => {
      const feeData = await provider.getFeeData();
      const maxFeePerGas = feeData.maxFeePerGas as bigint;

      const transactionRequest = {
        to,
        value: ethers.parseEther(amount),
      };

      const gasLimit = await provider.estimateGas(transactionRequest);

      return ethers.formatEther(maxFeePerGas * gasLimit);
    },
    [provider]
  );

  return (
    <EthersContext.Provider
      value={{
        provider,
        wallet,
        getWallet,
        estimateFee,
      }}>
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => {
  const value = useContext(EthersContext);

  if (!value) {
    throw new Error('useEthers must be used within EthersProvider');
  }

  return value;
};
