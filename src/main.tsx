import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Detail from './components/Detail.tsx';
import ErrorPage from './components/ErrorPage .tsx';
import { detailLoader } from './loader/detailLoader.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:pokemonId',
    element: <Detail />,
    loader: detailLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Error',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
