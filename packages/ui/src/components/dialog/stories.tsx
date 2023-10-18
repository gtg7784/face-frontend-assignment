import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '.';

const meta = {
  title: 'Component/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Modal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'modal',
    children: (
      <>
        <Dialog.Header>
          <h1>Modal Dialog Header</h1>
        </Dialog.Header>
        <Dialog.Body>
          <p>Modal Dialog Body</p>
        </Dialog.Body>
        <Dialog.Footer>
          <span>Modal Dialog Footer</span>
        </Dialog.Footer>
      </>
    ),
  },
};

export const Popup: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    variant: 'popup',
    children: (
      <>
        <Dialog.Header>
          <h1>Modal Dialog Header</h1>
        </Dialog.Header>
        <Dialog.Body>
          <p>Modal Dialog Body</p>
        </Dialog.Body>
        <Dialog.Footer>
          <span>Modal Dialog Footer</span>
        </Dialog.Footer>
      </>
    ),
  },
};
