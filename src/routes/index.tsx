import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/features/Layout';
import { CategoryPage } from '@/pages/Category';
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import { OrderPage } from '@/pages/Order';
import { RegisterPage } from '@/pages/Register';
import { OrderList } from '@/pages/OrderedList';
import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';
import { RedirectionComponent } from '@/pages/Login/Redirecting';
import { NoneKakaoLoginPage } from '@/pages/Login/noneKakaoLogin';
import { NoneKakaoRegisterPage } from '@/pages/Login/noneKakaoRegister';

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
        path: RouterPath.productsDetail,
        element: <GoodsDetailPage />,
      },
      {
        path: RouterPath.myAccount,
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <MyAccountPage />,
          },
          {
            path: 'orders',
            element: <OrderList />,
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
        path: RouterPath.register,
        element: <RegisterPage />,
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
    path: RouterPath.kakaoToken,
    element: <RedirectionComponent />
  },
  {
    path: RouterPath.noneKakaoLogin,
    element: <NoneKakaoLoginPage />,
  },
  {
    path: RouterPath.noneKakaoRegister,
    element: <NoneKakaoRegisterPage />
  }
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
