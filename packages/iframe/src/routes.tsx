import { CreateWallet } from './pages/create-wallet';
import { SendTransaction } from './pages/send-transaction';
import { RouterWrapper } from './utils/router-wrapper';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RouterWrapper />,
    errorElement: <div>404</div>,
    children: [
      {
        path: 'create-wallet',
        element: <CreateWallet />,
      },
      {
        path: 'send-transaction',
        element: <SendTransaction />,
      },
    ],
  },
];
