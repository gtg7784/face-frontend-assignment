import type { Meta, StoryObj } from '@storybook/react';
import { List } from '.';

const meta = {
  title: 'Component/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof List>;

export const RowHasOneChild: Story = {
  args: {
    width: '256px',
    children: (
      <>
        <List.Row>
          <span>list</span>
        </List.Row>
        <List.Row>
          <span>list</span>
        </List.Row>
        <List.Row>
          <span>list</span>
        </List.Row>
      </>
    ),
  },
};

export const RowHasTwoChild: Story = {
  args: {
    width: '256px',
    children: (
      <>
        <List.Row>
          <span>list</span>
          <span>list</span>
        </List.Row>
        <List.Row>
          <span>list</span>
          <span>list</span>
        </List.Row>
        <List.Row>
          <span>list</span>
          <span>list</span>
        </List.Row>
      </>
    ),
  },
};

export const WithDivider: Story = {
  args: {
    width: '256px',
    children: (
      <>
        <List.Row>
          <span>list</span>
          <span>list</span>
        </List.Row>
        <List.Divider />
        <List.Row>
          <span>list</span>
          <span>list</span>
        </List.Row>
        <List.Row>
          <span>list</span>
          <span>list</span>
        </List.Row>
      </>
    ),
  },
};
