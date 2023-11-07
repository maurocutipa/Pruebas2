/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';

import { useAppSelector } from '@/store/hooks';

export const RealizarPaseDenuncia = ({ visible, setVisible }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { selectedIdDenuncia } = useAppSelector((state) => state.denuncias);

  const accept = () => {
    console.log('PASE REALIZADO');
  };

  const handleRealizarPase = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Esta seguro de realizar el pase?',
      icon: 'pi pi-info-circle',
      accept,
      reject: () => {},
    });
  };

  return (
    <Dialog
      draggable={false}
      header={`Realizar Pase de la Denuncia #${selectedIdDenuncia}`}
      visible={visible}
      onHide={() => setVisible(false)}
      className='md:w-6 w-8'
    >
      <form className='mx-2'>
        <div className='mb-5'>
          <label htmlFor='sectorOrigen'>Sector Origen</label>
          <InputText
            id='sectorOrigen'
            name='sectorOrigen'
            className='w-full mt-2'
            disabled={true}
            value='SECTOR ORIGEN'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='sectorDestino'>Sector Destino</label>
          <Dropdown
            id='sectorDestino'
            name='sectorDestino'
            placeholder='Seleccion el sector de destino'
            className='w-full mt-2'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='usuario'>Usuario</label>
          <InputText
            id='usuario'
            name='usuario'
            className='w-full mt-2'
            disabled={true}
            value={user.username}
          />
        </div>

        <ConfirmPopup
          pt={{
            root: { className: 'surface-100' },
            acceptButton: { root: { className: 'btn-blue-mpa' } },
            rejectButton: { root: { className: 'text-blue-mpa' } },
          }}
        />
        <Button
          label='Realizar Pase'
          className='btn-blue-mpa'
          type='button'
          onClick={handleRealizarPase}
        />
      </form>
    </Dialog>
  );
};
