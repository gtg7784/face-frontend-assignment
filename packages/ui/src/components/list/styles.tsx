import { CSSProperties } from 'react';
import styled from 'styled-components';

export const List = styled.ul<{ $width: CSSProperties['width'] }>`
  width: ${({ $width }) => $width};
  background: ${({ theme }) => theme.colors.lightgrey.main};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
  list-style: none;
  gap: 16px;
`;

export const ListRow = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListDivider = styled.div<{ $marginVertical: CSSProperties['marginTop'] }>`
  margin: ${({ $marginVertical }) => $marginVertical} 0px;
  background: ${({ theme }) => theme.colors.mediumgrey.sub};
  height: 1px;
  width: 100%;
`;
