import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/tailwind.css';
import * as React from "react";

// Importe os layouts e views conforme necessário
import Admin from '@layouts/Admin.jsx';
import Auth from '@layouts/Auth.jsx';
import Landing from '@views/Landing.jsx';
import Profile from '@views/Profile.jsx';
import Index from '@views/Index.jsx';

// Importe o CSS global (se necessário)
import '@styles/index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "@styles/index.css";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/",
    element: <Index />,
  },
]);

// Encontre o elemento root na DOM
const rootElement = document.getElementById("root");

// Crie a raiz do React
const root = createRoot(rootElement);

// Renderize o aplicativo
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
