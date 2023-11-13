/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';

import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { Steps } from 'primereact/steps';

const paseFormInitialState = {
  competencia: 1,
  usuario: '',
  motivoDelPase:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus magni quisquam dignissimos dolore necessitatibus maxime.',
  archivoAFirmar: '',
};

const items = [
  {
    label: 'Detalles',
  },
  {
    label: 'Firma Digital',
  },
  {
    label: 'Confirmación',
  },
];

export const RealizarPaseDenuncia = ({ visible, setVisible }) => {
  const [paseForm, setPaseForm] = useState(paseFormInitialState);
  const [activeIndex, setActiveIndex] = useState(0);

  const { user } = useAppSelector((state) => state.auth);
  const { selectedIdDenuncia } = useAppSelector((state) => state.denuncias);
  const { data } = useAppSelector((state) => state.data);

  const accept = () => {
    setPaseForm({ ...paseForm, usuario: user });
    onHide();
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
    setActiveIndex(0);
    setPaseForm(paseFormInitialState);
    setVisible(false);
  };

  const handleNextIndex = () => {
    if (activeIndex >= 2) {
      return;
    }

    setActiveIndex((prev) => prev + 1);
  };

  const handlePrevIndex = () => {
    if (activeIndex <= 0) {
      return;
    }

    setActiveIndex((prev) => prev - 1);
  };

  const currentCompetencia = (id) => {
    const { competencia } = data.competencias.find(
      (c) => c.idCompetencia === id
    );

    return competencia;
  };

  return (
    <Dialog
      draggable={false}
      header={`Realizar Pase de la Denuncia: #${selectedIdDenuncia}`}
      visible={visible}
      onHide={onHide}
      className='md:w-6 w-8'
    >
      <Steps model={items} activeIndex={activeIndex} readOnly />
      <form className='mx-4 mt-6'>
        {activeIndex === 0 && (
          <section className='mx-2'>
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
          </section>
        )}

        {activeIndex === 1 && (
          <section className='mx-2'>
            <div className='mb-5'>
              <h3>Archivos a Firmar</h3>
              <label htmlFor='archivoFirmar'>Seleccione un Certificado*</label>
              <Dropdown
                id='archivoAFirmar'
                name='archivoAFirmar'
                className='w-full mt-2'
                value={paseForm.archivoAFirmar}
                onChange={handleInputChange}
                options={[]}
              />

              <div className='mt-5'>
                <Button
                  size='small'
                  label='Firmar Archivos'
                  className='btn-blue-mpa mr-2'
                  type='button'
                />

                <Button
                  size='small'
                  label='Actualizar Certificados'
                  className='bg-bluegray-100 text-gray-900 border-bluegray-100 hover:bg-bluegray-200'
                  type='button'
                />
              </div>
            </div>
          </section>
        )}

        {activeIndex === 2 && (
          <section className='mx-2 my-6'>
            <div className='mb-5'>
              <div className=''>
                <h3>Resumen</h3>
                <h4>
                  Autor del pase:{' '}
                  <span className='font-normal'>{user.username}</span>
                </h4>

                <h4>
                  Nueva competencia:{' '}
                  <span className='font-normal'>
                    {currentCompetencia(paseForm.competencia)}
                  </span>
                </h4>

                <div className='font-bold'>Motivo del pase:</div>
                <div>{paseForm.motivoDelPase}</div>
              </div>
            </div>
          </section>
        )}

        <div className='flex justify-content-between'>
          <div>
            {activeIndex !== 0 && (
              <Button
                icon='pi pi-chevron-left'
                iconPos='left'
                label='Anterior'
                className='text-lightblue-mpa'
                type='button'
                link
                onClick={handlePrevIndex}
              />
            )}
          </div>

          <div>
            {activeIndex !== 2 && (
              <Button
                icon='pi pi-chevron-right'
                iconPos='right'
                label='Siguiente'
                className='text-lightblue-mpa'
                type='button'
                link
                onClick={handleNextIndex}
              />
            )}
            {activeIndex === 2 && (
              <Button
                label='Finalizar Pase'
                className='btn-blue-mpa'
                type='button'
                onClick={handleRealizarPase}
              />
            )}
          </div>
        </div>
      </form>
      <ConfirmPopup />
    </Dialog>
  );
};
