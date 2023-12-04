/* eslint-disable react/prop-types */
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';

export const RedaccionEmail = ({ formik }) => {
  return (
    <Card className='shadow-1 px-7 mt-6'>
      <h2>Redacción del mail</h2>

      <div className='grid mt-6'>
        <div className='col-12 lg:col-5'>
          <label htmlFor='asunto'>Asunto</label>
          <InputText
            id='asunto'
            name='asunto'
            className={`w-full mt-2  ${
              formik.errors.asunto && formik.touched.asunto ? 'p-invalid' : null
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.asunto}
          />

          <InvalidFieldMessage formik={formik} name='asunto' />
        </div>
      </div>

      <div className='grid mt-4'>
        <div className='col-12'>
          <label htmlFor='observaciones'>Observaciones</label>
          <InputTextarea
            id='observaciones'
            name='observaciones'
            className={`w-full mt-2  ${
              formik.errors.observaciones && formik.touched.observaciones
                ? 'p-invalid'
                : null
            }`}
            rows={8}
            autoResize='none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.observaciones}
          />

          <InvalidFieldMessage formik={formik} name='observaciones' />
        </div>
      </div>
    </Card>
  );
};
