import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { CategoryPage } from '@/pages/Category';
<<<<<<< HEAD
import CategoryAddPage from '@/pages/Category/CategoryAddPage'; 
import CategoryEditPage from '@/pages/Category/CategoryEditPage';
import FavoritesPage from '@/pages/FavoritesPage'; 
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import ProductAddPage from '@/pages/Goods/Detail/ProductAddPage';
import ProductEditPage from '@/pages/Goods/Detail/ProductEditPage';
=======
import FavoritesPage from '@/pages/FavoritesPage'; // 올바르게 import
import { GoodsDetailPage } from '@/pages/Goods/Detail';
>>>>>>> upstream/hehelee
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import { OrderPage } from '@/pages/Order';
import SignUpPage from '@/pages/SignUp';

import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
      {
        path: RouterPath.category,
        element: <CategoryPage />,
      },
      {
<<<<<<< HEAD
        path: RouterPath.addProduct,
        element: <ProductAddPage />,
      },
      {
        path: RouterPath.addCategory, 
        element: <CategoryAddPage />,
      },
      {
        path: RouterPath.editCategory, 
        element: <CategoryEditPage />,
      },
      {
        path: RouterPath.editProduct, // 수정 페이지 라우트 추가
        element: <ProductEditPage />,
      },
      {
=======
>>>>>>> upstream/hehelee
        path: RouterPath.productsDetail,
        element: <GoodsDetailPage />,
      },
      {
        path: RouterPath.myAccount,
        element: <PrivateRoute />,
        children: [
          {
            path: RouterPath.myAccount,
            element: <MyAccountPage />,
          },
        ],
      },
      {
        path: RouterPath.order,
        element: <PrivateRoute />,
        children: [
          {
            path: RouterPath.order,
            element: <OrderPage />,
          },
        ],
      },
      {
        path: RouterPath.favorites, // favorites 경로 추가
        element: <PrivateRoute />,
        children: [
          {
            path: RouterPath.favorites,
            element: <FavoritesPage />,
          },
        ],
      },
      {
        path: RouterPath.notFound,
        element: <Navigate to={RouterPath.home} />,
      },
    ],
  },
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
  {
    path: RouterPath.signUp,
    element: <SignUpPage />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
