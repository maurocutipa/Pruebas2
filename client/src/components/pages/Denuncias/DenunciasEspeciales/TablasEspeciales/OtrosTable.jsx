import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export const OtrosTable = ({ otros, eliminarOtro }) => {
  const columns = [
    { field: 'tipo', header: 'Tipo de Objeto' },
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
          onClick={() => eliminarOtro(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  return (
    <DataTable value={otros} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
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
