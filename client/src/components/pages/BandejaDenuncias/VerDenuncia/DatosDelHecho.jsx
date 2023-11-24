/* eslint-disable react/prop-types */
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { TabView, TabPanel } from 'primereact/tabview';
import { VehiculosInvolucradosTable } from './TablasVerDenuncia/ObjetosSustraidos/VehiculosInvolucradosTable';
import { ObjetosSustraidosTable } from './TablasVerDenuncia/ObjetosSustraidos/ObjetosSustraidosTable';
import { Dialog } from 'primereact/dialog';
import { PdfViewer } from '@/components/common/PdfViewer';
import { GET_ADJUNTOS } from '@/constants';
import { useState } from 'react';

export const DatosDelHecho = ({ datosDenuncia }) => {
  console.log(datosDenuncia);
  const denuncia = datosDenuncia.denuncia;
  const tipoDenuncia = datosDenuncia.denuncia.tipoDenuncia;
  const adjuntosDenuncia = datosDenuncia.adjuntos;

  const [visible, setVisible] = useState(false);

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
            <Dropdown placeholder='Objetos Sustraidos' />
          </div>
          <div className='col pt-4'>
            <MultiSelect placeholder='Circunstancias del hecho' />
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

      <h3>Adjuntos / Evidencias</h3>
      <h4>Descripción: </h4>
      <p>{denuncia.detalleAdjunto}</p>
      <h4>Adjuntos: </h4>
      <ul>
        <Button label="Ver Documentos" icon="pi pi-file" onClick={() => setVisible(true)} className='btn-blue-mpa' />
        <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <TabView>
            <TabPanel header="Documentos">
              {Object.values(adjuntosDenuncia).map((elemento, indice) => {
                <PdfViewer key={indice} url={`${GET_ADJUNTOS}/${elemento.nombreArchivo}`} />
              })}
            </TabPanel>
            <TabPanel header="Multimedia">
              {Object.values(adjuntosDenuncia).map((elemento, indice) => {
                const extension = elemento.nombreArchivo.split('.').pop().toLowerCase();
                if (['mp4', 'mov', 'avi', 'jpg', 'png', 'jepg'].includes(extension)) {
                  return (
                    <div key={indice}>
                      <iframe src={`${GET_ADJUNTOS}/${elemento.nombreArchivo}`} frameBorder="0"></iframe>
                      <p>Archivo Multimedia: {elemento.nombreArchivo}</p>
                    </div>
                  );
                }
                return null;
              })}
            </TabPanel>
            <TabPanel header="Otros">

            </TabPanel>
          </TabView>
        </Dialog>
      </ul>

      <Divider />

      {/* En caso de Violencia de Genero */}
      {tipoDenuncia === 7 ? (
        <h3>Anexo de Violencia de Genero</h3>
      ) : tipoDenuncia === 6 ? (
        <>
          <h3>Vehiculos involucrados:</h3>
          <VehiculosInvolucradosTable datosIncidentesViales={datosDenuncia.datosIncidentesViales} />
        </>
      ) : tipoDenuncia === 3 ? (
        <ObjetosSustraidosTable datosDenunciaPropiedad={datosDenuncia.datosDenunciaPropiedad} />
      ) : null}

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
