import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';

import { DatosGenerales } from '../../components/pages/VerDenuncia/DatosGenerales';
import { TablasDenuncia } from '../../components/pages/VerDenuncia/TablasDenuncia';
import { DatosDelHecho } from '../../components/pages/VerDenuncia/DatosDelHecho';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDenunciaByIdThunk } from '@/store/denunciasSlice/denuncias.thunks';
import { ProgressSpinner } from 'primereact/progressspinner';

export const VerDenuncia = () => {
  const dispatch = useAppDispatch();
  const { currentDenuncia } = useAppSelector((state) => state.denuncias);
  const { data } = useAppSelector((state) => state.data);

  console.log(currentDenuncia);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDenunciaByIdThunk(id));
  }, [dispatch, id]);

  return (
    <>
      {currentDenuncia ? (
        <div className='p-6'>
          <section className='grid'>
            <h1 className='col pl-4'>Denuncia N° {id}</h1>

            <div className='col pt-4'>
              <label htmlFor='tiposDenuncia' className='p-2'>
                Tipo de Denuncia:
              </label>
              <Dropdown placeholder='Seleccione el tipo de denuncia'
                options={data.tiposDenuncia}
                optionLabel='tipoDenuncia'
                optionValue='idTipoDenuncia'
                value={currentDenuncia.denuncia.tipoDenuncia} 
                />
            </div>
            <div className='col pt-4'>
              <label htmlFor='competenciaDenuncia' className='p-2 ml-8'>
                Competencia
              </label>
              <Dropdown placeholder='Seleccione competencia'
                options={data.competencias} 
                optionLabel='competencia'
                optionValue='idCompetencia'
                value={currentDenuncia.competencia}
                />
            </div>
          </section>

          {/* Seccion de Datos Generales de la denuncia */}

          <section>
            <DatosGenerales denuncia={currentDenuncia.denuncia} />
          </section>

          <Divider />

          {/* Seccion de Tablas */}

          <section>
            <TablasDenuncia intervinientes={currentDenuncia.intervinientes} />
          </section>

          <Divider />

          {/* Seccion de Datos del hecho */}

          <section className='pl-4'>
            <DatosDelHecho denuncia={currentDenuncia.denuncia} adjuntos={currentDenuncia.adjuntos} />
          </section>
        </div>
      ) : (
        <div className='text-center'>
          <ProgressSpinner />
        </div>
      )}
    </>
  );
};
