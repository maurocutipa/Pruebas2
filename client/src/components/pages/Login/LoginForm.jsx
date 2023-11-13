import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import crypto from 'crypto-js';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginThunk,
  logouthThunk,
  refreshThunk,
} from '@/store/authSlice/auth.thunks';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email ingresado no el válido')
    .required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: 'admin@admin',
      password: 'admin',
    },
    validationSchema: validationSchema, // Especificamos el esquema de validación Yup
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleSubmitForm = async (values) => {
    let passwordHash = crypto.SHA512(values.password);
    passwordHash = passwordHash.toString(crypto.enc.Hex);

    const { meta } = await dispatch(
      // loginThunk({ ...values, password: passwordHash })
      loginThunk({ ...values })
    );

    if (meta.requestStatus === 'fulfilled') {
      navigate('/bandeja-denuncias');
    }
  };

  return (
    <div>
      {/* <button
        onClick={() => {
          dispatch(refreshThunk());
        }}
      >
        refresh
      </button>

      <button
        onClick={() => {
          dispatch(logouthThunk());
        }}
      >
        logout
      </button> */}

      {message && (
        <div className='text-center'>
          <Message
            severity={`${message.includes('exitoso') ? 'success' : 'error'}`}
            text={message}
            className='mb-4'
          />
        </div>
      )}
      <div className='mb-6 text-center p-2'>
        <Image src='src/assets/img/mpa-logo-login.png' width='300' />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <label
          htmlFor='email'
          className='text-left block text-900 font-medium mb-2'
        >
          Email
        </label>
        <InputText
          id='email'
          name='email'
          type='text'
          placeholder='Ingrese email'
          className={`w-full mb-3 ${
            formik.touched.email && formik.errors.email ? 'p-invalid' : null
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Añadido el manejo del evento onBlur para marcar el campo como tocado
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? ( // Validar si el campo email ha sido tocado y si hay errores
          <Message
            severity='error'
            text={formik.errors.email}
            className='mb-4'
          />
        ) : null}

        <label
          htmlFor='password'
          className='text-left block text-900 font-medium mb-2'
        >
          Contraseña
        </label>
        <InputText
          id='password'
          name='password'
          type='password'
          placeholder='Ingrese contraseña'
          className={`w-full mb-3 ${
            formik.touched.password && formik.errors.password
              ? 'p-invalid'
              : null
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Añadido el manejo del evento onBlur para marcar el campo como tocado
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? ( // Validar si el campo password ha sido tocado y si hay errores
          <Message
            severity='error'
            text={formik.errors.password}
            className='mb-4'
          />
        ) : null}

        <div className='flex align-items-center justify-content-between mb-6'>
          <a className='font-medium no-underline ml-2 text-lightblue-mpa text-right cursor-pointer'>
            ¿Olvidó su contraseña?
          </a>
        </div>

        <Button
          type='submit'
          label='Iniciar Sesión'
          className='w-full btn-blue-mpa'
          disabled={!formik.isValid} // Deshabilita el botón si el formulario no es válido
        />
      </form>
    </div>
  );
};
