import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable"

export const AnimalesDetalles = ({ animales }) => {
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
            <DataTable
                value={animales}
                paginator
                rows={5}
                totalRecords={animales.length} // Actualiza con el total de registros
                loading={false} // Cambia a `true` cuando se está cargando
                emptyMessage='No se encontraron animales involucrados'
                className='mb-4 shadow-3'
            >
                {/* <Column field='id_denuncia_automoviles_tipo' header='Tipo' />
                <Column field='anio_fabricacion' header='Año' />
                <Column field='id_denuncia_automoviles_tipo' header='Marca' />
                <Column field='modelo' header='Modelo' />
                <Column field='dominio' header='Dominio' />
                <Column body={accionesTemplate} header='Acciones' /> */}
            </DataTable>
        </>
    )
}
