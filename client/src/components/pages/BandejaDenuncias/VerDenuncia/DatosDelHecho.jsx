import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { VehiculosInvolucradosTable } from './TablasVerDenuncia/IncidentesViales/VehiculosInvolucradosTable';
import { ObjetosSustraidosTable } from './TablasVerDenuncia/ObjetosSustraidos/ObjetosSustraidosTable';
import { AnexoViolenciaDeGenero } from './TablasVerDenuncia/AnexoViolenciaDeGenero/AnexoViolenciaDeGenero';
import { AdjuntosDenuncia } from './TablasVerDenuncia/AdjuntosDenuncia/AdjuntosDenuncia';
import { AnexoDelitosSexuales } from './TablasVerDenuncia/AnexoDelitosSexuales/AnexoDelitosSexuales';

import { useEffect, useState } from 'react';

export const DatosDelHecho = ({ datosDenuncia }) => {
  const denuncia = datosDenuncia.denuncia;
  const tipoDenuncia = datosDenuncia.denuncia.tipoDenuncia;
  const adjuntosDenuncia = datosDenuncia.adjuntos;

  // ============================== Seccion de datos de Robo/Hurto ===========================================

  //Objetos Sustraidos

  const datosCantidad = {
    cantAutomoviles: datosDenuncia.datosDenunciaPropiedad.cantAutomoviles,
    cantAutopartes: datosDenuncia.datosDenunciaPropiedad.cantAutopartes,
    cantBicicletas: datosDenuncia.datosDenunciaPropiedad.cantBicicletas,
    cantCheques: datosDenuncia.datosDenunciaPropiedad.cantCheques,
    cantDocumentacion: datosDenuncia.datosDenunciaPropiedad.cantDocumentacion,
    cantOtros: datosDenuncia.datosDenunciaPropiedad.cantOtros,
    cantTarjetas: datosDenuncia.datosDenunciaPropiedad.cantTarjetas,
    cantTelefonos: datosDenuncia.datosDenunciaPropiedad.cantTelefonos
  };
  const objetosSustraidos = Object.values(datosCantidad).filter(value => typeof value === 'number').every(value => value > 0);

  //Circunstancias

  const [circunstanciasTraidas] = useState([])

  useEffect(() => {
    circunstanciasActuales();
  }, [])
  const [selectedCircunstancias, setSelectedCircunstancias] = useState([]);

  const datosCircunstancias = [
    { label: 'Me dañaron cosas', code: 'danoCosas', valor: datosDenuncia.datosDenunciaPropiedad.datosGeneralesDenunciaPropiedad?.danoCosas },
    { label: 'Utilizaron armas', code: 'armas', valor: datosDenuncia.datosDenunciaPropiedad.datosGeneralesDenunciaPropiedad?.armas },
    { label: 'Hubo violencia física', code: 'violenciaFisica', valor: datosDenuncia.datosDenunciaPropiedad.datosGeneralesDenunciaPropiedad?.violenciaFisica },
    { label: 'Amenaza', code: 'amenaza', valor: datosDenuncia.datosDenunciaPropiedad.datosGeneralesDenunciaPropiedad?.amenaza },
    { label: 'Arrebato', code: 'arrebato', valor: datosDenuncia.datosDenunciaPropiedad.datosGeneralesDenunciaPropiedad?.arrebato },
    { label: 'Otra', code: 'otra', valor: datosDenuncia.datosDenunciaPropiedad.datosGeneralesDenunciaPropiedad?.otra },
  ];

  const circunstanciasActuales = () => {
    datosCircunstancias.forEach(circunstancia => {
      if (circunstancia.valor === 1) {
        circunstanciasTraidas.push(circunstancia)
      }
    });
    setSelectedCircunstancias(circunstanciasTraidas);
  };

  return (
    <>
      <h2>Datos del Hecho</h2>

      <h3>¿Qué Pasó?</h3>
      <p>{denuncia.descripcionQue}</p>
      <Button label='Modificar' size='small' className='btn-blue-mpa' />

      <Divider />

      <h3>¿Cómo Pasó?</h3>
      <p>{denuncia.descripcionComo}</p>
      <Button label='Modificar' size='small' className='btn-blue-mpa' />

      {/* En caso de llegar una denuncia de Robo/Hurto */}
      {tipoDenuncia === 3 && (
        <div className='grid'>
          <div className='col pt-4'>
            <h3>Objetos sustraidos</h3>
            <Dropdown
              value={objetosSustraidos ? 'Si' : 'No'}
              options={[
                { label: 'Si', value: 'Si' },
                { label: 'No', value: 'No' }
              ]}
            />
          </div>
          <div className='col pt-4'>
            <h3>Circunstancias del hecho</h3>
            <MultiSelect
              placeholder='Circunstancias del hecho'
              options={datosCircunstancias}
              onChange={(e) => { setSelectedCircunstancias(e.value) }}
              value={selectedCircunstancias}
            />
          </div>
        </div>
      )}

      <Divider />

      <h3>¿Dónde Pasó?</h3>
      <div className='grid'>
        <div className='col'>
          <h4>Ciudad del Hecho: {denuncia.nombreLocalidad}</h4>
          <h4>Barrio: {denuncia.nombreBarrio}</h4>
          <h4>Calle: {denuncia.calleHecho}</h4>
          <h4>Piso: {denuncia.pisoHecho}</h4>
          <h4>Departamento: {denuncia.departamentoHecho}</h4>
        </div>
        <div className='col'>
          {/* Reemplaza la imagen del mapa con el componente Embed de Google Maps */}
          {
            denuncia.latitudHecho && denuncia.longitudHecho ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB9XerbY6zq1u0LZYj-LYq47n3Pkkn2vXU
            &q=${denuncia.latitudHecho},${denuncia.longitudHecho}`}>
              </iframe>
            ) : (
              <h1>No se agregó ubicacion exacta. </h1>
            )
          }
        </div>
      </div>

      <Divider />

      <h3>Informacion Adicional</h3>
      <p>{denuncia.informacionAdicional}</p>

      <Divider />

      {/* Adjuntos de denuncia */}
      <AdjuntosDenuncia adjuntosDenuncia = {adjuntosDenuncia} detalleAdjunto = {denuncia.detalleAdjunto}/>

      <Divider />

      {/* En casos especiales */}
      {tipoDenuncia === 7 ? (
        <AnexoViolenciaDeGenero datosViolenciaDeGenero={datosDenuncia.datosViolenciaDeGenero} />
      ) : tipoDenuncia === 6 ? (
        <>
          <h3>Vehiculos involucrados:</h3>
          <VehiculosInvolucradosTable datosIncidentesViales={datosDenuncia.datosIncidentesViales} />
        </>
      ) : tipoDenuncia === 3 ? (
        <ObjetosSustraidosTable datosDenunciaPropiedad={datosDenuncia.datosDenunciaPropiedad} />
      ) : tipoDenuncia === 8 ? (
        <AnexoDelitosSexuales datosDelitoSexual={datosDenuncia.datosDelitoSexual}/>
      ) : (null)}

      <Divider />

      {/* Denuncia digital */}
      <section className='mb-8'>
        <h3>Denuncia Digital Firmada</h3>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'
          className='w-1 p-1'
        />
        <Button label='Generar y firmar' size='small' className='m-2 btn-blue-mpa' />
        <Button label='Subir archivo' size='small' className='m-2 btn-blue-mpa' />
      </section>

      <div className="flex justify-content-between flex-wrap">
        <Button label='Volver' className='btn-blue-mpa flex align-items-center justify-content-center h-3rem m-2' />
        <Button label='Convertir denuncia a legajo' className='btn-blue-mpa flex align-items-center justify-content-center h-3rem m-2' />
      </div>

    </>
  );
};