import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const AutopartesTable = ({ autopartes }) => {

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
        value={autopartes}
        paginator
        rows={5}
        totalRecords={autopartes.length} // Actualiza con el total de registros
        loading={false} // Cambia a `true` cuando se está cargando
        emptyMessage='No se encontraron autopartes involucradas'
        className='mb-4 shadow-3'
      >
        <Column field='tipo' header='Tipo' />
        <Column field='marca' header='Marca' />
        <Column field='modelo' header='Modelo' />
        <Column field='dominio' header='Dominio' />
        <Column field='sustraida' header='Sustraida' />
        <Column field='danada' header='Dañada' />
        <Column field='observaciones' header='Observaciones' />
        <Column body={accionesTemplate} header='Acciones' />
      </DataTable>

      <Button className="btn-blue-mpa" label='Agregar Autoparte Involucrada' />
    </>
  );
}
