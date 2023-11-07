import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialog } from 'primereact/confirmdialog';

export const DenunciadosTable = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [resetFilters, setResetFilters] = useState(false);

  const [denunciadosData, setDenunciadosData] = useState([]); 

  const resetAllFilters = () => {
    // Restablecer filtros y borrar la búsqueda global
    setResetFilters(!resetFilters);
    setGlobalFilterValue('');
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
        value={denunciadosData}
        paginator
        rows={5}
        totalRecords={denunciadosData.length} // Actualiza con el total de registros
        loading={false} // Cambia a `true` cuando se está cargando
        emptyMessage='No se encontraron víctimas/denunciantes'
        className='mb-8 shadow-3'
        header={HeaderTable()}
      >
        <Column field='tipoIdentificacion' header='Tipo de Identificación' />
        <Column field='numero' header='Número' />
        <Column field='apellido' header='Apellido' />
        <Column field='nombre' header='Nombre' />
        <Column field='acciones' header='Acciones' />
      </DataTable>
    </>
  );
};
