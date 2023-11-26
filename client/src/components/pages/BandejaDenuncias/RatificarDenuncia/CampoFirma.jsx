/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import SignaturePad from 'react-signature-canvas';
import { useAppDispatch } from '@/store/hooks';
import {
  setFirmaDenunciante,
  setFirmaFuncionario,
  clearFirmaDenunciante,
  clearFirmaFuncionario,
} from '@/store/denuncias/ratificarDenuncia/ratificarDenuncia.slice';
import { Dialog } from 'primereact/dialog';

export const CampoFirma = ({
  id,
  type,
  title,
  signatureRef,
  visible,
  setVisible,
}) => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      return;
    }

    const image = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL('image/png');

    if (type === 'denunciante') {
      dispatch(setFirmaDenunciante(image));
    }

    if (type === 'funcionario') {
      dispatch(setFirmaFuncionario(image));
    }

    onHide();
  };

  const handleClear = () => {
    if (type === 'denunciante') {
      dispatch(clearFirmaDenunciante());
    }

    if (type === 'funcionario') {
      dispatch(clearFirmaFuncionario());
    }

    signatureRef.current.clear();
    onHide();
  };

  const onHide = () => {
    setVisible(false);
  };

  return (
    <Dialog
      draggable={false}
      header={`${title} - Denuncia N° ${id}`}
      visible={visible}
      onHide={onHide}
      className='md:w-6 w-8'
    >
      <section className='mx-2'>
        <div className='mb-1'>
          <h3>Ingrese Firma y DNI</h3>

          <div className='mt-2'>
            <SignaturePad
              ref={signatureRef}
              canvasProps={{ className: 'signature-canvas' }}
            />

            <div className='mt-3 text-right'>
              <Button
                size='small'
                label='Guardar'
                className='btn-blue-mpa mr-2'
                type='button'
                onClick={handleSave}
              />

              <Button
                size='small'
                label='Limpiar'
                className='bg-bluegray-100 text-gray-900 border-bluegray-100 hover:bg-bluegray-200'
                type='button'
                onClick={handleClear}
              />
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  );
};
