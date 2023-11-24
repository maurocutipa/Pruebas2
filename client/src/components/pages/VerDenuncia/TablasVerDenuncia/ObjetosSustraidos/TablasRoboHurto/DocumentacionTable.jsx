import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const DocumentacionTable = ({ documentacion }) => {
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
                value={documentacion}
                paginator
                rows={5}
                totalRecords={documentacion.length}
                loading={false}
                emptyMessage='No se encontraron documentos involucrados'
                className='mb-4 shadow-3'
            >
                <Column field='tipo' header='Tipo' />
                <Column field='numero' header='Número' />
                <Column field='observaciones' header='Observaciones' />
                <Column body={accionesTemplate} header='Acciones' />
            </DataTable>

            <Button className="btn-blue-mpa" label='Agregar Documentacion' />
        </>
    );
}
