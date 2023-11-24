import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const ChequesTable = ({ cheques }) => {
  const accionesTemplate = (rowData) => {
    return (
      <Button
        type="button"
        icon="pi pi-trash"
        className="p-button-danger"
      />
    );
  };
  
  return (
    <>
      <ConfirmDialog draggable={false} />

      <DataTable
        value={cheques}
        paginator
        rows={5}
        totalRecords={cheques.length}
        loading={false}
        emptyMessage='No se encontraron cheques involucrados'
        className='mb-4 shadow-3'
      >
        <Column field='tipo' header='Tipo' />
        <Column field='banco' header='Banco' />
        <Column field='sucursal' header='Sucursal' />
        <Column field='titular_cuenta' header='Titular de Cuenta' />
        <Column field='numero_cuenta' header='Número de Cuenta' />
        <Column field='numero_cheque' header='Número de Cheque' />
        <Column field='observaciones' header='Observaciones' />
        <Column body={accionesTemplate} header='Acciones' />
      </DataTable>

      <Button className="btn-blue-mpa" label='Agregar Cheque Involucrado' />
    </>
  );
}
