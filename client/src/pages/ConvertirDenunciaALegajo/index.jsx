// Generado y sin generar
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';

import { AsignarDelito } from '@/components/pages/ConvertirDenunciaALegajo/AsignarDelitos';
import { ResumenHechos } from '@/components/pages/ConvertirDenunciaALegajo/ResumenHechos';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDenunciadosParaLegajoThunk } from '@/store/legajoSlice/legajo.thunks';

export const ConvertirDenunciaALegajo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { legajoData, denunciaALegajoForm } = useAppSelector(
    (state) => state.legajo
  );
  const { data } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDenunciadosParaLegajoThunk(id));
  }, [dispatch, id]);

  const handleConvertirALegajo = () => {
    console.log({ ...denunciaALegajoForm, idDenuncia: id });
  };

  const disableButton = () => {
    return (
      denunciaALegajoForm.resumenHechos.length === 0 ||
      denunciaALegajoForm.delitos.length === 0 ||
      denunciaALegajoForm.fiscalia === ''
    );
  };

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Convertir Denuncia N° {id} a Legajo</h1>
      <ResumenHechos
        denunciados={legajoData.denunciados}
        delegacionesFiscales={data.delegacionesFiscales}
        resumenHechos={denunciaALegajoForm.resumenHechos}
      />

      <AsignarDelito
        denunciados={legajoData.denunciados}
        delitos={data.delitos}
        delitosAsignados={denunciaALegajoForm.delitos}
      />

      <div className='flex justify-content-between mt-8 mb-2'>
        <Button
          icon='pi pi-angle-left'
          label={'Cancelar '}
          onClick={() => navigate('/bandeja-denuncias')}
          className='bg-red-700 hover:bg-red-800 border-red-700'
          size='large'
        />
        <Button
          label={'Convertir a Legajo'}
          onClick={handleConvertirALegajo}
          disabled={disableButton()}
          className='btn-blue-mpa'
          size='large'
        />
      </div>
    </div>
  );
};
