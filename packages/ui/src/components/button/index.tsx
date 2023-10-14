import { CSSProperties, PropsWithChildren } from 'react';
import * as Styled from './styles';

interface Props {
  /**
   * Is this button disabled?
   */
  disabled?: boolean;
  /**
   * Which variant of button to use?
   */
  variant?: 'primary' | 'ghost';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'large';
  /**
   * The width of the button
   */
  width?: CSSProperties['width'];
  /**
   * Click Event Handler
   */
  onClick?: () => void;
  /**
   * className for override styles
   */
  className?: string;
}

/**
 * Button Component for user interaction
 */
export const Button = ({
  variant = 'primary',
  disabled = false,
  size = 'large',
  width = '100%',
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Styled.Button
      className={[className, `button-${variant}`, `button-${size}`].join(' ')}
      $width={width}
      disabled={disabled}
      {...props}
    />
  );
};
