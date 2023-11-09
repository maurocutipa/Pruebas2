/* eslint-disable react/prop-types */
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export const DatosGenerales = ({ denuncia }) => {
  const opcionesFlagrancia = [
    { label: 'Si', value: 'Si' },
    { label: 'No', value: 'No' },
  ];
  const [selectedFlagrancia, setSelectedFlagrancia] = useState(null);

  return (
    <>
      <section className='pl-4'>
        <h2>Datos Generales</h2>
        <h4>N° legajo: </h4>
        <div className='grid'>
          <h4 className='col'>Seccional: {denuncia.seccional}</h4>
          <h4 className='col'>Exp.Seccional: </h4>
          <h4 className='col'></h4>
        </div>
        <div className='grid'>
          <h4 className='col'>
            Fecha de Realizacion de la Denuncia: {denuncia.fechaDenuncia}
          </h4>
          <h4 className='col'>Hora: {denuncia.horaDenuncia}</h4>
          <h4 className='col'></h4>
        </div>
        <div className='grid'>
          <h4 className='col'>Fecha de Ratificacion de la Denuncia: </h4>
          <h4 className='col'>Hora: </h4>
          <h4 className='col'></h4>
        </div>
        <label htmlFor='competenciaDenuncia'>Flagrancia</label>
        <Dropdown
          id='flagrancia'
          optionLabel='label'
          optionValue='value'
          value={selectedFlagrancia}
          options={opcionesFlagrancia}
          onChange={(e) => setSelectedFlagrancia(e.value)}
          placeholder='SI / NO'
        />
      </section>
    </>
  );
};
