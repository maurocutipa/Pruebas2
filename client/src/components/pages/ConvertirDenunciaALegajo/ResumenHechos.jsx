/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { AccionesResumenHechos } from './AccionesResumenHechos';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useFormik } from 'formik';
import { agregarResumenHecho } from '@/store/legajoSlice/legajo.slice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fiscalia: Yup.string().required('La fiscalía es necesaria'),
  denunciado: Yup.string().required('El denunciado es necesario'),
  descripcion: Yup.string().required('La descripción es necesaria'),
});

const initialValues = { fiscalia: '', denunciado: '', descripcion: '' };

export const ResumenHechos = ({ denunciados, delegacionesFiscales }) => {
  const dispatch = useAppDispatch();
  const { denunciaALegajoForm } = useAppSelector((state) => state.legajo);

  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      dispatch(agregarResumenHecho(values));
      resetForm({
        values: { fiscalia: values.fiscalia, denunciado: '', descripcion: '' },
      });
    },
    validationSchema,
  });

  const MessageError = ({ name }) => (
    <>
      {formik.touched[name] && formik.errors[name] ? (
        <small className='p-error'>{formik.errors[name]}</small>
      ) : null}
    </>
  );

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
                onChange={formik.handleChange}
                value={formik.values.fiscalia}
                onBlur={formik.handleBlur}
              />
              <MessageError name='fiscalia' />
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
              <MessageError name='denunciado' />
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
              <MessageError name='descripcion' />
            </div>

            <div className='col-12 lg:col-6 xl:col-3 mb-4'>
              <Button
                icon='pi pi-plus'
                label='Agregar'
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
        value={denunciaALegajoForm.resumenHechos}
        paginator
        rows={5}
        totalRecords={denunciaALegajoForm.resumenHechos.length}
        lazy
        emptyMessage='No se encontraron denunciados'
        className='mb-4 shadow-1 mt-4'
        // header={HeaderTable()}
        tableStyle={{ minWidth: '50rem' }}
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
          body={(resumen) => <AccionesResumenHechos id={resumen.idResumen} />}
        />
      </DataTable>
    </Card>
  );
};
