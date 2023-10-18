import React from 'react';
import styled from 'styled-components';
import { Dialog, List } from '@face/ui';
import { ReactComponent as OpenseaIcon } from '../../../assets/opensea-symbol.svg';
import { ReactComponent as LogoIcon } from '../../../assets/logo.svg';
import { ProgressIcon } from '../../atom/process-icon';
import { BlockExplorerButton } from '../../molecules/block-explorer-button';
import { AddressCopyButton } from '../../molecules/address-copy-button';
import { formatAmount } from '../../../lib/number';

interface Props {
  amount: string;
  balance: string;
  to: string;
  fee: string;
  onClickExplorerButton: () => void;
}

export const Processing = ({ amount, to, fee, onClickExplorerButton }: Props) => {
  return (
    <>
      <Dialog.Header>
        <OpenseaIcon />
      </Dialog.Header>
      <Dialog.Body>
        <StatusText>Processing</StatusText>
        <StatusDescriptionText>
          It should be confirmed on the blockchain shortly.
        </StatusDescriptionText>
        <List>
          <List.Row>
            <ListText>Status</ListText>
            <ListText>
              <ProgressIcon />
              Processing
            </ListText>
          </List.Row>
          <List.Divider />
          <List.Row>
            <ListText>To</ListText>
            <AddressCopyButton address={to} />
          </List.Row>
          <List.Row>
            <ListText>Amount</ListText>
            <ListText>{formatAmount(amount)} MATIC</ListText>
          </List.Row>
          <List.Row>
            <ListText>Fee</ListText>
            <ListText>{formatAmount(fee)} MATIC</ListText>
          </List.Row>
          <List.Row>
            <ListText>Total</ListText>
            <ListText>
              <ListBoldText>{formatAmount(Number(amount) + Number(fee))}</ListBoldText>
              &nbsp;MATIC
            </ListText>
          </List.Row>
        </List>
        <StyledBlockExplorerButton onClick={onClickExplorerButton} />
      </Dialog.Body>
      <Dialog.Footer>
        <FooterText>Powered by</FooterText>
        <LogoIcon />
      </Dialog.Footer>
    </>
  );
};

const StatusText = styled.span<{ $hasError?: boolean }>`
  ${({ theme }) => theme.typography.heading._3Bold};
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.red.dark : theme.colors.darkgrey.main};
`;

const StatusDescriptionText = styled.p`
  ${({ theme }) => theme.typography.body._2Regular};
  color: ${({ theme }) => theme.colors.bluegrey.main};
  margin-bottom: 24px;
`;

const ListText = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.typography.body._2Medium};
  color: ${({ theme }) => theme.colors.darkgrey.sub};
`;

const ListBoldText = styled.span`
  ${({ theme }) => theme.typography.body._2Bold};
  color: ${({ theme }) => theme.colors.darkgrey.main};
`;

const StyledBlockExplorerButton = styled(BlockExplorerButton)`
  margin-top: 24px;
`;

const FooterText = styled.span`
  ${({ theme }) => theme.typography.caption._1Medium};
  color: ${({ theme }) => theme.colors.custom.footer};
`;
