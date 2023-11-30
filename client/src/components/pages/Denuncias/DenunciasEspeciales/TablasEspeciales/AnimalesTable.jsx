import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'

export const AnimalesTable = ({ animales, eliminarAnimal }) => {
  const columns = [
    { field: 'idDenunciaAbigeatoDetallesEspecies', header: 'Especie' },
    { field: 'cantidad', header: 'Cantidad' },
    { field: 'detalle', header: 'Detalles' },
    { field: 'acciones', header: 'Acciones' }
  ]

  const accionesTemplate = (rowData) => {
    return (
      <div>
        {rowData.acciones}
        <Button
          type="button"
          icon="pi pi-trash"
          onClick={() => eliminarAnimal(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  const especiesTemplate = (rowData) => {
    return (
      <div>
        {rowData.idDenunciaAbigeatoDetallesEspecies.label}
      </div>
    );
  };

  return (
    <>
      <DataTable value={animales} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
        {
          (columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={
                col.field === 'acciones' ? accionesTemplate :
                col.field === 'idDenunciaAbigeatoDetallesEspecies' ? especiesTemplate :
                null
              }
            />
          )))
        }
      </DataTable>
    </>
  )
}
