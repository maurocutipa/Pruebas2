// Generado y sin generar
import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';

import { AsignarDelito } from '@/components/pages/BandejaDenuncias/ConvertirDenunciaALegajo/AsignarDelitos';
import { ResumenHechos } from '@/components/pages/BandejaDenuncias/ConvertirDenunciaALegajo/ResumenHechos';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Toast } from 'primereact/toast';
import { toastError, toastSuccess } from '@/utils/toastMessage';
import {
  getDenunciadosParaLegajoThunk,
  crearDenunciaLegajoThunk,
  getAccionTomadaThunk,
} from '@/store/denuncias/denunciaLegajo/denunciaLegajo.thunks';
import { resetState } from '@/store/denuncias/denunciaLegajo/denunciaLegajo.slice';
import { PdfPreview } from '@/components/pages/BandejaDenuncias/ConvertirDenunciaALegajo/PdfPreview';

export const ConvertirDenunciaALegajo = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { legajoData, denunciaALegajoForm } = useAppSelector(
    (state) => state.denunciaLegajo
  );
  const { data } = useAppSelector((state) => state.data);
  const [showPdf, setShowPdf] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccionTomadaThunk(id));
    dispatch(getDenunciadosParaLegajoThunk(id));

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, id]);

  const handleConvertirALegajo = async () => {
    setShowPdf(true);
  };

  const execAction = async () => {
    const formData = { ...denunciaALegajoForm, idDenuncia: Number(id) };
    const { meta } = await dispatch(crearDenunciaLegajoThunk(formData));

    if (meta.requestStatus === 'fulfilled') {
      toastSuccess(
        toast,
        'Denuncia convertida a legajo, puede regresar a la bandeja de denuncias'
      );
    } else {
      toastError(toast, 'No se pudo convertir la denuncia a legajo');
    }
  };

  const disableButton = () => {
    return (
      denunciaALegajoForm.resumenHechos.length === 0 ||
      denunciaALegajoForm.delitos.length === 0 ||
      denunciaALegajoForm.fiscalia === ''
    );
  };

  const goToBandeja = () => {
    navigate('/bandeja-denuncias');
  };

  return (
    <>
      <Toast ref={toast} />
      {legajoData.denunciados && data.delitos ? (
        <div className='px-8 py-4'>
          <h1 className='text-center'>Convertir Denuncia N° {id} a Legajo</h1>

          <div className='mt-6'>
            <Button
              icon='pi pi-angle-left'
              label='Regresar a la bandeja'
              className='text-lightblue-mpa p-0 mb-4'
              type='button'
              link
              onClick={goToBandeja}
            />
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
          </div>

          <div className='flex justify-content-between mt-8 mb-2'>
            <Button
              icon='pi pi-angle-left'
              label={'Cancelar '}
              onClick={goToBandeja}
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

          {showPdf && (
            <PdfPreview
              visible={showPdf}
              setVisible={setShowPdf}
              execAction={execAction}
            />
          )}
        </div>
      ) : (
        <div className=''>Cargando...</div>
      )}
    </>
  );
};
