import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export const TarjetasTable = ({ tarjetas, eliminarTarjeta }) => {
  const columns = [
    { field: 'tipo', header: 'Tipo de Tarjeta' },
    { field: 'banco', header: 'Banco Emisor' },
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
          onClick={() => eliminarTarjeta(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  return (
    <DataTable value={tarjetas} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
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
