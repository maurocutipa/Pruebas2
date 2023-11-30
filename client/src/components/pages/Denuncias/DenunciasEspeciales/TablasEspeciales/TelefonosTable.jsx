import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { getCelularesMarcas } from '../../../../../api/objetosPropiedad.api';


export const TelefonosTable = ({ telefonos, eliminarTelefono }) => {
  const [marcas, setMarcas] = useState([]);

  const getMarcas = async () => {
    const data = await getCelularesMarcas();
    setMarcas(data.data.data);
  }

  useEffect(() => {
    getMarcas();
  }, []);

  const columns = [
    { field: 'imei', header: 'Imei' },
    { field: 'idDenunciaCelularesMarca', header: 'Marca' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'empresa', header: 'Empresa' },
    { field: 'numero', header: 'Numero' },
    { field: 'otro', header: 'Otro' },
    { field: 'acciones', header: 'Acciones' }
  ];

  const accionesTemplate = (rowData) => {
    return (
      <div>
        {rowData.acciones}
        <Button
          type="button"
          icon="pi pi-trash"
          onClick={() => eliminarTelefono(rowData)}
          className="p-button-danger"
        />
      </div>
    );
  };

  const marcasTemplate = (rowData) => {
    let marcaString;
    try{
      marcaString = Array.from(marcas).find(a => a.value === rowData.idDenunciaCelularesMarca).name
    }catch(error){
      //console.error('Error al buscar las marcas', error);
    }
    return (
      <div>
        {marcaString}
      </div>
    );
  };

  return (
    <>
      <Button label='Chota' onClick={e=> console.log(marcas)}></Button>
      <DataTable value={telefonos} tableStyle={{ minWidth: '50rem' }} className='shadow-3'>
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} body={col.field === 'acciones' ? accionesTemplate : col.field === 'idDenunciaCelularesMarca'? marcasTemplate:null}
          // marcas.find(e => e.value ==col.field).name
          />
        ))}
      </DataTable>
    </>
  )
}
