import React from 'react';
import styled from 'styled-components';
import { Box, Button, Dialog, List } from '@face/ui';
import { ReactComponent as OpenseaIcon } from '../../../assets/opensea-symbol.svg';
import { ReactComponent as LogoIcon } from '../../../assets/logo.svg';
import { shortenAddress } from '../../../lib/address';
import { ProgressIcon } from '../../atom/process-icon';
import { formatAmount } from '../../../lib/number';

interface Props {
  status: string;
  amount: string;
  balance: string;
  to: string;
  fee: string;
  insufficientAmount: number;
  onConfirm: () => void;
}

export const Ready = ({
  status,
  amount,
  balance,
  to,
  fee,
  insufficientAmount,
  onConfirm,
}: Props) => {
  return (
    <>
      <Dialog.Header>
        <OpenseaIcon />
      </Dialog.Header>
      <Dialog.Body>
        <SendAmountText>Send</SendAmountText>
        <SendAmountText $hasError={insufficientAmount > 0}>
          {formatAmount(amount)}
          <SendSymbolText>MATIC</SendSymbolText>
        </SendAmountText>
        <AvailableBox>
          <AvailableText>Available</AvailableText>
          <AvailableText>
            {formatAmount(balance)}
            <AvailableSymbolText>MATIC</AvailableSymbolText>
          </AvailableText>
        </AvailableBox>
        <List>
          <List.Row>
            <ListText>To</ListText>
            <ListText>{shortenAddress(to)}</ListText>
          </List.Row>
          <List.Row>
            <ListText>Amount</ListText>
            <ListText>{formatAmount(amount)} MATIC</ListText>
          </List.Row>
          <List.Row>
            <ListText>Fee</ListText>
            <ListText>{formatAmount(fee)} MATIC</ListText>
          </List.Row>
        </List>
        <ErrorBox>
          {insufficientAmount > 0 && (
            <ErrorText>Insufficient funds {insufficientAmount} ETH</ErrorText>
          )}
        </ErrorBox>
        <Button onClick={onConfirm} disabled={status === 'requesting' || insufficientAmount > 0}>
          {status === 'requesting' && <ProgressIcon />}
          Confirm
        </Button>
      </Dialog.Body>
      <Dialog.Footer>
        <FooterText>Powered by</FooterText>
        <LogoIcon />
      </Dialog.Footer>
    </>
  );
};

const SendAmountText = styled.span<{ $hasError?: boolean }>`
  ${({ theme }) => theme.typography.heading._3Bold};
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.red.dark : theme.colors.darkgrey.main};
  margin-bottom: 4px;
`;

const SendSymbolText = styled.span`
  color: ${({ theme }) => theme.colors.darkgrey.light};
  margin-left: 6px;
`;

const AvailableBox = styled(Box)`
  border: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.mediumgrey.sub};
  margin-top: 20px;
  margin-bottom: 8px;
`;

const AvailableText = styled.span`
  ${({ theme }) => theme.typography.body._2Regular};
  color: ${({ theme }) => theme.colors.darkgrey.sub};
`;

const AvailableSymbolText = styled.span`
  margin-left: 6px;
`;

const ListText = styled.span`
  ${({ theme }) => theme.typography.body._2Medium};
  color: ${({ theme }) => theme.colors.darkgrey.sub};
`;

const ErrorBox = styled(Box)`
  padding-top: 16px;
  padding-bottom: 24px;
  min-height: 22px;
`;

const ErrorText = styled.p`
  ${({ theme }) => theme.typography.body._2Regular};
  color: ${({ theme }) => theme.colors.red.dark};
  text-align: center;
  width: 100%;
  word-wrap: break-word;
`;

const FooterText = styled.span`
  ${({ theme }) => theme.typography.caption._1Medium};
  color: ${({ theme }) => theme.colors.custom.footer};
`;
