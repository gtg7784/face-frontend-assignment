import React from 'react';
import { Outlet } from 'react-router-dom';
import { useIframeInitialization } from '../hooks/iframe';

export const RouterWrapper = () => {
  useIframeInitialization();

  return (
    <>
      <Outlet />
    </>
  );
};
