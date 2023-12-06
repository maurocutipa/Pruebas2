import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { RedaccionEmail } from '@/components/pages/BandejaDenuncias/DenunciaNoPenal/RedaccionEmail';
import { Notificaciones } from '@/components/pages/BandejaDenuncias/DenunciaNoPenal/Notificaciones';
import { useFormik } from 'formik';
import { Campos } from '@/components/pages/BandejaDenuncias/DenunciaNoPenal/Campos';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { crearDenunciaNoPenalThunk } from '@/store/denuncias/denunciaNoPenal/denunciaNoPenal.thunks';
import { useEffect, useRef } from 'react';
import { resetState } from '@/store/denuncias/denunciaNoPenal/denunciaNoPenal.slice';
import { toastError, toastSuccess } from '@/utils/toastMessage';
import { Toast } from 'primereact/toast';

const validationSchema = Yup.object().shape({
  asunto: Yup.string().required('El asunto es necesario'),
  observaciones: Yup.string()
    .required('La observación es necesaria')
    .min(20, 'La obervación debe tener al menos 20 caracteres'),
  competencia: Yup.string().required('La competencia es necesaria'),
  remision: Yup.string().required('La remisión es necesaria'),
});

export const DenunciaNoPenal = () => {
  const toast = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { form } = useAppSelector((state) => state.denunciaNoPenal);
  const { notificaciones } = useAppSelector((state) => state.personas);

  const formik = useFormik({
    initialValues: form,
    initialErrors: form,
    validationSchema,
    onSubmit: async (values) => {
      values.idDenuncia = Number(id);

      const { meta } = await dispatch(
        crearDenunciaNoPenalThunk({ ...values, notificaciones })
      );
      if (meta.requestStatus === 'fulfilled') {
        toastSuccess(
          toast,
          'Se realizó la ratificación, puede regresar a la bandeja de denuncias'
        );
      } else {
        toastError(toast, 'No se pudo realizar la ratificación');
      }
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <div className='px-8 py-4'>
      <Toast ref={toast} />
      <h1 className='text-center'>Trámite de denuncia no penal - N° {id}</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className='mt-6'>
          <Button
            icon='pi pi-angle-left'
            label='Regresar a la bandeja'
            className='text-lightblue-mpa p-0 mb-4'
            type='button'
            link
            onClick={() => navigate('/bandeja-denuncias')}
          />

          <Card className='shadow-1 px-7'>
            <Campos formik={formik} />
            <Divider className='my-6' />

            <Notificaciones />
          </Card>

          <RedaccionEmail formik={formik} />
        </div>

        <div className='flex justify-content-between mt-6 mb-2'>
          <Button
            icon='pi pi-angle-left'
            label={'Cancelar'}
            onClick={() => navigate('/bandeja-denuncias')}
            className='bg-red-700 hover:bg-red-800 border-red-700'
            size='large'
          />

          <Button
            label={'Guardar Denuncia No Penal'}
            disabled={!formik.isValid}
            className='btn-blue-mpa'
            size='large'
            type='submit'
          />
        </div>
      </form>
    </div>
  );
};
