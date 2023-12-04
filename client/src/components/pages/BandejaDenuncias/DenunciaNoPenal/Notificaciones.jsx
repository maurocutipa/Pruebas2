import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export const Notificaciones = () => {
  return (
    <section id='notificaciones'>
      <h2>Notificaciones</h2>

      <div className='mt-5'>
        <div className='grid'>
          <div className='col-12 xl:col-3'>
            <label htmlFor='tipoNotificacion'>Tipo Notificación</label>
            <Dropdown
              id='tipoNotificacion'
              name='tipoNotificacion'
              options={[]}
              placeholder='Seleccione'
              className={`w-full mt-2 `}
            />
          </div>

          <div className='col-12 xl:col-3'>
            <label htmlFor='persona'>Persona</label>
            <Dropdown
              id='persona'
              name='persona'
              options={[]}
              placeholder='Seleccione'
              className={`w-full mt-2 `}
            />
          </div>

          <div className='col-12 xl:col-3'>
            <label htmlFor='nombreApellido'>Nombre y Apellido</label>
            <InputText
              id='nombreApellido'
              name='nombreApellido'
              placeholder='Ingrese'
              className={`w-full mt-2 `}
            />
          </div>

          <div className='col-12 xl:col-3'>
            <label htmlFor='email'>Email</label>
            <InputText
              type='email'
              id='email'
              name='email'
              placeholder='Ingrese'
              className={`w-full mt-2 `}
            />
          </div>

          <div className='col-12 xl:col-2 mt-4'>
            <Button
              icon='pi pi-plus'
              label='Agregar'
              className='btn-blue-mpa w-full'
            />
          </div>
        </div>

        <div className='mt-6'>
          <DataTable
            value={[]}
            paginator
            rows={5}
            totalRecords={[].length}
            lazy
            emptyMessage='No se encontraron resultados'
            className='mb-4 shadow-1 mt-4'
            tableStyle={{ minWidth: '50rem' }}
            dataKey='id'
          >
            <Column field='tipo' header='Tipo' body='tipo' />
            <Column field='nombre' header='Nombre' body='asd' />
            <Column field='mail' header='Mail' body='as' />
            <Column
              field='acciones'
              header='Eliminar'
              body='as'
              pt={{ headerCell: { className: 'w-2' } }}
            />
          </DataTable>
        </div>
      </div>
    </section>
  );
};
