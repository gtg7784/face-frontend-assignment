import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import { ethers } from 'ethers';
import App from '../../App';
import { routes } from '../../routes';

jest.mock('ethers');

describe('Create Wallet', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('create wallet', async () => {
    ethers.Wallet.createRandom = jest.fn().mockReturnValue({
      privateKey: 'privateKey',
      address: 'address',
    });

    renderWithRouter({
      route: '/create-wallet',
    });

    const SuccessText = await waitFor(() => screen.findByText('Success!'));
    const AddressText = await waitFor(() => screen.findByText('address'));

    expect(SuccessText).toBeInTheDocument();
    expect(AddressText).toBeInTheDocument();
  });

  function renderWithRouter(options: { route: string }) {
    const router = createMemoryRouter(routes, {
      initialEntries: [options.route],
    });

    return render(<App router={router} />);
  }
});
