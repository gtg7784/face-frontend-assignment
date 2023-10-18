import React, { CSSProperties, PropsWithChildren } from 'react';
import * as Styles from './styles';

interface Props {
  /**
   * The background of the box
   */
  background?: string;
  /**
   * The width of the box, (set as 100px on storybook for demo purposes)
   */
  width?: CSSProperties['width'];
  /**
   * className for override styles
   */
  className?: string;
}

export const Box = ({
  background = 'transparent',
  width = '100%',
  ...props
}: PropsWithChildren<Props>) => {
  return <Styles.Box $background={background} $width={width} {...props} />;
};
