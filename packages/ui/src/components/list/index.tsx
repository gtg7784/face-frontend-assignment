import React, { CSSProperties, PropsWithChildren } from 'react';
import * as Styles from './styles';

interface ListProps {
  width?: CSSProperties['width'];
}

export const List = ({ width = '100%', children }: PropsWithChildren<ListProps>) => {
  return <Styles.List $width={width}>{children}</Styles.List>;
};

export const ListRow = ({ children }: PropsWithChildren<{}>) => {
  return <Styles.ListRow>{children}</Styles.ListRow>;
};

interface ListDividerProps {
  marginVertical?: CSSProperties['marginTop'];
}

export const ListDivider = ({ marginVertical = 4 }: ListDividerProps) => {
  return <Styles.ListDivider $marginVertical={marginVertical} />;
};

List.Row = ListRow;
List.Divider = ListDivider;
