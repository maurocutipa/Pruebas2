let data = [
  {
    id: 1,
    nroMovimiento: 'Movimiento 1',
    fiscaliaOrigen: 'Fiscalía A',
    fiscaliaDestino: 'Fiscalía B',
    nroDenuncia: 'Denuncia 123',
    realizadoPor: 'Usuario 1',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 2,
    nroMovimiento: 'Movimiento 2',
    fiscaliaOrigen: 'Fiscalía C',
    fiscaliaDestino: 'Fiscalía D',
    nroDenuncia: 'Denuncia 456',
    realizadoPor: 'Usuario 2',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 3,
    nroMovimiento: 'Movimiento 3',
    fiscaliaOrigen: 'Fiscalía E',
    fiscaliaDestino: 'Fiscalía F',
    nroDenuncia: 'Denuncia 789',
    realizadoPor: 'Usuario 3',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 4,
    nroMovimiento: 'Movimiento 4',
    fiscaliaOrigen: 'Fiscalía X',
    fiscaliaDestino: 'Fiscalía Y',
    nroDenuncia: 'Denuncia 101',
    realizadoPor: 'Usuario 4',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 5,
    nroMovimiento: 'Movimiento 5',
    fiscaliaOrigen: 'Fiscalía M',
    fiscaliaDestino: 'Fiscalía N',
    nroDenuncia: 'Denuncia 222',
    realizadoPor: 'Usuario 5',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 6,
    nroMovimiento: 'Movimiento 6',
    fiscaliaOrigen: 'Fiscalía Q',
    fiscaliaDestino: 'Fiscalía R',
    nroDenuncia: 'Denuncia 333',
    realizadoPor: 'Usuario 6',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 7,
    nroMovimiento: 'Movimiento 7',
    fiscaliaOrigen: 'Fiscalía U',
    fiscaliaDestino: 'Fiscalía V',
    nroDenuncia: 'Denuncia 444',
    realizadoPor: 'Usuario 7',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 8,
    nroMovimiento: 'Movimiento 8',
    fiscaliaOrigen: 'Fiscalía W',
    fiscaliaDestino: 'Fiscalía Z',
    nroDenuncia: 'Denuncia 555',
    realizadoPor: 'Usuario 8',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 9,
    nroMovimiento: 'Movimiento 9',
    fiscaliaOrigen: 'Fiscalía P',
    fiscaliaDestino: 'Fiscalía O',
    nroDenuncia: 'Denuncia 666',
    realizadoPor: 'Usuario 9',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 10,
    nroMovimiento: 'Movimiento 10',
    fiscaliaOrigen: 'Fiscalía K',
    fiscaliaDestino: 'Fiscalía L',
    nroDenuncia: 'Denuncia 777',
    realizadoPor: 'Usuario 10',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 11,
    nroMovimiento: 'Movimiento 11',
    fiscaliaOrigen: 'Fiscalía G',
    fiscaliaDestino: 'Fiscalía H',
    nroDenuncia: 'Denuncia 888',
    realizadoPor: 'Usuario 11',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 12,
    nroMovimiento: 'Movimiento 12',
    fiscaliaOrigen: 'Fiscalía S',
    fiscaliaDestino: 'Fiscalía T',
    nroDenuncia: 'Denuncia 999',
    realizadoPor: 'Usuario 12',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 13,
    nroMovimiento: 'Movimiento 13',
    fiscaliaOrigen: 'Fiscalía I',
    fiscaliaDestino: 'Fiscalía J',
    nroDenuncia: 'Denuncia 1010',
    realizadoPor: 'Usuario 13',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 14,
    nroMovimiento: 'Movimiento 14',
    fiscaliaOrigen: 'Fiscalía N',
    fiscaliaDestino: 'Fiscalía M',
    nroDenuncia: 'Denuncia 1111',
    realizadoPor: 'Usuario 14',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
  {
    id: 15,
    nroMovimiento: 'Movimiento 15',
    fiscaliaOrigen: 'Fiscalía B',
    fiscaliaDestino: 'Fiscalía A',
    nroDenuncia: 'Denuncia 1212',
    realizadoPor: 'Usuario 15',
    fechaPase: new Date('2023-10-04').toLocaleDateString('es-AR'),
  },
];

import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * State: {
 *  filters: {},
 *  pagination: {}
 * }
 */
export const getPasesThunk = createAsyncThunk(
  'pases/getAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Filters
      if (Object.keys(filters).length !== 0) {
        data = data.filter((pase) => {
          return (
            pase.nroMovimiento
              .toString()
              .toLowerCase()
              .includes(filters.nroMovimiento.toLowerCase()) &&
            pase.nroDenuncia
              .toString()
              .toLowerCase()
              .includes(filters.nroDenuncia.toLowerCase()) &&
            pase.fiscaliaOrigen
              .toString()
              .toLowerCase()
              .includes(filters.fiscaliaOrigen.toLowerCase()) &&
            pase.fiscaliaDestino
              .toString()
              .toLowerCase()
              .includes(filters.fiscaliaDestino.toLowerCase()) &&
            pase.realizadoPor
              .toString()
              .toLowerCase()
              .includes(filters.realizadoPor.toLowerCase()) &&
            (!filters.fechaDesde ||
              !filters.fechaHasta ||
              (filters.fechaDesde <= new Date(pase.fechaPase) &&
                new Date(pase.fechaPase) <= filters.fechaHasta))
          );
        });
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
