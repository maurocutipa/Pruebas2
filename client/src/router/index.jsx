import { createBrowserRouter } from 'react-router-dom';
import Header_ from '@/components/layouts/Header_';

import LoginPage from '@/pages/Login/Login.jsx';
import BandejaDenuncias from '@/pages/BandejaDenuncias';
import BandejaPasesDenuncias from '@/pages/BandejaPaseDenuncias';
import { VerDenuncia } from '@/pages/VerDenuncia';
import { ConvertirDenunciaALegajo } from '@/pages/ConvertirDenunciaALegajo';
import { RatificarDenuncia } from '@/pages/RatificarDenuncia';
import { ArchivarDenuncia } from '@/pages/ArchivarDenuncia';

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
      {
        path: '/ver-denuncia/:id',
        element: <VerDenuncia />,
      },
      {
        path: '/convertir-denuncia-legajo/:id',
        element: <ConvertirDenunciaALegajo />,
      },
      {
        path: '/archivar-denuncia/:id',
        element: <ArchivarDenuncia />,
      },
      {
        path: '/ratificar-denuncia/:id',
        element: <RatificarDenuncia />,
      },
    ],
  },
]);
