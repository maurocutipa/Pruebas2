import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export const DocumentacionTable = ({ documentos, eliminarDocumento }) => {
  const columns = [
    { field: 'tipo', header: 'Tipo de Documentación' },
    { field: 'numero', header: 'Número' },
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
          onClick={() => eliminarDocumento(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  return (
    <DataTable value={documentos} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
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
