import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { FiltrosDenuncias } from './FiltrosDenuncias.jsx';
import { AccionesTabla } from './AccionesTabla.jsx';
import { RealizarPaseDenuncia } from './RealizarPaseDenuncia.jsx';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.js';
import { getDenunciasThunk } from '@/store/denunciasSlice/denuncias.thunks.js';

const filtersInitialState = {
  Global: false,
  GlobalValue: '',
  Nro: '',
  Realizacion: '',
  Seccional: '',
  FechaDenunciaDesde: null,
  FechaDenunciaHasta: null,
  TipoDenuncia: '',
  Competencia: '',
  Ratificada: '',
  FiscaliaAsignada: '',
  NumLegajoAsignado: '',
  Acciones: '',
};

export const DenunciasTable = () => {
  const dispatch = useAppDispatch();
  const { denuncias, totalRecords, loading } = useAppSelector(
    (state) => state.denuncias
  );

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [resetFilters, setResetFilters] = useState(false);
  const [visible, setVisible] = useState(false);

  const [filters, setFilters] = useState(filtersInitialState);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 1,
  });

  useEffect(() => {
    dispatch(getDenunciasThunk(lazyState));
  }, [dispatch, lazyState]);

  const onFilterChange = (field, value) => {
    if (field === 'FechaDenunciaDesde' || field === 'FechaDenunciaHasta') {
      const dateValue = value ? new Date(value) : null;
      setFilters({ ...filters, [field]: dateValue });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const resetAllFilters = () => {
    setFilters(filtersInitialState);

    setResetFilters(!resetFilters);
    setGlobalFilterValue('');
  };

  const HeaderTable = () => {
    return (
      <div className='flex justify-content-between md:flex-row flex-column'>
        <Button
          type='button'
          icon='pi pi-filter-slash'
          label='Limpiar filtros'
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
          <Button label='Buscar' className=' btn-blue-mpa ml-2' />
        </div>
      </div>
    );
  };

  const onPage = (event) => setlazyState(event);

  return (
    <>
      <FiltrosDenuncias
        filters={filters}
        onFilterChange={onFilterChange}
        resetAllFilters={resetAllFilters}
      />

      <ConfirmDialog draggable={false} />

      <DataTable
        value={denuncias}
        paginator
        rows={5}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        first={lazyState.first}
        onPage={onPage}
        dataKey='idDenuncia'
        emptyMessage='No se encontraron denuncias'
        className='mb-8 shadow-3'
        header={HeaderTable()}
      >
        <Column field='Nro' header='Nro' />
        <Column field='Realizacion' header='Realización' />
        <Column field='Seccional' header='Seccional' />
        <Column
          field='fechaDenuncia'
          header='Fecha de Denuncia'
          body={(rowData) => {
            const fecha = new Date(rowData.fechaDenuncia);
            const dia = fecha.getDate().toString();
            const mes = (fecha.getMonth() + 1).toString();
            const anio = fecha.getFullYear();
            return `${dia}/${mes}/${anio}`;
          }}
        />
        <Column field='tipoDenuncia' header='Tipo de Denuncia' />
        <Column field='Competencia' header='Competencia' />
        <Column field='Ratificada' header='Ratificada' />
        <Column field='FiscaliaAsignada' header='Fiscalía Asignada' />
        <Column field='NumLegajoAsignado' header='Nro de Legajo Asignado' />
        <Column
          field='Acciones'
          header='Acciones'
          body={(denuncia) => (
            <AccionesTabla id={denuncia.Nro} setVisible={setVisible} />
          )}
        />
      </DataTable>

      <RealizarPaseDenuncia visible={visible} setVisible={setVisible} />
    </>
  );
};