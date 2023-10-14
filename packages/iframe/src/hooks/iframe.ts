import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIframeActions, useRequestId } from '../stores/iframe';
import { useTransactionActions } from '../stores/transaction';

type IframeMessageData = {
  amount: string;
  to: string;
};

type IframeMessage = {
  type: string;
  id: string;
  data?: IframeMessageData;
};

export const useIframeInitialization = () => {
  const navigate = useNavigate();
  const { setRequestId } = useIframeActions();
  const { setTo, setAmount } = useTransactionActions();

  useEffect(() => {
    if (window === window.parent) return;

    const handler = (event: MessageEvent<IframeMessage>) => {
      if (typeof event.data !== 'object') return;
      if (!event.data.type || !event.data.id) return;

      const { type, id, data } = event.data;

      setRequestId(id);

      if (type === 'createWallet') {
        navigate('/create-wallet');
      }

      if (type === 'sendTransaction') {
        const { to, amount } = data as IframeMessageData;

        setTo(to);
        setAmount(amount);
        navigate('/send-transaction');
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [navigate, setAmount, setRequestId, setTo]);
};

export const useIframePostMessage = <Data = unknown>() => {
  const requestId = useRequestId();

  const postMessage = useCallback(
    (data: Data) => {
      if (window === window.parent) return;

      window.parent.postMessage({ ...data, id: requestId }, '*');
    },
    [requestId]
  );

  return postMessage;
};

export type CreateWalletMessage = {
  result: {
    type: 'createWallet';
    address: string;
  };
};

export type SendTransactionMessage = {
  result?: {
    type: 'sendTransaction';
    transactionHash: string;
  };
  error?: string;
};

export type CloseMessage = {
  result: {
    type: 'close';
  };
};
