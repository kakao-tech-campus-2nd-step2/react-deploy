import image from '@assets/images/theme.jpeg';
import { Meta, StoryObj } from '@storybook/react';
import CategoryItem, { CategoryItemProps } from '.';

const meta: Meta<CategoryItemProps> = {
  title: 'features/Home/Categories/CategoryItem',
  component: CategoryItem,
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: 'text' } },
    imageUrl: { control: { type: 'text' } },
  },
};

export default meta;

type Story = StoryObj<CategoryItemProps>;

export const Default: Story = {
  args: {
    label: '럭셔리',
    image,
  },
};
