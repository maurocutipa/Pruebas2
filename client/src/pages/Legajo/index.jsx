import { useEffect } from 'react';
import {useParams} from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLegajoThunk } from '@/store/legajo/legajos.thunks';
import { getDenunciaByIdThunk } from '@/store/denuncias/denuncias.thunks';
import { HeaderLegajo } from '../../components/pages/Legajo/HeaderLegajo';
import { getProfesionalesParaLegajoThunk } from '@/store/denuncias/denunciaLegajo/denunciaLegajo.thunks';

export const Legajo = () => {

  const dispatch = useAppDispatch();
  const { currentLegajo } = useAppSelector((state) => state.legajos);
  const { profesionales } = useAppSelector((state) => state.denunciaLegajo.legajoData);
  const { currentDenuncia, selectedIdDenuncia } = useAppSelector((state) => state.denuncias);

  const { id } = useParams();
    

  useEffect(() => {
    dispatch(getLegajoThunk(id))
    dispatch(getProfesionalesParaLegajoThunk(id))
    dispatch(getDenunciaByIdThunk(selectedIdDenuncia))
  }, [dispatch, id])
  

  return (
    <div className='px-8 pt-7 pb-4'>
      <HeaderLegajo />
    </div>
  );
};
