/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateUUID } from '@/utils/generateUUID';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import {
  agregarDetenido,
  modificarDetenido,
} from '@/store/denuncias/denunciaLegajo/denunciaLegajo.slice';
import { AccionesTabla } from './AccionesTabla';
import { parseDDMMYYYYHHMMSS } from '@/utils/parseDate';
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  denunciado: Yup.string().required('El denunciado es necesario'),
  fechaHoraDetencion: Yup.string().required('La fecha es necesaria'),
  lugarDetencion: Yup.string().required('El lugar de detención es necesario'),
  juezDetencion: Yup.string().required('El juez es necesario'),
});

export const Detenidos = ({ denunciados, detenidos }) => {
  const dispatch = useAppDispatch();
  const { detenidosForm } = useAppSelector((state) => state.denunciaLegajo);

  const formik = useFormik({
    initialValues: detenidosForm.form,
    initialErrors: detenidosForm.form,
    validationSchema,
    onSubmit: (value, { resetForm }) => {
      if (!detenidosForm.estaModificando) {
        value.id = generateUUID();
        value.fechaHoraDetencion = parseDDMMYYYYHHMMSS(
          value.fechaHoraDetencion
        );
        dispatch(agregarDetenido(value));
      }

      if (detenidosForm.estaModificando) {
        dispatch(modificarDetenido(value));
      }

      resetForm();
    },
  });

  useEffect(() => {
    formik.setValues({ ...formik.values, ...detenidosForm.form });
  }, [detenidosForm.form]);

  return (
    <Card className='shadow-1 px-7 py-3 mt-6'>
      <h2>Detenidos</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className='grid mt-6'>
          <div className='col-12 md:col-6'>
            <label htmlFor='denunciados'>Denunciados</label>
            <Dropdown
              id='denunciados'
              name='denunciado'
              options={denunciados}
              optionLabel='nombreCompleto'
              optionValue='id'
              placeholder='Seleccione'
              className={`w-full mt-2  ${
                formik.errors.denunciado && formik.touched.denunciado
                  ? 'p-invalid'
                  : null
              }`}
              value={formik.values.denunciado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InvalidFieldMessage formik={formik} name='denunciado' />
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='lugarDetencion'>Lugar de detención</label>
            <InputText
              className={`w-full mt-2  ${
                formik.errors.lugarDetencion && formik.touched.lugarDetencion
                  ? 'p-invalid'
                  : null
              }`}
              name='lugarDetencion'
              id='lugarDetencion'
              value={formik.values.lugarDetencion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InvalidFieldMessage formik={formik} name='lugarDetencion' />
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='fechaHoraDetencion'>
              Fecha y hora de detención
            </label>

            <Calendar
              placeholder='Seleccione la fecha'
              className={`w-full mt-2  ${
                formik.errors.fechaHoraDetencion &&
                formik.touched.fechaHoraDetencion
                  ? 'p-invalid'
                  : null
              }`}
              showIcon
              dateFormat='dd/mm/yy'
              showTime
              hourFormat='24'
              name='fechaHoraDetencion'
              id='fechaHoraDetencion'
              value={
                !detenidosForm.estaModificando
                  ? formik.values.fechaHoraDetencion
                  : new Date(
                      parseDDMMYYYYHHMMSS(formik.values.fechaHoraDetencion)
                    )
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InvalidFieldMessage formik={formik} name='fechaHoraDetencion' />
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='juezDetencion'>Juez que dispuso la detención</label>
            <InputText
              name='juezDetencion'
              className={`w-full mt-2  ${
                formik.errors.juezDetencion && formik.touched.juezDetencion
                  ? 'p-invalid'
                  : null
              }`}
              id='juezDetencion'
              value={formik.values.juezDetencion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InvalidFieldMessage formik={formik} name='juezDetencion' />
          </div>

          <div className='col-12 lg:col-6 xl:col-3 mb-4 mt-2'>
            <Button
              icon='pi pi-plus'
              label={detenidosForm.estaModificando ? 'Modificar' : 'Agregar'}
              className='btn-blue-mpa w-full'
              type='submit'
              disabled={!formik.isValid}
            />
          </div>
        </div>
      </form>

      <DataTable
        value={detenidos}
        paginator
        rows={5}
        totalRecords={detenidos.length}
        lazy
        emptyMessage='No se encontraron detenidos'
        className='mb-4 shadow-1 mt-4'
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          pt={{ headerCell: { className: 'w-2' } }}
          field='denunciado'
          header='Denunciado'
          body={(detenido) => {
            const [denunciado] = denunciados.filter(
              (denunciado) => detenido.denunciado === denunciado.id
            );

            return denunciado.nombreCompleto;
          }}
        />

        <Column
          pt={{ headerCell: { className: 'w-3' } }}
          field='lugarDetencion'
          header='Lugar de detención'
        />

        <Column
          pt={{ headerCell: { className: 'w-3' } }}
          field='fechaHoraDetencion'
          header='Fecha y hora de la detención'
        />

        <Column
          pt={{ headerCell: { className: 'w-3' } }}
          field='juezDetencion'
          header='Juez que dispuso la detención'
        />

        <Column
          pt={{ headerCell: { className: 'w-3' } }}
          field='Acciones'
          header='Acciones'
          body={(detenido) => (
            <AccionesTabla
              data={detenido}
              action='detenido'
              disabled={detenidosForm.estaModificando}
            />
          )}
        />
      </DataTable>
    </Card>
  );
};
