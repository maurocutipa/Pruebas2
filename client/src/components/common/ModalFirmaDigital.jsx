/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { BlockUI } from 'primereact/blockui';
import { InputText } from 'primereact/inputtext';

import { useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Steps } from 'primereact/steps';

import { LacunaWebPKI } from 'web-pki';

import { finishSignature, startSignature } from '@/api/firmaDigital.api';

const firmaDigitalInitialState = {
  fileFirma: null,
  certificado: null,
  codigo: null,
  token: null,
  blocked: false,
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

export const ModalFirmaDigital = ({
  visible,
  setVisible,
  firmaData,
  children,
  temporal,
  execAction,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [firmaDigitalState, setFirmaDigitalState] = useState({
    ...firmaDigitalInitialState,
    fileFirma: firmaData,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [certificados, setCertificados] = useState([]);

  const fileRef = useRef(null);

  const pki = new LacunaWebPKI();

  const accept = () => {
    if (
      !firmaDigitalState.token ||
      !firmaDigitalState.certificado ||
      !firmaDigitalState.codigo
    )
      return;

    setFirmaDigitalState((prev) => ({ ...prev, blocked: true }));

    pki
      .signWithRestPki({
        token: firmaDigitalState.token,
        thumbprint: firmaDigitalState.certificado,
      })
      .success(async () => {
        const body = {
          token: firmaDigitalState.token,
          codigo: firmaDigitalState.codigo,
        };

        await finishSignature(body);
        setFirmaDigitalState((prev) => ({ ...prev, blocked: false }));
        onHide();
        execAction();
      });
  };

  const handleInputChange = (ev) => {
    setFirmaDigitalState((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  const onHide = () => {
    setActiveIndex(0);
    setFirmaDigitalState(firmaDigitalInitialState);
    setVisible(false);
  };

  const handleNextIndex = async () => {
    if (
      activeIndex >= 2 ||
      (activeIndex === 1 && !firmaDigitalState.certificado)
    ) {
      return;
    }

    if (activeIndex + 1 === 1) {
      await startFirma();
    }

    setActiveIndex((prev) => prev + 1);
  };

  const handleUploadFile = (e) => {
    setFirmaDigitalState({
      ...firmaDigitalState,
      fileFirma: e.target.files[0],
    });
  };

  const startFirma = async () => {
    setFirmaDigitalState((prev) => ({ ...prev, blocked: true }));

    if (firmaDigitalState.fileFirma) {
      const data = new FormData();

      data.append('fileFirma', firmaDigitalState.fileFirma.blob);

      const resp = await startSignature(data);
      const newState = {
        token: resp.token,
        blocked: false,
        codigo: resp.codigo,
      };
      setFirmaDigitalState((prev) => ({ ...prev, ...newState }));
    }
  };

  const completeFirma = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Esta seguro de firmar el documento?',
      icon: 'pi pi-info-circle',
      accept,
    });
  };

  // wrap getCetificados in useCallback to avoid infinite loop
  const getCertificados = useCallback(() => {
    pki.init({
      ready: () =>
        pki
          .listCertificates({ filter: pki.filters.isWithinValidity })
          .success((certs) => {
            console.log(certs);
            setCertificados(
              certs?.map((c) => ({
                label: c.subjectName,
                value: c.thumbprint,
              }))
            );
          }),
    });
  }, []);

  useEffect(() => {
    getCertificados();

    return () => {
      setFirmaDigitalState(firmaDigitalInitialState);
    };
  }, [getCertificados]);

  return (
    <>
      <BlockUI
        blocked={firmaDigitalState.blocked}
        fullScreen
        template={
          <ProgressSpinner
            style={{ width: '10em', height: '10em' }}
            strokeWidth='3'
          />
        }
      />
      <Dialog
        draggable={false}
        header={`Realizar firma digital`}
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
                  value={user.username.toUpperCase()}
                />
              </div>

              {temporal && (
                <div className='mb-5'>
                  <label htmlFor='competencia'>Documento a firmar</label>
                  <br />
                  <input
                    type='file'
                    name='asdasd'
                    id='asdasdasd'
                    ref={fileRef}
                    onChange={handleUploadFile}
                  />
                </div>
              )}
            </section>
          )}

          {activeIndex === 1 && (
            <section className='mx-2'>
              <div className='mb-5'>
                <h3>Archivos a Firmar</h3>
                <label htmlFor='archivoFirmar'>
                  Seleccione un Certificado*
                </label>
                <Dropdown
                  id='certificado'
                  name='certificado'
                  className='w-full mt-2'
                  value={firmaDigitalState.certificado}
                  onChange={handleInputChange}
                  options={certificados}
                  optionLabel='label'
                  optionValue='value'
                />

                <div className='mt-5'>
                  <Button
                    size='small'
                    label='Actualizar Certificados'
                    className='bg-bluegray-100 text-gray-900 border-bluegray-100 hover:bg-bluegray-200'
                    type='button'
                    onClick={getCertificados}
                  />
                </div>
              </div>
            </section>
          )}

          {activeIndex === 2 && (
            <section className='mx-2 my-6'>
              <div className='mb-5'>{children}</div>
            </section>
          )}

          <div className='flex justify-content-end'>
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
                  label='Firmar y Finalizar'
                  className='btn-blue-mpa'
                  type='button'
                  onClick={completeFirma}
                />
              )}
            </div>
          </div>
        </form>
        <ConfirmPopup />
      </Dialog>
    </>
  );
};
