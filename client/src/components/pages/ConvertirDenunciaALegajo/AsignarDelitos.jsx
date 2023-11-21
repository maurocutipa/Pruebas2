/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { useFormik } from 'formik';
import {
  agregarDelito,
  modificarDelitoAsignado,
} from '@/store/legajoSlice/legajo.slice';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AccionesTabla } from './AccionesTabla';
import { generateUUID } from '@/utils/generateUUID';
import { useEffect } from 'react';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';

const validationSchema = Yup.object().shape({
  delito: Yup.string().required('El delito es necesario'),
  denunciado: Yup.string().required('El denunciado es necesario'),
});

export const AsignarDelito = ({ denunciados, delitos, delitosAsignados }) => {
  const { delitoAsignadoForm } = useAppSelector((state) => state.legajo);
  const dispatch = useAppDispatch();

  const initialValues = delitoAsignadoForm.form;
  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    onSubmit: (values, { resetForm }) => {
      if (!delitoAsignadoForm.estaModificando) {
        values.id = generateUUID();
        dispatch(agregarDelito(values));
      }

      if (delitoAsignadoForm.estaModificando) {
        dispatch(modificarDelitoAsignado(values));
      }

      resetForm();
    },
    validationSchema,
  });

  useEffect(() => {
    formik.setValues({ ...formik.values, ...delitoAsignadoForm.form });
  }, [delitoAsignadoForm.form]);

  return (
    <Card className='shadow-1 px-7 py-3 mt-6'>
      <h2>Asignar delitos</h2>

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
              onChange={formik.handleChange}
              value={formik.values.denunciado}
              onBlur={formik.handleBlur}
            />
            <InvalidFieldMessage formik={formik} name='denunciado' />
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='delitos'>Delitos</label>
            <Dropdown
              id='delitos'
              options={delitos}
              optionLabel='nombre'
              optionValue='idDelito'
              placeholder='Seleccione'
              name='delito'
              filter
              className={`w-full mt-2  ${
                formik.errors.delito && formik.touched.delito
                  ? 'p-invalid'
                  : null
              }`}
              value={formik.values.delito}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InvalidFieldMessage formik={formik} name='delito' />
          </div>

          <div className='col-12 lg:col-6 xl:col-3 mb-4 mt-2'>
            <Button
              icon='pi pi-plus'
              label={
                delitoAsignadoForm.estaModificando ? 'Modificar' : 'Agregar'
              }
              className='btn-blue-mpa w-full'
              type='submit'
              disabled={!formik.isValid}
            />
          </div>
        </div>
      </form>

      <DataTable
        value={delitosAsignados}
        paginator
        rows={5}
        totalRecords={delitosAsignados.length}
        lazy
        emptyMessage='No se encontraron delitos'
        className='mb-4 shadow-1 mt-4'
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          pt={{ headerCell: { className: 'w-4' } }}
          field='denunciado'
          header='Denunciados'
          body={(resumen) => {
            const [denunciado] = denunciados.filter(
              (denunciado) => resumen.denunciado === denunciado.id
            );

            return denunciado.nombreCompleto;
          }}
        />

        <Column
          pt={{ headerCell: { className: 'w-6' } }}
          field='delito'
          header='Delito'
          body={(resumen) => {
            const [delito] = delitos.filter(
              (delito) => resumen.delito === delito.idDelito
            );

            return delito.nombre;
          }}
        />

        <Column
          field='Acciones'
          header='Acciones'
          body={(delito) => <AccionesTabla data={delito} action='delito' />}
        />
      </DataTable>
    </Card>
  );
};
