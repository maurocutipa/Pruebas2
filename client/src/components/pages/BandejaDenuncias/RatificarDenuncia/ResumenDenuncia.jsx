/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getResumenDenunciaThunk } from '@/store/denuncias/ratificarDenuncia/ratificarDenuncia.thunks';
import { ProgressSpinner } from 'primereact/progressspinner';
import { PdfViewer } from '@/components/common/PdfViewer';
import { Button } from 'primereact/button';
import { GET_COMPROBANTE_PDF } from '@/constants';
import { parseDDMMYYYYHHMM } from '@/utils/parseDate';

export const ResumenDenuncia = ({ id }) => {
  const [showComprobante, setShowComprobante] = useState(false);
  const dispatch = useAppDispatch();
  const { resumenDenuncia } = useAppSelector(
    (state) => state.ratificarDenuncia
  );

  const { resumen, victimas, denunciados, testigos } = resumenDenuncia
    ? resumenDenuncia
    : {};

  useEffect(() => {
    dispatch(getResumenDenunciaThunk(id));
  }, [dispatch, id]);

  const handleMostrarComprobante = () => {
    setShowComprobante(true);
  };

  const Interviniente = ({ interviniente }) => {
    return (
      <div key={interviniente.id} className='col-12 lg:col-6'>
        <p className='font-bold'>
          Tipo de persona:{' '}
          <span className='font-normal'>{interviniente.tipoPersona}</span>
        </p>
        <p className='font-bold'>
          Apellido del agresor:{' '}
          <span className='font-normal'>{interviniente.apellido}</span>
        </p>
        <p className='font-bold'>
          Nombre del agresor:{' '}
          <span className='font-normal'>{interviniente.nombre}</span>{' '}
        </p>
        <p className='font-bold'>
          Tipo identificación:{' '}
          <span className='font-normal'>
            {interviniente.tipoIdentificacion.toUpperCase()}
          </span>
        </p>
        <p className='font-bold'>
          Número identificación:{' '}
          <span className='font-normal'>
            {interviniente.numeroIdentificacion}
          </span>
        </p>
        <p className='font-bold'>
          Teléfono móvil:{' '}
          <span className='font-normal'>{interviniente.telefonoMovil}</span>
        </p>
        <p className='font-bold'>
          Teléfono fijo:{' '}
          <span className='font-normal'>{interviniente.telefonoFijo}</span>
        </p>
        <p className='font-bold'>
          Email: <span className='font-normal'>{interviniente.email}</span>
        </p>
        <p className='font-bold'>
          Provincia:{' '}
          <span className='font-normal'>
            {interviniente.nombreProvincia
              ? interviniente.nombreProvincia
              : '-'}
          </span>
        </p>
        <p className='font-bold'>
          Localidad:{' '}
          <span className='font-normal'>
            {interviniente.localidad ? interviniente.localidad : '-'}
          </span>
        </p>

        <Divider className='mt-6' />
      </div>
    );
  };

  return (
    <>
      {resumenDenuncia ? (
        <>
          <Card className='shadow-1 px-7'>
            <h2>Resumen de la Denuncia Nro: {id}</h2>

            <div className='grid mt-6'>
              <div className='col-12 lg:col-6' id='datos-generales'>
                <h3>Datos Generales</h3>

                <p className='font-bold'>
                  Fecha:{' '}
                  <span className='font-normal'>
                    {parseDDMMYYYYHHMM(
                      resumen.fechaDenuncia,
                      resumen.horaDenuncia
                    )}
                  </span>
                </p>
                <p className='font-bold'>
                  Tipo:{' '}
                  <span className='font-normal'>{resumen.tipoDenuncia}</span>
                </p>
              </div>

              <div className='col-12 lg:col-6' id='datos-hecho'>
                <h3>Datos del Hecho </h3>
                <p className='font-bold'>
                  Localidad:{' '}
                  <span className='font-normal'>{resumen.localidad}</span>
                </p>
                {resumen.certezaLugar === 1 ? (
                  <div className=''>
                    <p className='font-bold'>
                      Fecha y hora del hecho{' '}
                      <span className='font-normal'>
                        {parseDDMMYYYYHHMM(
                          resumen.fechaHecho,
                          resumen.horaHecho
                        )}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className='font-bold'>
                    Detalle lugar:{' '}
                    <span className='font-normal'>{resumen.detalleLugar}</span>
                  </p>
                )}
              </div>
            </div>

            {/* TODO: Agregar los campos y recorrer cuando hay victimas*/}
            <div className='mt-6' id='datos-denunciante'>
              {resumen.anonimo === 0 ? (
                <>
                  <h3>Datos del Denunciante</h3>
                  {victimas.map((victima) => (
                    <Interviniente interviniente={victima} key={victima.id} />
                  ))}
                </>
              ) : (
                <h3>La denuncia se realizó de forma anónima</h3>
              )}
            </div>

            <div className='mt-6' id='datos-involucrados'>
              <h3>Datos de los Denunciados</h3>
              <div className='grid'>
                {resumen.datosDenunciado === 1 ? (
                  <>
                    {denunciados.map((denunciado) => (
                      <Interviniente
                        interviniente={denunciado}
                        key={denunciado.id}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {denunciados.map((denunciado) => (
                      <p className='' key={denunciado.id}>
                        Información adicional: {denunciado.informacionAdicional}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className='mt-6' id='datos-testigos'>
              {testigos.length !== 0 ? (
                <h3>Datos de los Testigos</h3>
              ) : (
                <h3>No hay testigos en esta denuncia </h3>
              )}
              <div className='grid'>
                {resumen.datosTestigos === 1 ? (
                  <>
                    {testigos.map((testigo) => (
                      <Interviniente interviniente={testigo} key={testigo.id} />
                    ))}
                  </>
                ) : (
                  <>
                    {testigos.map((testigo) => (
                      <p className='' key={testigo.id}>
                        Información adicional: {testigo.informacionAdicional}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className='mt-6'>
              <h3>Adjuntos/Evidencias</h3>

              <p className=''>Descripción de la evidencia</p>
              <p className=''>Archivos cargados</p>
            </div>

            <div className='mt-6'>
              <Button
                className='btn-blue-mpa'
                label='Mostrar comprobante completo'
                onClick={handleMostrarComprobante}
                disabled={!resumenDenuncia.comprobante}
              />
            </div>
          </Card>

          <Dialog
            header={`Comprobante completo de la denuncia Nro: ${id}`}
            visible={showComprobante}
            className='w-10 xl:w-8'
            onHide={() => setShowComprobante(false)}
            draggable={false}
          >
            <div className='px-4' style={{ height: '500px' }}>
              <PdfViewer
                height={500}
                url={`${GET_COMPROBANTE_PDF}/${resumenDenuncia.comprobante?.nombreArchivo}`}
              />
            </div>
          </Dialog>
        </>
      ) : (
        <div className='text-center'>
          <ProgressSpinner />
        </div>
      )}
    </>
  );
};
