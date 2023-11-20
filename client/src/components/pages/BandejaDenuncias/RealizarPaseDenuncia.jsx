/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = [
  { id: 1, label: 'Penal' },
  { id: 2, label: 'Archivar' },
  { id: 3, label: 'Otro' },
];

export const RealizarPaseDenuncia = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const [pase, setPase] = useState(1);
  const { selectedIdDenuncia } = useAppSelector((state) => state.denuncias);

  const handleInputChange = (ev) => {
    setPase(ev.target.value);
  };

  const handlePase = () => {
    if (pase === 1) {
      navigate(`/convertir-denuncia-legajo/${selectedIdDenuncia}`);
    }

    if (pase === 2) {
      navigate(`/archivar-denuncia/${selectedIdDenuncia}`);
    }

    if (pase === 3) {
      navigate(`/archivar-denuncia/${selectedIdDenuncia}`);
    }
  };

  const onHide = () => {
    setVisible(false);
  };

  return (
    <Dialog
      draggable={false}
      header={`Realizar Pase de la Denuncia: #${selectedIdDenuncia}`}
      visible={visible}
      onHide={onHide}
      className='md:w-6 w-8'
    >
      <div className='mx-4 mt-2'>
        <div className='mb-5'>
          <label htmlFor='competencia'>Seleccione el pase</label>
          <Dropdown
            id='pase'
            name='pase'
            className='w-full mt-2'
            value={pase}
            onChange={handleInputChange}
            options={options}
            optionValue='id'
            optionLabel='label'
          />
        </div>

        <div className='flex justify-content-end'>
          <Button
            icon='pi pi-chevron-right'
            iconPos='right'
            label='Siguiente'
            className='text-lightblue-mpa'
            type='button'
            link
            onClick={handlePase}
          />
        </div>
      </div>
    </Dialog>
  );
};
