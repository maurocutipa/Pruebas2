import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const TelefonosTable = ({ telefonos }) => {
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
                value={telefonos}
                paginator
                rows={5}
                totalRecords={telefonos.length} // Actualiza con el total de registros
                loading={false} // Cambia a `true` cuando se está cargando
                emptyMessage='No se encontraron telefonos'
                className='mb-4 shadow-3'
            >
                <Column field='imei' header='IMEI' />
                <Column field='id_denuncia_celulares_marca' header='Marca' />
                <Column field='modelo' header='Modelo' />
                <Column field='empresa' header='Empresa' />
                <Column field='numero' header='Número' />
                <Column field='otro' header='Otro' />
                <Column body={accionesTemplate} header='Acciones' />
            </DataTable>

            <Button className="btn-blue-mpa" label='Agregar teléfono Involucrado' />
        </>
    );
}
