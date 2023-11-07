import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import axios from 'axios';

import { FiltrosPases } from './FiltrosPases';
import { VerDenuncia } from './VerDenuncia';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getPasesThunk } from '@/store/pasesSlice/pases.thunks';

const filterInitialState = {
  nroMovimiento: '',
  fiscaliaOrigen: '',
  fiscaliaDestino: '',
  nroDenuncia: '',
  realizadoPor: '',
  fechaDesde: null,
  fechaHasta: null,
};

export const PasesTable = () => {
  const dispatch = useAppDispatch();
  const { pases } = useAppSelector((state) => state.pases);

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [resetFilters, setResetFilters] = useState(false);

  const [filters, setFilters] = useState(filterInitialState);

  // States for lazy load
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 1,
  });

  const [totalRecords, setTotalRecords] = useState(20);

  const lazyLoadData = () => {
    console.log(lazyState);
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${lazyState.rows}&offset=${lazyState.first}`
      )
      .then((response) => {
        setTotalRecords(response.data.count);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    dispatch(getPasesThunk());
    lazyLoadData();
  }, [dispatch, lazyState]);

  const onFilterChange = (field, value) => {
    if (field === 'fechaDesde' || field === 'fechaHasta') {
      const dateValue = value ? new Date(value) : null;
      setFilters({ ...filters, [field]: dateValue });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const resetAllFilters = () => {
    setFilters(filterInitialState);
    setResetFilters(!resetFilters);
    setGlobalFilterValue('');
  };

  // const onGlobalFilterChange = (e) => {
  //   const value = e.target.value;
  //   setGlobalFilterValue(value);

  //   const filteredData = pases.filter((item) => {
  //     return (
  //       // ... (tus filtros existentes) ...
  //       // Agrega aquí tu filtro global
  //       JSON.stringify(Object.values(item))
  //         .toLowerCase()
  //         .includes(value.toLowerCase())
  //     );
  //   });

  //   setFilteredPases(filteredData);
  // };

  const onPage = (event) => {
    console.log(event);
    setlazyState(event);
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
          ></i>
          <span className='p-input-icon-left'>
            <i className='pi pi-search' />
            <InputText
              value={globalFilterValue}
              // onChange={onGlobalFilterChange}
              placeholder='Búsqueda global'
            />
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <FiltrosPases filters={filters} onFilterChange={onFilterChange} />

      <DataTable
        value={pases}
        paginator
        rows={5}
        totalRecords={totalRecords}
        lazy
        first={lazyState.first}
        onPage={onPage}
        dataKey='id'
        emptyMessage='No se encontraron pases'
        className='mb-8 shadow-3'
        header={HeaderTable()}
      >
        <Column field='nroMovimiento' header='Nro de Movimiento' />
        <Column field='nroDenuncia' header='Nro de Denuncia' />
        <Column field='fiscaliaOrigen' header='Fiscalía Origen' />
        <Column field='fiscaliaDestino' header='Fiscalía Destino' />
        <Column
          field='fechaPase'
          header='Fecha del pase'
          body={(rowData) => {
            const fecha = new Date(rowData.fechaPase);
            const dia = fecha.getDate().toString();
            const mes = (fecha.getMonth() + 1).toString();
            const anio = fecha.getFullYear();
            return `${dia}/${mes}/${anio}`;
          }}
        />
        <Column field='realizadoPor' header='Realizado por' />
        <Column
          field='acciones'
          header='Acciones'
          body={(pase) => <VerDenuncia id={pase.id} />}
        />
      </DataTable>
    </>
  );
};
