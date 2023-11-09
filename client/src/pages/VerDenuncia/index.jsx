import { useEffect } from 'react';
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
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentDenuncia } = useAppSelector((state) => state.denuncias);
  console.log(currentDenuncia);

  const tipo = 'robo/hurto'; //tipo de prueba

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
              <Dropdown placeholder='Seleccione el tipo de denuncia' />
            </div>

            <div className='col pt-4'>
              <label htmlFor='competenciaDenuncia' className='p-2 ml-8'>
                Competencia
              </label>
              <Dropdown placeholder='Seleccione competencia' />
            </div>
          </section>

          {/* Seccion de Datos Generales de la denuncia */}

          <section>
            <DatosGenerales denuncia={currentDenuncia} />
          </section>

          <Divider />

          {/* Seccion de Tablas */}

          <section>
            <TablasDenuncia />
          </section>

          <Divider />

          {/* Seccion de Datos del hecho */}

          <section className='pl-4'>
            <DatosDelHecho tipo={tipo} denuncia={currentDenuncia} />
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
