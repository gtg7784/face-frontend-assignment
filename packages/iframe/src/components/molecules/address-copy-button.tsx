import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Tooltip } from '@face/ui';
import { shortenAddress } from '../../lib/address';
import { copyToClipboard } from '../../utils/copy';

interface Props {
  address: string;
}

export const AddressCopyButton = ({ address }: Props) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    copyToClipboard({
      value: address,
      notSupportCallback: () => {
        console.error('not support');
      },
    });
  };
  return (
    <Tooltip message="Copied!">
      <Button onClick={onClick}>{shortenAddress(address)}</Button>
    </Tooltip>
  );
};

const Button = styled.button`
  padding: 4px 6px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.grey._100};
`;
