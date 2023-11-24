import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const OtrosTable = ({ otros }) => {
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
                value={otros}
                paginator
                rows={5}
                totalRecords={otros.length}
                loading={false}
                emptyMessage='No se encontraron elementos involucrados'
                className='mb-4 shadow-3'
            >
                <Column field='tipo' header='Tipo' />
                <Column field='observaciones' header='Observaciones' />
                <Column body={accionesTemplate} header='Acciones' />
            </DataTable>

            <Button className="btn-blue-mpa" label='Agregar Elemento Involucrado' />
        </>
    );
}
