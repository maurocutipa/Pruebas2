import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ResumenDenuncia } from '@/components/pages/BandejaDenuncias/RatificarDenuncia/ResumenDenuncia';
import { FirmaYTOS } from '@/components/pages/BandejaDenuncias/RatificarDenuncia/FirmaYTOS';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ratificarDenunciaThunk } from '@/store/denuncias/ratificarDenuncia/ratificarDenuncia.thunks';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toastError, toastSuccess } from '@/utils/toastMessage';
import { Dialog } from 'primereact/dialog';
import { PdfPreview } from '@/components/pages/BandejaDenuncias/RatificarDenuncia/PdfPreview';

export const RatificarDenuncia = () => {
  const [showComprobante, setShowComprobante] = useState(false);
  const toast = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { firmaDenunciante, firmaFuncionario, estaRatificada } = useAppSelector(
    (state) => state.ratificarDenuncia.form
  );

  const handleRatificarDenuncia = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: `¿Esta seguro de ratificar la denuncia N° ${id}?`,
      icon: 'pi pi-info-circle',
      accept,
    });
  };

  const accept = async () => {
    const { meta } = await dispatch(ratificarDenunciaThunk(id));

    if (meta.requestStatus === 'fulfilled') {
      toastSuccess(
        toast,
        'Se realizó la ratificación, puede regresar a la bandeja de denuncias'
      );
    } else {
      toastError(toast, 'No se pudo realizar la ratificación');
    }
  };

  return (
    <>
      <div className='px-8 py-4'>
        <Toast ref={toast} />
        <ConfirmPopup />
        <h1 className='text-center'>Ratificar Denuncia N° {id}</h1>

        {estaRatificada && (
          <div className='text-xl text-center text-red-700 font-bold'>
            Esta denuncia ya fue ratificada
          </div>
        )}

        <div className='mt-6'>
          <Button
            icon='pi pi-angle-left'
            label='Regresar a la bandeja'
            className='text-lightblue-mpa p-0 mb-4'
            type='button'
            link
            onClick={() => navigate('/bandeja-denuncias')}
          />

          {!estaRatificada && (
            <>
              <ResumenDenuncia id={id} />
              <FirmaYTOS
                id={id}
                firmaDenunciante={firmaDenunciante}
                firmaFuncionario={firmaFuncionario}
              />
            </>
          )}
        </div>

        {!estaRatificada && (
          <div className='flex justify-content-between mt-6 mb-2'>
            <Button
              icon='pi pi-angle-left'
              label={'Cancelar'}
              className='bg-red-700 hover:bg-red-800 border-red-700'
              size='large'
              onClick={() => {
                navigate('/bandeja-denuncias');
              }}
            />

            <div>
              <Button
                onClick={handleRatificarDenuncia}
                label={'Ratificar Denuncia'}
                className='btn-blue-mpa'
                size='large'
                disabled={!firmaDenunciante || !firmaFuncionario}
              />

              <Button
                onClick={() => setShowComprobante(true)}
                label={'Ver Comprobante'}
                className='btn-blue-mpa'
                size='large'
              />
            </div>
          </div>
        )}

        <Dialog
          header={`Nuevo comprobante de la denuncia N° ${id}`}
          visible={showComprobante}
          className='w-10 xl:w-8'
          onHide={() => setShowComprobante(false)}
          draggable={false}
        >
          <div className='px-4' style={{ height: '500px' }}>
            <PdfPreview
              firmaDenunciante={firmaDenunciante}
              firmaFuncionario={firmaFuncionario}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
};
