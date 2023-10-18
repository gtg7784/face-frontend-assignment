import { CSSProperties } from 'react';
import { styled } from 'styled-components';

export const Button = styled.button<{ $width: CSSProperties['width'] }>`
  width: ${({ $width }) => $width};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none;

  &.button-primary {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.brand.primary};

    &:disabled {
      background: ${({ theme }) => theme.colors.grey._200};
      color: ${({ theme }) => theme.colors.bluegrey.sub};
    }
  }

  &.button-ghost {
    color: ${({ theme }) => theme.colors.bluegrey.sub};
    background: ${({ theme }) => theme.colors.transparent};

    &:hover {
      background: ${({ theme }) => theme.colors.bluegrey.pale};
    }
  }

  &.button-large {
    ${({ theme }) => theme.typography.button._1SemiBold};
    padding: 16px;
    border-radius: 8px;
  }

  &.button-small {
    ${({ theme }) => theme.typography.button._2Bold};
    padding: 6px 10px;
    border-radius: 4px;
  }
`;
