import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';

export const ChequesTable = ({ cheques, eliminarCheque }) => {
  const columns = [
    { field: 'tipo', header: 'Tipo de Cheque' },
    { field: 'banco', header: 'Banco Emisor' },
    { field: 'sucursal', header: 'Sucursal' },
    { field: 'titularCuenta', header: 'Titular de Cuenta' },
    { field: 'numeroCuenta', header: 'Número de Cuenta' },
    { field: 'numeroCheque', header: 'Número de Cheque' },
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
          onClick={() => eliminarCheque(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  return (
    <DataTable value={cheques} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
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
