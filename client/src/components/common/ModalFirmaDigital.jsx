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
  codigo: null,
  token: null,
  blocked: false,
  certThumb: null,
  certContent: null,
  toSignHash: null,
  digestAlgorithm: null,
  transferFile: null,
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



  const handleInputChange = (ev) => {
    pki.readCertificate(ev.target.value).success(function (certEncoded) {
      setFirmaDigitalState((prev) => ({
        ...prev,
        certThumb: ev.target.value,
        certContent: certEncoded,
      }));

    });

  };

  const onHide = () => {
    setActiveIndex(0);
    setFirmaDigitalState(firmaDigitalInitialState);
    setVisible(false);
  };

  const handleNextIndex = async () => {
    if (
      activeIndex >= 2 ||
      (activeIndex === 1 && !firmaDigitalState.certThumb)
    ) {
      return;
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
    if (firmaDigitalState.fileFirma) {
      const data = new FormData();

      data.append('fileFirma', firmaDigitalState.fileFirma);
      data.append('data', JSON.stringify(
        {
          certThumb: firmaDigitalState.certThumb,
          certContent: firmaDigitalState.certContent,
        }
      ))

      const resp = await startSignature(data);
      return resp;
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

  const accept = async () => {

    const newState = await startFirma();

    setFirmaDigitalState((prev) => ({...prev, ...newState, blocked: true}))
    console.log(newState);
    if (
      !newState.certThumb ||
      !newState.toSignHash ||
      !newState.digestAlgorithm ||
      !newState.transferFile ||
      !newState.codigo
    ) return;

    pki
      .signHash({
        thumbprint: newState.certThumb,
        hash: newState.toSignHash,
        digestAlgorithm: newState.digestAlgorithm,
      })
      .success(async (signature) => {
        console.log(signature); 
        const body = {
          codigo: newState.codigo,
          signature,
          transferFile: newState.transferFile,
        };

        await finishSignature(body);
        setFirmaDigitalState((prev) => ({ ...prev, blocked: false }));
        onHide();
        execAction();
      }).fail(err => {
        console.log(err);
        setFirmaDigitalState((prev) => ({ ...prev, blocked: false }));
      })
  };

  // wrap getCetificados in useCallback to avoid infinite loop
  const getCertificados = useCallback(() => {
    pki.init({
      ready: () =>
        pki
          .listCertificates({ filter: pki.filters.isWithinValidity })
          .success((certs) => {
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
                  value={firmaDigitalState.certThumb}
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
                  disabled={
                    activeIndex === 1 && !firmaDigitalState.certThumb
                  }
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
