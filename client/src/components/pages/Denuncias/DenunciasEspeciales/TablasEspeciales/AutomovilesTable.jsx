import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { getAutomovilesTipos, getAutomovilesMarcas } from '../../../../../api/objetosPropiedad.api';

export const AutomovilesTable = ({ automoviles, eliminarAutomovil, tipoDenuncia }) => {
  const [tipos, setTipos] = useState([])
  const [marcas, setMarcas] = useState([])
  useEffect(() => {
    getTiposMarcas();
    console.log(marcas)
  }, [])

  const getTiposMarcas = async () => {
    const data = await getAutomovilesTipos();
    setTipos(data.data.data);
    const data2 = await getAutomovilesMarcas();
    setMarcas(data2.data.data);
  }

  const columns = [
    { field: 'idDenunciaAutomovilesTipo', header: 'Tipo Automóvil' },
    { field: 'idDenunciaAutomovilesMarca', header: 'Marca' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'dominio', header: 'Dominio' },
    { field: 'anioFabricacion', header: 'Año de Fabricación' },
    { field: 'numMotor', header: 'Número de Motor' },
    { field: 'numChasis', header: 'Número de Chasis' },
    { field: 'puertas', header: 'Número de Puertas' },
    { field: 'titular', header: 'Titular' },
    { field: 'color', header: 'Color' },
    {
      field: 'gnc',
      header: 'Equipo de GNC',
      body: (rowData) => (rowData.gnc ? 'Sí' : 'No'),
    },
    { field: 'observaciones', header: 'Observaciones' },
    { field: 'acciones', header: 'Acciones' },
  ];

  const columnsIncidenteVial = [
    { field: 'idDenunciaAutomovilesTipo', header: 'Tipo Automóvil' },
    { field: 'idDenunciaAutomovilesMarca', header: 'Marca' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'dominio', header: 'Dominio' },
    { field: 'anioFabricacion', header: 'Año de Fabricación' },
    { field: 'numMotor', header: 'Número de Motor' },
    { field: 'numChasis', header: 'Número de Chasis' },
    { field: 'puertas', header: 'Número de Puertas' },
    { field: 'titular', header: 'Titular' },
    { field: 'color', header: 'Color' },
    {
      field: 'gnc',
      header: 'Equipo de GNC',
      body: (rowData) => (rowData.gnc ? 'Sí' : 'No'),
    },
    { field: 'empresaSeguro', header: 'Empresa Aseguradora' },
    { field: 'numeroSeguro', header: 'Numero de Seguro' },
    { field: 'observaciones', header: 'Observaciones' },
    { field: 'acciones', header: 'Acciones' },
  ];

  const accionesTemplate = (rowData) => {
    return (
      <div>
        {rowData.acciones}
        <Button
          type="button"
          icon="pi pi-trash"
          onClick={() => eliminarAutomovil(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  const tipoTemplate = (rowData) => {
    return (
      <div>
        {Array.from(tipos).find(a => a.value === rowData.idDenunciaAutomovilesTipo).name}
      </div>
    );
  };

  const marcasTemplate = (rowData) => {
    return (
      <div>
        {Array.from(marcas).find(a => a.value === rowData.idDenunciaAutomovilesMarca).name}
      </div>
    );
  };

  return (
    <>
      <DataTable value={automoviles} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
        {
          tipoDenuncia != 4 ?
            (columns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                body={col.field === 'acciones' ? accionesTemplate : null}
              />
            )))
            :
            (columnsIncidenteVial.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                body={col.field === 'acciones' ? accionesTemplate : null}
              />
            )))
        }
      </DataTable>
    </>
  );
};
