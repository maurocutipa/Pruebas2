import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const AutomovilesTable = ({ automoviles }) => {
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
                value={automoviles}
                paginator
                rows={5}
                totalRecords={automoviles.length} // Actualiza con el total de registros
                loading={false} // Cambia a `true` cuando se está cargando
                emptyMessage='No se encontraron vehículos involucrados'
                className='mb-4 shadow-3'
            >
                <Column field='id_denuncia_automoviles_tipo' header='Tipo' />
                <Column field='anio_fabricacion' header='Año' />
                <Column field='id_denuncia_automoviles_tipo' header='Marca' />
                <Column field='modelo' header='Modelo' />
                <Column field='dominio' header='Dominio' />
                <Column body={accionesTemplate} header='Acciones' />
            </DataTable>

            <Button className="btn-blue-mpa" label='Agregar Vehículo Involucrado' />
        </>
    )
}
