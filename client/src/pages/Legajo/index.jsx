import { useEffect } from 'react';
import {useParams} from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLegajoThunk } from '@/store/legajo/legajos.thunks';
import { HeaderLegajo } from '../../components/pages/Legajo/HeaderLegajo';

export const Legajo = () => {

  const dispatch = useAppDispatch();
  const { currentLegajo } = useAppSelector((state) => state.legajos);

  const { id } = useParams();
    

  useEffect(() => {
    dispatch(getLegajoThunk(id))
  }, [dispatch, id])
  

  return (
    <div className='px-8 py-4'>
      <HeaderLegajo />
    </div>
  );
};
