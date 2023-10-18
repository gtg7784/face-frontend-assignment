import React, { PropsWithChildren, createContext } from 'react';
import * as Styles from './styles';

type Props = {
  /**
   * Is this dialog open?
   */
  isOpen: boolean;
  /**
   * Close Event Callback, only for `modal` variant
   */
  onClose?: () => void;
  /**
   * Which variant of dialog to use? <br />
   * `modal` when user need to interact with dialog <br />
   * `popup` when user need to see dialog only
   */
  variant?: 'modal' | 'popup';
};

type DialogContextType = {
  variant: 'modal' | 'popup';
  onClose?: () => void;
} | null;

const DialogContext = createContext<DialogContextType>(null);

export const Dialog = ({
  isOpen,
  onClose,
  variant = 'modal',
  children,
}: PropsWithChildren<Props>) => {
  return (
    <DialogContext.Provider value={{ variant, onClose }}>
      {isOpen && (
        <Styles.Wrapper>
          <Styles.Background />
          <Styles.Container className={`dialog-${variant}`}>{children}</Styles.Container>
        </Styles.Wrapper>
      )}
    </DialogContext.Provider>
  );
};

export const DialogHeader = ({ children }: PropsWithChildren<{}>) => {
  const { variant, onClose } = React.useContext(DialogContext)!;

  return (
    <Styles.Header className={`dialog-header-${variant}`}>
      {variant === 'modal' && <Styles.CloseButton onClick={onClose} />}
      {children}
    </Styles.Header>
  );
};

export const DialogBody = ({ children }: PropsWithChildren<{}>) => {
  const { variant } = React.useContext(DialogContext)!;

  return <Styles.Body className={`dialog-body-${variant}`}>{children}</Styles.Body>;
};

export const DialogFooter = ({ children }: PropsWithChildren<{}>) => {
  return <Styles.Footer>{children}</Styles.Footer>;
};

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
