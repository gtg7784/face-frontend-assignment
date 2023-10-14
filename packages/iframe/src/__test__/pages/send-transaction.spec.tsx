import React from 'react';
import { UseQueryResult } from 'react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter } from 'react-router-dom';
import App from '../../App';
import { routes } from '../../routes';
import * as QueryHooks from '../../hooks/query';
import * as EthersContext from '../../contexts/ethers';

jest.setTimeout(10000);
describe('Send Transaction', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('send transaction - insufficient amount', async () => {
    jest.spyOn(QueryHooks, 'useSendTransactionData').mockReturnValue({
      data: {
        to: '0xc2de1231230353',
        amount: '100',
        fee: '1',
        balance: '1',
        insufficientAmount: 100,
      },
      isSuccess: true,
    } as UseQueryResult<QueryHooks.GetSendTransactionData, unknown>);

    renderWithRouter({
      route: '/send-transaction',
    });

    const SendText = await waitFor(() => screen.findByText('Send'));
    const SendAmountText = await waitFor(() => screen.findByText('100 MATIC'));
    const ToText = await waitFor(() => screen.findByText('0xc2de...0353'));
    const InsufficientAmountText = await waitFor(() =>
      screen.findByText('Insufficient funds 100 ETH')
    );

    expect(SendText).toBeInTheDocument();
    expect(SendAmountText).toBeInTheDocument();
    expect(ToText).toBeInTheDocument();
    expect(InsufficientAmountText).toBeInTheDocument();
  });

  test('send transaction - processing - success', async () => {
    jest.spyOn(QueryHooks, 'useSendTransactionData').mockReturnValue({
      data: {
        to: '0xc2de1231230353',
        amount: '11',
        fee: '1',
        balance: '13',
        insufficientAmount: 0,
      },
      isSuccess: true,
    } as UseQueryResult<QueryHooks.GetSendTransactionData, unknown>);

    jest.spyOn(EthersContext, 'useEthers').mockReturnValue({
      wallet: {
        getAddress: jest.fn().mockReturnValue(new Promise((resolve) => resolve('address'))),
        sendTransaction: jest
          .fn()
          .mockReturnValue(new Promise((resolve) => resolve({ hash: 'hash' }))),
      } as any,
      provider: {
        waitForTransaction: jest.fn().mockReturnValue(new Promise((resolve) => resolve({}))),
      } as any,
      getWallet: jest.fn().mockReturnValue({
        getAddress: jest.fn().mockReturnValue('address'),
      }),
      estimateFee: jest.fn().mockResolvedValue('1'),
    });

    renderWithRouter({
      route: '/send-transaction',
    });

    const SendText = await waitFor(() => screen.findByText('Send'));
    const SendAmountText = await waitFor(() => screen.findByText('11 MATIC'));

    expect(SendText).toBeInTheDocument();
    expect(SendAmountText).toBeInTheDocument();

    const ConfirmButton = await waitFor(() => screen.findByText('Confirm'));

    await waitFor(async () => {
      await userEvent.click(ConfirmButton);
    });

    expect(EthersContext.useEthers().wallet?.getAddress).toHaveBeenCalled();

    const ConfirmButtonDisabled = await waitFor(() => screen.findByText('Confirm'));

    expect(ConfirmButtonDisabled).toBeDisabled();

    expect(EthersContext.useEthers().wallet?.sendTransaction).toHaveBeenCalled();

    const ProcessingText = await waitFor(() => screen.findByText('Processing'));

    expect(ProcessingText).toBeInTheDocument();

    const CompleteText = await waitFor(() => screen.findByText('Complete'));

    expect(CompleteText).toBeInTheDocument();
  });

  function renderWithRouter(options: { route: string }) {
    const router = createMemoryRouter(routes, {
      initialEntries: [options.route],
    });

    return render(<App router={router} />);
  }
});
