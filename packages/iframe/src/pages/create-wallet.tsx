import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Dialog, Box, Button } from '@face/ui';
import { useIframePostMessage } from '../hooks/iframe';
import { useIframeActions } from '../stores/iframe';
import { ReactComponent as LogoIcon } from '../assets/logo.svg';
import { useGetWallet } from '../hooks/query';

type CreateWalletResponse = {
  result: {
    type: 'createWallet';
    address: string;
  };
};

export const CreateWallet = () => {
  const theme = useTheme();
  const postMessage = useIframePostMessage<CreateWalletResponse>();
  const { clearRequestId } = useIframeActions();
  const { data: wallet } = useGetWallet();

  const onClose = () => {
    if (!wallet) {
      throw new Error('wallet is not initialized');
    }

    const message: CreateWalletResponse = {
      result: { type: 'createWallet', address: wallet.address },
    };

    postMessage(message);

    clearRequestId();
  };

  return (
    <Dialog isOpen onClose={onClose} variant="popup">
      <Dialog.Header>Success!</Dialog.Header>
      <Dialog.Body>
        <ReadyText>Your wallet is now ready</ReadyText>
        <AddressBox background={theme.colors.lightgrey.main}>
          <AddressText>{wallet?.address}</AddressText>
        </AddressBox>
        <Button onClick={onClose}>Close</Button>
      </Dialog.Body>
      <Dialog.Footer>
        <FooterText>Powered by</FooterText>
        <LogoIcon />
      </Dialog.Footer>
    </Dialog>
  );
};

const ReadyText = styled.p`
  ${({ theme }) => theme.typography.body._1SemiBold};
  color: ${({ theme }) => theme.colors.grey._700};
  text-align: center;
`;

const AddressBox = styled(Box)`
  margin-top: 12px;
  margin-bottom: 24px;
`;

const AddressText = styled.p`
  ${({ theme }) => theme.typography.body._2Medium};
  color: ${({ theme }) => theme.colors.darkgrey.sub};
  word-wrap: break-word;
  width: inherit;
`;

const FooterText = styled.span`
  ${({ theme }) => theme.typography.caption._1Medium};
  color: ${({ theme }) => theme.colors.custom.footer};
`;
