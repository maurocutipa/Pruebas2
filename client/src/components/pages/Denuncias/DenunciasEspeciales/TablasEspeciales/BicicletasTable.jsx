import { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { getBicicletasTipos } from '../../../../../api/objetosPropiedad.api';
import { useBicicletasContext} from '../RoboHurto'
export const BicicletasTable = ({ bicicletas, eliminarBicicleta }) => {
  const { tiposBicicleta } = useBicicletasContext();

  const columns = [
    { field: 'idDenunciaBicicletasTipo', header: 'Tipo Bicicleta' },
    { field: 'marca', header: 'Marca' },
    { field: 'rodado', header: 'Talle del Rodado' },
    { field: 'numSerie', header: 'Número de Serie' },
    { field: 'colorCuadro', header: 'Color del Cuadro' },
    { field: 'seguro', header: 'Tiene Seguro' },
    { field: 'observaciones', header: 'Observaciones' },
    { field: 'acciones', header: 'Acciones' }
  ];

  const accionesTemplate = (rowData) => {
    return (
      <div>
        {rowData.acciones}
        <Button
          type="button"
          icon="pi pi-trash"
          onClick={() => eliminarBicicleta(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  const tipoTemplate = (rowData) => {
    return (
      <div>
        {Array.from(tiposBicicleta).find(a => a.value === rowData.idDenunciaBicicletasTipo).name}
      </div>
    );
  };

  const marcasTemplate = (rowData) => {
    return (
      <div>
        {Array.from(marcas).find(a => a.value === rowData.marca).name}
      </div>
    );
  };

  return (
    <DataTable value={bicicletas} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={col.field === 'acciones' ? accionesTemplate : col.field === 'idDenunciaBicicletasTipo'? tipoTemplate : null}
        />
      ))}
    </DataTable>
  );
};
