/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { AccionesResumenHechos } from './AccionesResumenHechos';
import { ConfirmDialog } from 'primereact/confirmdialog';

const resumenes = [
  { idResumen: 1, denunciado: 'JOSE', descripcion: 'lalalala' },
];

export const ResumenHechos = ({ denunciados, delegacionesFiscales }) => {
  return (
    <Card className='shadow-1 px-7 mt-6'>
      <div className=''>
        <h2>Asignar fiscalía al legajo</h2>

        <div className='grid mt-6'>
          <div className='col-12 lg:col-5'>
            <label htmlFor='fiscalia'>Seleccione una fiscalía</label>
            <Dropdown
              id='fiscalia'
              options={delegacionesFiscales}
              optionLabel='delegacionFiscal'
              optionValue='idDelegacionFiscal'
              placeholder='Seleccione'
              className='w-full mt-2'
            />
          </div>
        </div>
      </div>

      <Divider className='my-7' />

      <div className=''>
        <h2>Resumen de los hechos</h2>

        <div className='grid mt-6'>
          <div className='col-12 lg:col-5'>
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
        </div>

        <div className='grid mt-4'>
          <div className='col-12'>
            <label htmlFor='descripcion'>Descripción</label>
            <InputTextarea
              id='descripcion'
              className='w-full mt-2'
              rows={8}
              autoResize='none'
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

        <ConfirmDialog draggable={false} />
        <DataTable
          value={resumenes}
          paginator
          rows={5}
          totalRecords={resumenes.length}
          lazy
          dataKey='idResumen'
          emptyMessage='No se encontraron denunciados'
          className='mb-4 shadow-1 mt-4'
          // header={HeaderTable()}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field='denunciado' header='Denunciados' />
          <Column field='descripcion' header='Descripción' />

          <Column
            field='Acciones'
            header='Acciones'
            body={(resumen) => <AccionesResumenHechos id={resumen.idResumen} />}
          />
        </DataTable>
      </div>
    </Card>
  );
};
