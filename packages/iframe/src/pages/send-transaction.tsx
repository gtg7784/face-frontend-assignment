import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@face/ui';
import { useEthers } from '../contexts/ethers';
import { CloseMessage, SendTransactionMessage, useIframePostMessage } from '../hooks/iframe';
import { Complete, Processing, Ready } from '../components/templates/send-transaction';
import { useSendTransactionData } from '../hooks/query';

type Status = 'ready' | 'requesting' | 'processing' | 'complete';

export const SendTransaction = () => {
  const navigate = useNavigate();
  const postMessage = useIframePostMessage<CloseMessage | SendTransactionMessage>();
  const { provider, wallet } = useEthers();
  const [status, setStatus] = useState<Status>('ready');
  const [transactionHash, setTransactionHash] = useState<string>('');
  const { data, isSuccess } = useSendTransactionData({
    placeholderData: {
      to: '',
      amount: '',
      fee: '',
      balance: '',
      insufficientAmount: 0,
    },
    staleTime: Infinity,
  });

  const onClose = () => {
    if (!transactionHash) {
      const message: CloseMessage = { result: { type: 'close' } };
      postMessage(message);
      return;
    }

    const message: SendTransactionMessage = {
      result: { type: 'sendTransaction', transactionHash },
    };

    postMessage(message);
  };

  const onConfirm = async () => {
    if (!isSuccess) {
      return;
    }

    setStatus('requesting');

    const address = await wallet?.getAddress();

    const transactionRequest = {
      to: data.to,
      value: ethers.parseEther(data.amount),
      from: address,
    };

    const tx = await wallet?.sendTransaction(transactionRequest);

    if (!tx) {
      const message: SendTransactionMessage = { error: 'tx is not initialized' };
      postMessage(message);
      navigate('/');
      return;
    }

    setStatus('processing');
    setTransactionHash(tx.hash);

    const receipt = await provider?.waitForTransaction(tx.hash);

    if (!receipt) {
      const message: SendTransactionMessage = { error: 'receipt is not initialized' };
      postMessage(message);
      navigate('/');
      return;
    }

    setStatus('complete');
  };

  const onClickExplorerButton = () => {
    if (!transactionHash) {
      return;
    }

    const url = `https://mumbai.polygonscan.com/tx/${transactionHash}`;
    window.open(url, '_blank');
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog isOpen onClose={onClose} variant="modal">
      {(status === 'ready' || status === 'requesting') && (
        <Ready
          status={status}
          amount={data.amount}
          balance={data.balance}
          fee={data.fee}
          to={data.to}
          insufficientAmount={data.insufficientAmount}
          onConfirm={onConfirm}
        />
      )}
      {status === 'processing' && (
        <Processing
          amount={data.amount}
          balance={data.balance}
          fee={data.fee}
          to={data.to}
          onClickExplorerButton={onClickExplorerButton}
        />
      )}
      {status === 'complete' && (
        <Complete
          amount={data.amount}
          balance={data.balance}
          fee={data.fee}
          to={data.to}
          onClickExplorerButton={onClickExplorerButton}
        />
      )}
    </Dialog>
  );
};
