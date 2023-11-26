import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ResumenDenuncia } from '@/components/pages/BandejaDenuncias/RatificarDenuncia/ResumenDenuncia';
import { FirmaYTOS } from '@/components/pages/BandejaDenuncias/RatificarDenuncia/FirmaYTOS';
import { useAppDispatch } from '@/store/hooks';
import { ratificarDenunciaThunk } from '@/store/denuncias/ratificarDenuncia/ratificarDenuncia.thunks';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toastError, toastSuccess } from '@/utils/toastMessage';

export const RatificarDenuncia = () => {
  const toast = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  const handleRatificarDenuncia = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: `¿Esta seguro de ratificar la denuncia #${id}?`,
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
        <h1 className='text-center'>Ratificar Denuncia Nro: {id}</h1>

        <div className='mt-6'>
          <Button
            icon='pi pi-angle-left'
            label='Regresar a la bandeja'
            className='text-lightblue-mpa p-0 mb-4'
            type='button'
            link
            onClick={() => navigate('/bandeja-denuncias')}
          />
          <ResumenDenuncia id={id} />
          <FirmaYTOS visible={visible} setVisible={setVisible} id={id} />
        </div>

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
              label={'Firmar'}
              className='btn-blue-mpa mr-4'
              size='large'
              onClick={() => setVisible(true)}
            />

            <Button
              onClick={handleRatificarDenuncia}
              label={'Ratificar Denuncia'}
              className='btn-blue-mpa'
              size='large'
            />
          </div>
        </div>
      </div>
    </>
  );
};
