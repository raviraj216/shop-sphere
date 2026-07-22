import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';

// admin page
import DashboardPage from '@/pages/Admin/DashboardPage/DashboardPage';
  
import CartPage from '@/pages/Cart/CartPage';
import HomePage from '@/pages/Home/HomePage';
import LoginPage from '@/pages/Login/LoginPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import ProductDetailsPage from '@/pages/ProductDetails/ProductDetailsPage';
import ProductsPage from '@/pages/Products/ProductsPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import RegisterPage from '@/pages/Register/RegisterPage';
import OrdersPage from '@/pages/Orders/OrdersPage';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import OrderDetailsPage from '@/pages/OrderDetails/OrderDetailsPage';


export const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetailsPage />,
      },
    ],
  },

  {
    element: <PublicRoute />,

    children: [
      {
        element: <AuthLayout />,

        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },

          {
            path: '/register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <MainLayout />,

        children: [
          {
            path: '/profile',
            element: <ProfilePage />,
          },

          {
            path: '/cart',
            element: <CartPage />,
          },
          {
            path: '/orders',
            element: <OrdersPage />,
          },
          {
            path : "/orders/:orderId",
            element : <OrderDetailsPage />
          },
        ],
      },

      {
        element: <AdminLayout />,

        children: [
          {
            path: '/admin',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);