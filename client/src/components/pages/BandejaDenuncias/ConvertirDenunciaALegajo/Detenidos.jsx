/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export const Detenidos = ({ denunciados }) => {
  const { detenidosForm } = useAppSelector((state) => state.denunciaLegajo);
  const formik = useFormik({
    initialValues: detenidosForm.form,
    initialErrors: detenidosForm.form,
    onSubmit: (value) => {
      console.log(value);
    },
  });

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
              className={`w-full mt-2 `}
              value={formik.values.denunciado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* <InvalidFieldMessage formik={formik} name='denunciado' /> */}
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='lugarDetencion'>Lugar de detención</label>
            <InputText
              className='w-full mt-2'
              name='lugarDetencion'
              id='lugarDetencion'
              value={formik.values.lugarDetencion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* <InvalidFieldMessage formik={formik} name='lugarDetencion' /> */}
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='fechaHoraDetencion'>
              Fecha y hora de detención
            </label>

            <Calendar
              dateFormat='dd/mm/yy'
              placeholder='Seleccione la fecha'
              className='w-full mt-2'
              showIcon
              name='fechaHoraDetencion'
              id='fechaHoraDetencion'
              value={formik.values.fechaHoraDetencion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className='col-12 md:col-6'>
            <label htmlFor='juezDetencion'>Juez que dispuso la detención</label>
            <InputText
              className='w-full mt-2'
              name='juezDetencion'
              id='juezDetencion'
              value={formik.values.juezDetencion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* <InvalidFieldMessage formik={formik} name='juezDetencion' /> */}
          </div>

          <div className='col-12 lg:col-6 xl:col-3 mb-4 mt-2'>
            <Button
              icon='pi pi-plus'
              label={'Agregar'}
              className='btn-blue-mpa w-full'
              type='submit'
              disabled={!formik.isValid}
            />
          </div>
        </div>
      </form>

      <DataTable
        value={[]}
        paginator
        rows={5}
        totalRecords={[].length}
        lazy
        emptyMessage='No se encontraron detenidos'
        className='mb-4 shadow-1 mt-4'
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          pt={{ headerCell: { className: 'w-2' } }}
          field='denunciado'
          header='Denunciado'
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
      </DataTable>
    </Card>
  );
};
