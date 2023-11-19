/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { AccionesTabla } from './AccionesTabla';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useFormik } from 'formik';
import {
  agregarResumenHecho,
  modificarResumenHecho,
  agregarFiscalia,
} from '@/store/legajoSlice/legajo.slice';
import * as Yup from 'yup';
import { generateUUID } from '@/utils/generateUUID';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';

const validationSchema = Yup.object().shape({
  fiscalia: Yup.string().required('La fiscalía es necesaria'),
  denunciado: Yup.string().required('El denunciado es necesario'),
  descripcion: Yup.string().required('La descripción es necesaria'),
});

export const ResumenHechos = ({
  denunciados,
  delegacionesFiscales,
  resumenHechos,
}) => {
  const dispatch = useAppDispatch();
  const { resumenHechosForm } = useAppSelector((state) => state.legajo);

  const initialValues = { fiscalia: '', ...resumenHechosForm.form };
  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    onSubmit: (values, { resetForm }) => {
      if (!resumenHechosForm.estaModificando) {
        values.id = generateUUID();
        dispatch(agregarResumenHecho(values));
      }

      if (resumenHechosForm.estaModificando) {
        dispatch(modificarResumenHecho(values));
      }

      resetForm({
        values: {
          fiscalia: values.fiscalia,
          denunciado: '',
          descripcion: '',
          id: '',
        },
      });
    },
    validationSchema,
  });

  useEffect(() => {
    formik.setValues({ ...formik.values, ...resumenHechosForm.form });
  }, [resumenHechosForm.form]);

  return (
    <Card className='shadow-1 px-7 mt-6'>
      <form onSubmit={formik.handleSubmit}>
        <div className=''>
          <h2>Asignar fiscalía al legajo</h2>

          <div className='grid mt-6'>
            <div className='col-12 lg:col-5'>
              <label htmlFor='fiscalia'>Seleccione una fiscalía</label>
              <Dropdown
                id='fiscalia'
                name='fiscalia'
                options={delegacionesFiscales}
                optionLabel='delegacionFiscal'
                optionValue='idDelegacionFiscal'
                placeholder='Seleccione'
                className={`w-full mt-2  ${
                  formik.touched.fiscalia && formik.errors.fiscalia
                    ? 'p-invalid'
                    : null
                }`}
                onChange={(ev) => {
                  formik.handleChange(ev);
                  dispatch(agregarFiscalia(ev.target.value));
                }}
                value={formik.values.fiscalia}
                onBlur={formik.handleBlur}
              />
              <InvalidFieldMessage name='fiscalia' formik={formik} />
            </div>
          </div>
        </div>

        <Divider className='my-7' />

        <div className=''>
          <h2>Resumen de los hechos</h2>

          <div className='grid mt-6'>
            <div className='col-12 lg:col-5'>
              <label htmlFor='denunciados'>Denunciados</label>
              <Dropdown
                id='denunciados'
                name='denunciado'
                options={denunciados}
                optionLabel='nombreCompleto'
                optionValue='id'
                placeholder='Seleccione'
                className={`w-full mt-2  ${
                  formik.touched.denunciado && formik.errors.denunciado
                    ? 'p-invalid'
                    : null
                }`}
                onChange={formik.handleChange}
                value={formik.values.denunciado}
                onBlur={formik.handleBlur}
              />
              <InvalidFieldMessage name='denunciado' formik={formik} />
            </div>
          </div>

          <div className='grid mt-4'>
            <div className='col-12'>
              <label htmlFor='descripcion'>Descripción</label>
              <InputTextarea
                id='descripcion'
                name='descripcion'
                className={`w-full mt-2  ${
                  formik.errors.descripcion && formik.touched.descripcion
                    ? 'p-invalid'
                    : null
                }`}
                rows={8}
                autoResize='none'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.descripcion}
              />
              <InvalidFieldMessage name='descripcion' formik={formik} />
            </div>

            <div className='col-12 lg:col-6 xl:col-3 mb-4'>
              <Button
                icon='pi pi-plus'
                label={
                  resumenHechosForm.estaModificando ? 'Modificar' : 'Agregar'
                }
                className='btn-blue-mpa w-full px-2'
                type='submit'
                disabled={!formik.isValid}
              />
            </div>
          </div>
        </div>
      </form>

      <ConfirmDialog draggable={false} />

      <DataTable
        value={resumenHechos}
        paginator
        rows={5}
        totalRecords={resumenHechos.length}
        lazy
        emptyMessage='No se encontraron denunciados'
        className='mb-4 shadow-1 mt-4'
        tableStyle={{ minWidth: '50rem' }}
        dataKey='id'
      >
        <Column
          field='denunciado'
          header='Denunciados'
          pt={{ headerCell: { className: 'w-4' } }}
          body={(resumen) => {
            const [denunciado] = denunciados.filter(
              (denunciado) => resumen.denunciado === denunciado.id
            );

            return denunciado.nombreCompleto;
          }}
        />
        <Column
          field='descripcion'
          header='Descripción'
          pt={{ headerCell: { className: 'w-6' } }}
          body={(resumen) => resumen.descripcion}
        />

        <Column
          field='Acciones'
          header='Acciones'
          body={(resumen) => <AccionesTabla data={resumen} action='resumen' />}
        />
      </DataTable>
    </Card>
  );
};
