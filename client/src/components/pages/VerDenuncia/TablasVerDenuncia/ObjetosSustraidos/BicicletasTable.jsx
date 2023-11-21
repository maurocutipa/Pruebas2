import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const BicicletasTable = ({ bicicletas }) => {
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
        value={bicicletas}
        paginator
        rows={5}
        totalRecords={bicicletas.length}
        loading={false}
        emptyMessage='No se encontraron bicicletas involucradas'
        className='mb-4 shadow-3'
      >
        <Column field='id_denuncia_bicicletas_tipo' header='Tipo' />
        <Column field='marca' header='Marca' />
        <Column field='rodado' header='Rodado' />
        <Column field='num_serie' header='Número de Serie' />
        <Column field='color_cuadro' header='Color de Cuadro' />
        <Column field='observaciones' header='Observaciones' />
        <Column body={accionesTemplate} header='Acciones' />
      </DataTable>

      <Button className="btn-blue-mpa" label='Agregar Bicicleta Involucrada' />
    </>
  );
}
