import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable"
import { useEffect } from "react";

export const AnimalesDetalles = ({ animales }) => {
    const especies = [
        { id: 1, name: 'Asnal'},
        { id: 2, name: 'Aves'},
        { id: 3, name: 'Bovinos'},
        { id: 4, name: 'Caprinos'},
        { id: 5, name: 'Conejos'},
        { id: 6, name: 'Equinos'},
        { id: 7, name: 'Mular'},
        { id: 8, name: 'Ovinos'},
        { id: 9, name: 'Porcinos'},
        { id: 10, name: 'Otras Especies'}
    ]
    const accionesTemplate = (rowData) => {
        return (
            <Button
                type="button"
                icon="pi pi-trash"
                className="p-button-danger"
            />
        );
    };

    const tipoTemplate = (rowData) => {
        console.log(rowData)
        return (
          <div>
            {
                Array.from(especies).find(a => a.id === rowData.idDenunciaAbigeatoDetallesEspecies).name
            }
          </div>
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
                <Column field="idDenunciaAbigeatoDetallesEspecies" header='Especie' body={tipoTemplate} />
                <Column field="cantidad" header='Cantidad'/>
                <Column field="detalle" header='Detalle'/>
                <Column body={accionesTemplate} header='Acciones' />
            </DataTable>
        </>
    )
}
