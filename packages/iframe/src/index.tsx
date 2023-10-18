import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { routes } from './routes';
import { createBrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter(routes);
root.render(<App router={router} />);
