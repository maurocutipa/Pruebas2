/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getResumenDenunciaThunk } from '@/store/denunciasSlice/denuncias.thunks';
import { ProgressSpinner } from 'primereact/progressspinner';
import { parseDDMMYYYY } from '../../../utils/parseDate';

export const ResumenDenuncia = ({ id }) => {
  const dispatch = useAppDispatch();
  const { resumenDenuncia } = useAppSelector((state) => state.denuncias);

  const { resumen, victimas, denunciados, testigos } = resumenDenuncia
    ? resumenDenuncia
    : {};

  useEffect(() => {
    dispatch(getResumenDenunciaThunk(id));
  }, [dispatch, id]);

  const Interviniente = ({ interviniente }) => {
    return (
      <div key={interviniente.id} className='col-12 lg:col-6'>
        <p className=''>Tipo de persona: {interviniente.tipoPersona}</p>
        <p className=''>Apellido del agresor: {interviniente.apellido}</p>
        <p className=''>Nombre del agresor: {interviniente.nombre} </p>
        <p className=''>
          Alias del agresor:{' '}
          {interviniente.alias ? interviniente.alias : 'NO ESPECIFICA'}
        </p>
        <p className=''>Nacionalidad del agresor:</p>
        <p className=''>
          Tipo identificación: {interviniente.tipoIdentificacion.toUpperCase()}
        </p>
        <p className=''>
          Número identificación: {interviniente.numeroIdentificacion}
        </p>
        <p className=''>
          Fecha nacimiento: {parseDDMMYYYY(interviniente.fechaNacimiento)}
        </p>
        <p className=''>
          Género:{' '}
          {interviniente.genero ? interviniente.genero : 'NO ESPECIFICA'}
        </p>
        <p className=''>Teléfono móvil: {interviniente.telefonoMovil}</p>
        <p className=''>Teléfono fijo: {interviniente.telefonoFijo}</p>
        <p className=''>Email: {interviniente.email}</p>
        <p className=''>
          Provincia:{' '}
          {interviniente.nombreProvincia ? interviniente.nombreProvincia : '-'}
        </p>
        <p className=''>
          Localidad: {interviniente.localidad ? interviniente.localidad : '-'}
        </p>
        <p className=''>
          Barrio:{' '}
          {interviniente.nombreBarrio ? interviniente.nombreBarrio : '-'}
        </p>
        <p className=''>
          Domicilio: {interviniente.domicilio ? interviniente.domicilio : '-'}
        </p>
        <Divider />
      </div>
    );
  };

  return (
    <>
      {resumenDenuncia ? (
        <Card className='shadow-1 px-7 mt-6'>
          <h2>Resumen de la Denuncia</h2>

          <div className='mt-6' id='datos-generales'>
            <h3>Datos Generales</h3>

            <p className=''>Fecha: {resumen.fechaDenuncia}</p>
            <p className=''>Tipo: {resumen.tipoDenuncia}</p>
          </div>

          {/* TODO: Agregar los campos y recorrer cuando hay victimas*/}
          <div className='mt-6' id='datos-denunciante'>
            {resumen.anonimo === 0 ? (
              <>
                {victimas.map((victima) => (
                  <Interviniente interviniente={victima} key={victima.id} />
                ))}
              </>
            ) : (
              <h3>La denuncia se realizó de forma anónima</h3>
            )}
          </div>

          {/*  TODO: Agregar los campos necesarios cuando si hay certeza del lugar */}
          <div className='mt-6' id='datos-hecho'>
            <h3>Datos del Hecho </h3>
            <p className=''>Localidad: {resumen.localidad}</p>
            {resumen.certezaLugar === 1 ? (
              <div className=''>
                <p className=''>Fecha y hora del hecho</p>
                <p className=''>Departamento</p>
                <p className=''>Calle</p>
                <p className=''>Esquina mas cercana</p>
                <p className=''>Número</p>
                <p className=''>Detalle de la ubicación</p>
                <p className=''>Lugar del hecho</p>
              </div>
            ) : (
              <p>Detalle lugar: {resumen.detalleLugar}</p>
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
        </Card>
      ) : (
        <div className='text-center'>
          <ProgressSpinner />
        </div>
      )}
    </>
  );
};
