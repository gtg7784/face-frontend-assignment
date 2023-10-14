import React, { PropsWithChildren } from 'react';
import * as Styles from './styles';

interface Props {
  /**
   * The message to display in the tooltip.
   */
  message?: string;

  /**
   * The event to trigger the tooltip.
   */
  displayEvent?: 'hover' | 'click';
}

export const Tooltip = ({
  message,
  children,
  displayEvent = 'hover',
}: PropsWithChildren<Props>) => {
  const [display, setDisplay] = React.useState(false);

  const onClick = () => {
    if (displayEvent !== 'click') {
      return;
    }

    setDisplay(!display);
  };

  const onMouseEnter = () => {
    if (displayEvent !== 'hover') {
      return;
    }
    setDisplay(true);
  };

  const onMouseLeave = () => {
    if (displayEvent !== 'hover') {
      return;
    }

    setDisplay(false);
  };

  return (
    <Styles.Container onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <Styles.Content $display={display}>{message}</Styles.Content>
      <Styles.Arrow $display={display} />
    </Styles.Container>
  );
};
