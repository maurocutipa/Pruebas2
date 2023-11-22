import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header_ from '@/components/layouts/Header_';

import LoginPage from '@/pages/Login/Login.jsx';
import BandejaDenuncias from '@/pages/BandejaDenuncias';
import { VerDenuncia } from '@/pages/VerDenuncia';
import { ConvertirDenunciaALegajo } from '@/pages/ConvertirDenunciaALegajo';
import { RatificarDenuncia } from '@/pages/RatificarDenuncia';
import { ArchivarDenuncia } from '@/pages/ArchivarDenuncia';
import { DenunciaNoPenal } from '@/pages/DenunciaNoPenal';
import { PrivateRoutes } from './auth/PrivateRoutes';
import { PublicRoutes } from './auth/PublicRoutes';
import { useAuth } from '../hooks/useAuth';

export const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<PublicRoutes isAuth={!!user} />}>
          <Route path='/login' index element={<LoginPage />} />
        </Route>

        <Route path='/' element={<PrivateRoutes isAuth={!!user} />}>
          <Route element={<Header_ />}>
            <Route path='/bandeja-denuncias' element={<BandejaDenuncias />} />

            <Route path='/ver-denuncia/:id' element={<VerDenuncia />} />

            <Route
              path='/convertir-denuncia-legajo/:id'
              element={<ConvertirDenunciaALegajo />}
            />

            <Route
              path='/archivar-denuncia/:id'
              element={<ArchivarDenuncia />}
            />

            <Route
              path='/ratificar-denuncia/:id'
              element={<RatificarDenuncia />}
            />

            <Route
              path='/denuncia-no-penal/:id'
              element={<DenunciaNoPenal />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
