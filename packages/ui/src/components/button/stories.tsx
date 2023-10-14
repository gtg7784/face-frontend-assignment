import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';

const meta = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    width: 100,
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    width: 100,
    disabled: false,
    variant: 'ghost',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <InsertEmoticonSharpIcon />
        Button
      </>
    ),
    width: 100,
    disabled: false,
    variant: 'primary',
  },
};
