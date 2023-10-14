import { CSSProperties } from 'react';
import styled from 'styled-components';

export const Box = styled.div<{ $background: string; $width: CSSProperties['width'] }>`
  background: ${({ $background }) => $background};
  width: ${({ $width }) => $width};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 4px;
`;
