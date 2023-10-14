import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '.';

const meta = {
  title: 'Component/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const OnHover: Story = {
  args: {
    message: 'hello',
    displayEvent: 'hover',
    children: <div>hover me</div>,
  },
};

export const OnClick: Story = {
  args: {
    message: 'hello',
    displayEvent: 'click',
    children: <div>click me</div>,
  },
};
