import { createBrowserRouter } from 'react-router-dom';
import Header_ from '@/components/layouts/Header_';

import LoginPage from '@/pages/Login/Login.jsx';
import BandejaDenuncias from '@/pages/BandejaDenuncias';
import BandejaPasesDenuncias from '@/pages/BandejaPaseDenuncias';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <>
        <Header_ />
        <div className='content'></div>
      </>
    ),
    children: [
      {
        path: '/bandeja-denuncias',
        element: <BandejaDenuncias />,
        index: true,
      },
      {
        path: '/bandeja-pase-denuncias',
        element: <BandejaPasesDenuncias />,
      },
    ],
  },
]);
