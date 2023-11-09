/* eslint-disable react/prop-types */
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getDatosDeFiltrosThunk } from '@/store/denunciasSlice/denuncias.thunks';
import { useEffect } from 'react';

const today = new Date();
const maxDate = new Date();

maxDate.setMonth(today.getMonth());
maxDate.setFullYear(today.getFullYear());

export const FiltrosDenuncias = ({
  filters,
  onFilterChange,
  handleRealizarBusqueda,
}) => {
  const dispatch = useAppDispatch();
  const { datosDeFiltros } = useAppSelector((state) => state.denuncias);
  const { seccionales, tiposDenuncia, delegacionesFiscales } = datosDeFiltros;

  useEffect(() => {
    dispatch(getDatosDeFiltrosThunk());
  }, [dispatch]);

  return (
    <>
      <div className='mb-6'>
        <div className='grid'>
          <div className='col-12 md:col-6 lg:col-3'>
            <InputText
              value={filters.idDenuncia}
              onChange={(e) => onFilterChange('idDenuncia', e.target.value)}
              placeholder='N° Denuncia'
              className='w-12'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Dropdown
              value={filters.Realizacion}
              onChange={(e) => onFilterChange('realizacion', e.target.value)}
              placeholder='Seleccione una Realización'
              className='w-full'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Dropdown
              options={seccionales}
              optionLabel='seccional'
              optionValue='idSeccional'
              value={filters.seccional}
              onChange={(e) => onFilterChange('seccional', e.target.value)}
              placeholder='Seleccione una seccional'
              className='w-12'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Dropdown
              options={tiposDenuncia}
              optionLabel='tipoDenuncia'
              optionValue='idTipoDenuncia'
              value={filters.tipoDenuncia}
              onChange={(e) => onFilterChange('tipoDenuncia', e.target.value)}
              placeholder='Seleccione un tipo de denuncia'
              className='w-12'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Dropdown
              value={filters.Competencia}
              onChange={(e) => onFilterChange('competencia', e.target.value)}
              placeholder='Seleccione Competencia'
              className='w-12'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Dropdown
              value={filters.Ratificada}
              onChange={(e) => onFilterChange('ratificada', e.target.value)}
              placeholder='Seleccione estado'
              className='w-12'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Calendar
              value={filters.FechaDenunciaDesde}
              onChange={(e) =>
                onFilterChange('fechaDenunciaDesde', e.target.value)
              }
              dateFormat='dd/mm/yy'
              placeholder='Fecha Desde'
              className='w-12'
              showIcon
              maxDate={maxDate}
              pt={{
                dropdownButton: {
                  root: { className: 'btn-blue-mpa' },
                },
              }}
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Calendar
              value={filters.FechaDenunciaHasta}
              onChange={(e) =>
                onFilterChange('fechaDenunciaHasta', e.target.value)
              }
              dateFormat='dd/mm/yy'
              placeholder='Fecha Hasta'
              className='w-12'
              showIcon
              maxDate={maxDate}
              pt={{
                dropdownButton: {
                  root: { className: 'btn-blue-mpa' },
                },
              }}
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <Dropdown
              options={delegacionesFiscales}
              optionLabel='delegacionFiscal'
              optionValue='idDelegacionFiscal'
              value={filters.FiscaliaAsignada}
              onChange={(e) =>
                onFilterChange('fiscaliaAsignada', e.target.value)
              }
              placeholder='Seleccione fiscalia asignada'
              className='w-12'
            />
          </div>
          <div className='col-12 md:col-6 lg:col-3'>
            <InputText
              value={filters.NumLegajoAsignado}
              onChange={(e) =>
                onFilterChange('numLegajoAsignado', e.target.value)
              }
              placeholder='N° De legajo asignado'
              className='w-12'
            />
          </div>
        </div>

        <div className='col-12 md:col-6 lg:col-3 mt-4'>
          <Button
            label='Realizar búsqueda'
            className='w-full py-3 btn-blue-mpa'
            onClick={handleRealizarBusqueda}
          />
        </div>
      </div>
    </>
  );
};
