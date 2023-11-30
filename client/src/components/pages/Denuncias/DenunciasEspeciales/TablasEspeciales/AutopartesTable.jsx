import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export const AutopartesTable = ({ autopartes, eliminarAutoparte }) => {
  const columns = [
    { field: 'tipo', header: 'Tipo de Objeto' },
    { field: 'marca', header: 'Marca' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'dominio', header: 'Dominio' },
    { field: 'sustraido', header: 'Fue Sustraído' },
    { field: 'danada', header: 'Fue Dañada' },
    { field: 'observaciones', header: 'Observaciones' },
    { field: 'acciones', header: 'Acciones' }
  ];

  const accionesTemplate = (rowData) => {
    return (
      <div>
        {rowData.acciones}
        <Button
          type="button"
          icon="pi pi-trash"
          onClick={() => eliminarAutoparte(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  return (
    <DataTable value={autopartes} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={col.field === 'acciones' ? accionesTemplate : null}
        />
      ))}
    </DataTable>
  );
};
