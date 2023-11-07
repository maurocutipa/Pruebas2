/* eslint-disable react/prop-types */
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { useAppDispatch } from '@/store/hooks';
import { getPasesThunk } from '@/store/pasesSlice/pases.thunks';

const today = new Date();
const maxDate = new Date();

maxDate.setMonth(today.getMonth());
maxDate.setFullYear(today.getFullYear());

export const FiltrosPases = ({ filters, onFilterChange }) => {
  const dispatch = useAppDispatch();

  const handleRealizarBusqueda = () => {
    dispatch(getPasesThunk(filters));
  };

  return (
    <div className='grid mb-6'>
      <div className='col-12 md:col-6 lg:col-3'>
        <InputText
          value={filters.nroMovimiento}
          onChange={(e) => onFilterChange('nroMovimiento', e.target.value)}
          placeholder='Nro Movimiento '
          className='w-12'
        />
      </div>

      <div className='col-12 md:col-6 lg:col-3'>
        <InputText
          value={filters.nroDenuncia}
          onChange={(e) => onFilterChange('nroDenuncia', e.target.value)}
          placeholder='Nro Denuncia'
          className='w-12'
        />
      </div>

      <div className='col-12 md:col-6 lg:col-3'>
        <InputText
          value={filters.realizadoPor}
          onChange={(e) => onFilterChange('realizadoPor', e.target.value)}
          placeholder='Realizado por'
          className='w-12'
        />
      </div>

      <div className='col-12 md:col-6 lg:col-3'>
        <InputText
          value={filters.fiscaliaOrigen}
          onChange={(e) => onFilterChange('fiscaliaOrigen', e.target.value)}
          placeholder='Fiscalía Origen'
          className='w-12'
        />
      </div>

      <div className='col-12 md:col-6 lg:col-3'>
        <InputText
          value={filters.fiscaliaDestino}
          onChange={(e) => onFilterChange('fiscaliaDestino', e.target.value)}
          placeholder='Fiscalía Destino'
          className='w-12'
        />
      </div>

      <div className='col-12 md:col-6 lg:col-3'>
        <Calendar
          value={filters.fechaDesde}
          onChange={(e) => onFilterChange('fechaDesde', e.target.value)}
          dateFormat='dd/mm/yy'
          placeholder='Fecha Desde'
          className='w-12'
          showIcon
          maxDate={maxDate}
        />
      </div>

      <div className='col-12 md:col-6 lg:col-3'>
        <Calendar
          value={filters.fechaHasta}
          onChange={(e) => onFilterChange('fechaHasta', e.target.value)}
          dateFormat='dd/mm/yy'
          placeholder='Fecha Hasta'
          className='w-12'
          showIcon
          maxDate={maxDate}
        />
      </div>
      <div className='col-12 md:col-6 lg:col-3' />

      <div className='col-12 md:col-6 lg:col-3 mt-4'>
        <Button
          label='Realizar búsqueda'
          className='w-full py-3 btn-blue-mpa'
          onClick={handleRealizarBusqueda}
        />
      </div>
    </div>
  );
};
