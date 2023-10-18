import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '@face/ui';
import { EthersProvider } from './contexts/ethers';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

interface Props {
  router: RemixRouter;
}

function App({ router }: Props) {
  return (
    <EthersProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Helmet>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            <GlobalStyles />
            <RouterProvider router={router} />
          </HelmetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </EthersProvider>
  );
}

export default App;
