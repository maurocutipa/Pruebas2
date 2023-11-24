import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const TarjetasTable = ({ tarjetas }) => {
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
                value={tarjetas}
                paginator
                rows={5}
                totalRecords={tarjetas.length}
                loading={false}
                emptyMessage='No se encontraron tarjetas involucrados'
                className='mb-4 shadow-3'
            >
                <Column field='tipo' header='Tipo' />
                <Column field='banco' header='Banco' />
                <Column field='numero' header='Número' />
                <Column field='observaciones' header='Observaciones' />
                <Column body={accionesTemplate} header='Acciones' />
            </DataTable>

            <Button className="btn-blue-mpa" label='Agregar Tarjeta Involucrada' />
        </>
    );
}
