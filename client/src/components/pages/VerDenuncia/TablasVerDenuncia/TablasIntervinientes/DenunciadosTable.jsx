import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const DenunciadosTable = ({ denunciados }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [resetFilters, setResetFilters] = useState(false);

  const resetAllFilters = () => {
    // Restablecer filtros y borrar la búsqueda global
    setResetFilters(!resetFilters);
    setGlobalFilterValue('');
  };

  const accionesTemplate = (rowData) => {
    return (
      <Button
        type="button"
        icon="pi pi-trash"
        className="p-button-danger"
      />
    );
  };

  const HeaderTable = () => {
    return (
      <div className='flex justify-content-between md:flex-row flex-column'>
        <Button
          type='button'
          icon='pi pi-filter-slash'
          label='Limpiar filtro'
          outlined
          onClick={resetAllFilters}
          className='md:mb-0 mb-8 text-lightblue-mpa'
        />
        <div>
          <Tooltip target='.info-icon' />
          <i
            className='pi pi-info-circle mr-4 info-icon'
            data-pr-tooltip='Ingrese un término a buscar en toda la tabla'
            data-pr-position='top'
            style={{ fontSize: '1rem', cursor: 'pointer' }}
          />

          <span className='p-input-icon-left'>
            <i className='pi pi-search' />
            <InputText
              value={globalFilterValue}
              onChange={(e) => setGlobalFilterValue(e.target.value)}
              placeholder='Búsqueda global'
            />
          </span>
          <Button label='Buscar' className='btn-blue-mpa ml-2' />
        </div>
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog draggable={false} />

      <DataTable
        value={denunciados}
        paginator
        rows={5}
        totalRecords={denunciados.length} // Actualiza con el total de registros
        loading={false} // Cambia a `true` cuando se está cargando
        emptyMessage='No se encontraron víctimas/denunciantes'
        className='mb-4'
        header={HeaderTable()}
      >
        <Column field='tipoIdentificacion' header='Tipo de Identificación' />
        <Column field='numeroIdentificacion' header='Número' />
        <Column field='apellido' header='Apellido' />
        <Column field='nombre' header='Nombre' />
        <Column body={accionesTemplate} header='Acciones' />
      </DataTable>

      <Button className='btn-blue-mpa' label='Agregar Denunciado' />
    </>
  );
};
