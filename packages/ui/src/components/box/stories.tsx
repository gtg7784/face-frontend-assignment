import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '.';

const meta = {
  title: 'Component/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof Box>;

export const withOneChild: Story = {
  args: {
    width: 100, // for demo purposes
    background: undefined,
    children: 'Button',
  },
  argTypes: {
    background: {
      control: {
        type: 'color',
      },
    },
  },
};

export const withTwoChild: Story = {
  args: {
    width: 100, // for demo purposes
    background: undefined,
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
  argTypes: {
    background: {
      control: {
        type: 'color',
      },
    },
  },
};
