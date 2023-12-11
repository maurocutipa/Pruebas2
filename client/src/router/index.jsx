import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header_ from '@/components/layouts/Header_';

import LoginPage from '@/pages/Login';
import BandejaDenuncias from '@/pages/BandejaDenuncias';
import { VerDenuncia } from '@/pages/BandejaDenuncias/VerDenuncia';
import { ConvertirDenunciaALegajo } from '@/pages/BandejaDenuncias/ConvertirDenunciaALegajo';
import { RatificarDenuncia } from '@/pages/BandejaDenuncias/RatificarDenuncia';
import { ArchivarDenuncia } from '@/pages/BandejaDenuncias/ArchivarDenuncia';
import { DenunciaNoPenal } from '@/pages/BandejaDenuncias/DenunciaNoPenal';
import { Firmar } from '@/pages/Firmar';
import { Legajo } from '@/pages/Legajo';
import { PrivateRoutes } from './auth/PrivateRoutes';
import { PublicRoutes } from './auth/PublicRoutes';
import { useAuth } from '@/hooks/useAuth';
import Denuncia from '../pages/Denuncia/Denuncia';
import { Art321 } from '../pages/Legajo/Art321';

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
            <Route path='/firmar' element={<Firmar />} />
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

            <Route path='/legajo/:id' element={<Legajo />} />
            <Route path='/certificar-art-321/:id' element={<Art321 />} />

            <Route
              path='/denuncias'
              // element={<h1>holaaaa</h1>}
              element={<Denuncia />}
            />
            <Route
              path='/pruebas'
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
