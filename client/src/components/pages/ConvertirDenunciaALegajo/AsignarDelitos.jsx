/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { getDelitosThunk } from '@/store/dataSlice/data.thunks';

export const AsignarDelito = ({ denunciados, delitos }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDelitosThunk());
  }, [dispatch]);

  return (
    <Card className='shadow-1 px-7 py-3 mt-6'>
      <h2>Asignar delitos</h2>

      <div className='grid mt-6'>
        <div className='col-12 md:col-6'>
          <label htmlFor='delitos'>Delitos</label>
          <Dropdown
            id='delitos'
            options={delitos}
            optionLabel='nombre'
            optionValue='idDelito'
            placeholder='Seleccione'
            filter
            className='w-full mt-2'
          />
        </div>

        <div className='col-12 md:col-6'>
          <label htmlFor='denunciados'>Denunciados</label>
          <Dropdown
            id='denunciados'
            options={denunciados}
            optionLabel='nombreCompleto'
            optionValue='id'
            placeholder='Seleccione'
            className='w-full mt-2'
          />
        </div>

        <div className='col-12 sm:col-6 md:col-4 lg:col-2 mb-4'>
          <Button
            icon='pi pi-plus'
            label='Agregar'
            className='btn-blue-mpa w-full'
          />
        </div>
      </div>

      <DataTable
        value={[]}
        paginator
        rows={5}
        totalRecords={[].length}
        lazy
        dataKey='idDelito'
        emptyMessage='No se encontraron delitos'
        className='mb-4 shadow-1 mt-4'
        // header={HeaderTable()}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field='delito' header='Delito' />
        <Column field='denunciado' header='Denunciado' />
      </DataTable>
    </Card>
  );
};
