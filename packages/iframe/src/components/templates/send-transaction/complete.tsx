import React from 'react';
import styled from 'styled-components';
import { Dialog, List, Tooltip } from '@face/ui';
import { ReactComponent as OpenseaIcon } from '../../../assets/opensea-symbol.svg';
import { ReactComponent as LogoIcon } from '../../../assets/logo.svg';
import { ReactComponent as CheckIcon } from '../../../assets/check.svg';
import { BlockExplorerButton } from '../../molecules/block-explorer-button';
import { formatAmount } from '../../../lib/number';
import { shortenAddress } from '../../../lib/address';

interface Props {
  amount: string;
  balance: string;
  to: string;
  fee: string;
  onClickExplorerButton: () => void;
}

export const Complete = ({ amount, to, fee, onClickExplorerButton }: Props) => {
  return (
    <>
      <Dialog.Header>
        <OpenseaIcon />
      </Dialog.Header>
      <Dialog.Body>
        <StatusText>Complete!</StatusText>
        <StatusDescriptionText>It's been confirmed on the blockchain!</StatusDescriptionText>
        <List>
          <List.Row>
            <ListText>Status</ListText>
            <ListText>
              <CheckIcon />
              Complete
            </ListText>
          </List.Row>
          <List.Divider />
          <List.Row>
            <ListText>To</ListText>
            <Tooltip message={to}>
              <ListText>{shortenAddress(to)}</ListText>
            </Tooltip>
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
  justify-content: flex-end;
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
