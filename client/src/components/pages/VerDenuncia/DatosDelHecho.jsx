/* eslint-disable react/prop-types */
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { VehiculosInvolucradosTable } from './TablasVerDenuncia/VehiculosInvolucradosTable';
import { ObjetosSustraidosTable } from './TablasVerDenuncia/ObjetosSustraidosTable';

export const DatosDelHecho = ({ tipo, denuncia }) => {
  const tipoDenuncia = tipo;
  return (
    <>
      <h2>Datos del Hecho</h2>

      <h3>¿Qué Pasó?</h3>
      <p>{denuncia.descripcionQue}</p>
      <Button label='Modificar' size='small' />

      <Divider />

      <h3>¿Cómo Pasó?</h3>
      <p>{denuncia.descripcionComo}</p>
      <Button label='Modificar' size='small' />

      {/* En caso de llegar una denuncia de Robo/Hurto */}
      {tipoDenuncia === 'robo/hurto' && (
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
          <img
            src='https://www.nuevojujuy.com.ar/images/03-Mar2022/Google-Maps-Sitios-Memoria-Jujuy-02.jpg'
            className='w-10 h-18rem'
            alt=''
          />
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
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'
        className='w-1 p-1'
      />
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTliJEbXiRic3bf7HoMVdEPR9fvMLjyDWWg&usqp=CAU'
        className='p-1'
      />

      <Divider />

      {/* En caso de Violencia de Genero */}
      {tipoDenuncia === 'violenciaDeGenero' ? (
        <h3>Anexo de Violencia de Genero</h3>
      ) : tipoDenuncia === 'siniestrosViales' ? (
        <VehiculosInvolucradosTable />
      ) : tipoDenuncia === 'robo/hurto' ? (
        <ObjetosSustraidosTable />
      ) : null}

      <Divider />

      <h3>Denuncia Digital Firmada</h3>
    </>
  );
};