/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = ({ isAuth }) => {
  return <>{isAuth ? <Navigate to='/bandeja-denuncias' /> : <Outlet />}</>;
};
