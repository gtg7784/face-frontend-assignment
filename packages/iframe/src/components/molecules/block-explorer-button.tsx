import React from 'react';
import { Button } from '@face/ui';
import { ReactComponent as OpenInNewIcon } from '../../assets/open-in-new.svg';

interface Props {
  className?: string;
  onClick: () => void;
}

export const BlockExplorerButton = ({ onClick, className }: Props) => {
  return (
    <Button variant="ghost" size="small" onClick={onClick} className={className}>
      View on block explorer
      <OpenInNewIcon />
    </Button>
  );
};
