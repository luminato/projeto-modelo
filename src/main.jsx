import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@styles/tailwind.css';
import * as React from 'react';

import Auth from '@layouts/Auth.jsx';
import Landing from '@views/Landing.jsx';
import Profile from '@views/Profile.jsx';
import Index from '@views/Index.jsx';
import Dashboard from '@views/admin/Dashboard.jsx';
import Settings from '@views/admin/Settings.jsx';
import Tables from '@views/admin/Tables.jsx';
import Maps from '@views/admin/Maps.jsx';
import Login from '@views/auth/Login.jsx';
import Register from '@views/auth/Register.jsx';
import OffersPage from '@views/OffersPage.jsx';
import Announce from '@views/Announce.jsx';
import PrivateRoute from '@routes/PrivateRoute.jsx';

import '@styles/index.css';

// Remover o MSW se você não quiser usá-lo
// if (process.env.NODE_ENV === 'development') {
//   import('@mocks/browser').then(({ worker }) => {
//     worker.start();
//   });
// }

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/announce',
    element: (
      <PrivateRoute>
        <Announce />
      </PrivateRoute>
    ),
  },
  {
    path: '/offers',
    element: <OffersPage />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'tables',
        element: <Tables />,
      },
      {
        path: 'maps',
        element: <Maps />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '/',
        element: <Index />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
