import React, { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import App from '../../App';
import { routes } from '../../routes';

describe('Create Wallet', () => {
  test('create wallet', async () => {
    renderWithRouter({
      route: '/create-wallet',
    });

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });
  });

  function renderWithRouter(options: { route: string }) {
    const router = createMemoryRouter(routes, {
      initialEntries: [options.route],
    });

    return render(<App router={router} />);
  }
});
