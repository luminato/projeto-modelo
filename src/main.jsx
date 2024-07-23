import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@styles/tailwind.css';
import * as React from 'react';

// Importe os layouts e views conforme necessário
import Admin from '@layouts/Admin.jsx';
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
import Announce from '@views/Announce';
import PrivateRoute from '@routes/PrivateRoute.jsx';

// Importe o CSS global (se necessário)
import '@styles/index.css';

// Condicional para inicializar o MSW em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  import('@mocks/browser').then(({ worker }) => {
    worker.start();
  });
}

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// Defina as rotas do aplicativo
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
    element: <Admin />,
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
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/',
    element: <Index />,
  },
]);

// Encontre o elemento root na DOM
const rootElement = document.getElementById('root');

// Crie a raiz do React
const root = createRoot(rootElement);

// Renderize o aplicativo
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
