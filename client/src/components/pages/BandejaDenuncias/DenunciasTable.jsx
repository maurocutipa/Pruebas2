import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Badge } from 'primereact/badge';

import { FiltrosDenuncias } from './FiltrosDenuncias.jsx';
import { AccionesTabla } from './AccionesTabla.jsx';
import { RealizarPaseDenuncia } from './RealizarPaseDenuncia.jsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.js';
import { getDenunciasThunk } from '@/store/denuncias/denuncias.thunks.js';
import { parseDDMMYYYYHHMM } from '@/utils/parseDate.js';
import { exportExcel } from '@/utils/exportExcel.js';

const filtersInitialState = {
  idDenuncia: '',
  realizacion: 0,
  seccional: 0,
  fechaDenunciaDesde: '',
  fechaDenunciaHasta: '',
  tipoDenuncia: 0,
  competencia: 0,
  estado: '',
  fiscaliaAsignada: '',
  idLegajo: '',
  ratificacion: '',
};

const lazyInitialState = {
  first: 0,
  rows: 5,
  page: 1,
};

export const DenunciasTable = () => {
  const dispatch = useAppDispatch();
  const { denuncias, totalRecords, loading } = useAppSelector(
    (state) => state.denuncias
  );

  const [visible, setVisible] = useState(false);
  useState(false);

  const [filters, setFilters] = useState(filtersInitialState);
  const [lazyState, setlazyState] = useState(lazyInitialState);

  useEffect(() => {
    dispatch(getDenunciasThunk({ ...lazyState, ...filters }));
  }, [dispatch, lazyState]);

  // handleRealizarBusqueda: Evento onClick del boton "Realizar busqueda"
  const handleRealizarBusqueda = () => {
    setlazyState(lazyInitialState);
    dispatch(getDenunciasThunk({ ...lazyState, ...filters }));
  };

  // resetAllFilters: Limpia los filtros y reinicia la tabla
  const resetAllFilters = () => {
    setFilters(filtersInitialState);
    dispatch(
      getDenunciasThunk({ ...lazyInitialState, ...filtersInitialState })
    );
  };

  const onFilterChange = (field, value) => {
    if (field === 'FechaDenunciaDesde' || field === 'FechaDenunciaHasta') {
      const dateValue = value ? new Date(value) : null;
      setFilters({ ...filters, [field]: dateValue });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const HeaderTable = () => {
    return (
      <div className='flex justify-content-between align-items-center md:flex-row flex-column'>
        <div className='font-semibold text-gray-600 md:mb-0 mb-6'>
          {lazyState.first + 1}-{lazyState.first + lazyState.rows} de{' '}
          {totalRecords} resultados
        </div>

        <div className='mr-4'>
          <Button
            type='button'
            icon='pi pi-file-excel'
            rounded
            onClick={() => exportExcel(denuncias)}
            severity='success'
            tooltip='Exportar a Excel'
            tooltipOptions={{ position: 'top' }}
            className='bg-green-800 border-green-800'
          />
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
        handleRealizarBusqueda={handleRealizarBusqueda}
      />

      <ConfirmDialog draggable={false} />

      <DataTable
        value={denuncias}
        paginator
        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
        rows={lazyState.rows}
        rowsPerPageOptions={[5, 10, 15]}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        first={lazyState.first}
        onPage={onPage}
        dataKey='idDenuncia'
        emptyMessage='No se encontraron denuncias'
        className='mb-8 shadow-3'
        stateStorage='session'
        stateKey='denuncias-state-local'
        header={HeaderTable()}
      >
        <Column field='idDenuncia' header='Nro' />
        <Column
          field='realizacion'
          header='Realización'
          body={(rowData) =>
            rowData.realizacion ? rowData.realizacion : 'NO TIENE'
          }
        />

        <Column
          field='seccional'
          header='Seccional'
          body={(rowData) =>
            rowData.seccional ? rowData.seccional : 'NO TIENE'
          }
        />

        <Column
          field='fechaDenuncia'
          header='Fecha de Denuncia'
          body={(rowData) =>
            parseDDMMYYYYHHMM(rowData.fechaDenuncia, rowData.horaDenuncia)
          }
        />

        <Column field='tipoDenuncia' header='Tipo de Denuncia' />
        <Column
          field='competencia'
          header='Competencia'
          body={(rowData) =>
            rowData.competencia ? rowData.competencia : 'NO TIENE'
          }
        />

        <Column
          field='fiscaliaAsignada'
          header='Fiscalía Asignada'
          body={(rowData) =>
            rowData.fiscaliaAsignada ? rowData.fiscaliaAsignada : 'No registra'
          }
        />

        <Column
          field='ratificacion'
          header='Ratificada'
          body={(rowData) =>
            rowData.ratificacion === 'SI' ? (
              <Badge value='SI' className='bg-green-700' />
            ) : (
              <Badge value='NO' className='bg-red-700' />
            )
          }
        />
        <Column
          field='idLegajo'
          header='Nro de Legajo Asignado'
          body={(rowData) =>
            rowData.idLegajo ? (
              <Badge
                value={`${rowData.letra}-${rowData.nroExp}-MPA`}
                className='bg-blue-700'
              />
            ) : (
              <Badge value='Pendiente' className='bg-gray-300 text-gray-900' />
            )
          }
        />
        <Column
          field='Acciones'
          header='Acciones'
          body={(denuncia) => (
            <AccionesTabla
              id={denuncia.idDenuncia}
              setVisible={setVisible}
              isRatificada={!!denuncia.ratificacion}
              idLegajo={denuncia.idLegajo}
            />
          )}
        />
      </DataTable>

      <RealizarPaseDenuncia visible={visible} setVisible={setVisible} />
    </>
  );
};
