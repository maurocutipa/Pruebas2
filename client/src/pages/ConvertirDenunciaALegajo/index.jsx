// Generado y sin generar
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';

import { AsignarDelito } from '@/components/pages/ConvertirDenunciaALegajo/AsignarDelitos';
import { ResumenHechos } from '@/components/pages/ConvertirDenunciaALegajo/ResumenHechos';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDenunciadosParaLegajoThunk } from '@/store/legajoSlice/legajo.thunks';

export const ConvertirDenunciaALegajo = () => {
  const { id } = useParams();
  const { legajoData } = useAppSelector((state) => state.legajo);
  const { data } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDenunciadosParaLegajoThunk(id));
  }, [dispatch, id]);

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Convertir Denuncia N° {id} a Legajo</h1>
      <ResumenHechos
        denunciados={legajoData.denunciados}
        delegacionesFiscales={data.delegacionesFiscales}
      />

      <AsignarDelito
        denunciados={legajoData.denunciados}
        delitos={data.delitos}
      />

      <div className='flex justify-content-between mt-8 mb-2'>
        <Button
          label={'Cancelar'}
          className='bg-red-700 hover:bg-red-800 border-red-700'
          size='large'
        />
        <Button
          label={'Convertir a Legajo'}
          className='btn-blue-mpa'
          size='large'
        />
      </div>
    </div>
  );
};
