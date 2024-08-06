import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App, Home, Category, Auth, MyAccount, Product, Order } from '@pages/index';
import PrivateRoute from './components/PrivateRoute';
import { ROUTE_PATH } from './path';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <App />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <Home />,
      },
      {
        path: ROUTE_PATH.LOGIN,
        element: <Auth />,
      },
      {
        path: ROUTE_PATH.SIGN_UP,
        element: <Auth />,
      },
      {
        path: ROUTE_PATH.PRODUCT,
        element: <Product />,
      },
      {
        path: ROUTE_PATH.ORDER,
        element: <Order />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: ROUTE_PATH.CATEGORY,
            element: <Category />,
          },
          {
            path: ROUTE_PATH.MY_ACCOUNT,
            element: <MyAccount />,
          },
        ],
      },
    ],
  },
]);
