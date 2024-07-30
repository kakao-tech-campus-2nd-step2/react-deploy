import React, { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { CategoryLocationState } from '@internalTypes/dataTypes';
import { ROUTE_PATH } from '@routes/path';
import CategoryHeader from '.';

interface MockUseLocationDecoratorProps {
  state: CategoryLocationState;
  children: ReactNode;
}

function MockUseLocationDecorator({ state, children }: MockUseLocationDecoratorProps) {
  return (
    <MemoryRouter initialEntries={[{ pathname: ROUTE_PATH.HOME, state }]}>
      <Routes>
        <Route path={ROUTE_PATH.HOME} element={children} />
      </Routes>
    </MemoryRouter>
  );
}

const meta: Meta<typeof CategoryHeader> = {
  title: 'features/Category/CategoryHeader',
  component: CategoryHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockUseLocationDecorator
        state={{
          name: 'name',
          description: 'description.',
          color: '#f3a2a2',
        }}
      >
        <Story />
      </MockUseLocationDecorator>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryHeader>;

export const Default: Story = {};
