/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';

import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';

const paseFormInitialState = {
  competencia: 1,
  usuario: '',
  motivoDelPase: '',
};

export const RealizarPaseDenuncia = ({ visible, setVisible }) => {
  const [paseForm, setPaseForm] = useState(paseFormInitialState);

  const { user } = useAppSelector((state) => state.auth);
  const { selectedIdDenuncia } = useAppSelector((state) => state.denuncias);
  const { data } = useAppSelector((state) => state.data);

  const accept = () => {
    setPaseForm({ ...paseForm, usuario: user });
    console.log(paseForm);
  };

  const handleRealizarPase = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Esta seguro de realizar el pase?',
      icon: 'pi pi-info-circle',
      accept,
    });
  };

  const handleInputChange = (ev) => {
    setPaseForm({
      ...paseForm,
      [ev.target.name]: ev.target.value,
    });
  };

  const onHide = () => {
    setVisible(false);
    setPaseForm(paseFormInitialState);
  };

  return (
    <Dialog
      draggable={false}
      header={`Realizar Pase de la Denuncia #${selectedIdDenuncia}`}
      visible={visible}
      onHide={onHide}
      className='md:w-6 w-8'
    >
      <form className='mx-2'>
        <div className='mb-5'>
          <label htmlFor='competencia'>Competencia</label>
          <Dropdown
            id='competencia'
            name='competencia'
            className='w-full mt-2'
            value={paseForm.competencia}
            onChange={handleInputChange}
            options={data.competencias}
            optionValue='idCompetencia'
            optionLabel='competencia'
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

        <div className='mb-5'>
          <label htmlFor='motivoPase'>Motivo del Pase *</label>
          <InputTextarea
            id='motivoPase'
            className='w-full mt-2'
            name='motivoDelPase'
            rows={5}
            cols={30}
            placeholder='Breve redacción del motivo del pase de la denuncia...'
            value={paseForm.motivoDelPase}
            onChange={handleInputChange}
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
