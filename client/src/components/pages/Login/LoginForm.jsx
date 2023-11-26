import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import crypto from 'crypto-js';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk } from '@/store/auth/auth.thunks';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email ingresado no el válido')
    .required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

export const LoginForm = () => {
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState('password');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: 'sistemas@mpajujuy.gob.ar',
      password: 'password',
    },
    validationSchema: validationSchema, // Especificamos el esquema de validación Yup
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleSubmitForm = async (values) => {
    let passwordHash = crypto.SHA512(values.password);
    passwordHash = passwordHash.toString(crypto.enc.Hex);

    const { meta } = await dispatch(
      loginThunk({ ...values, password: passwordHash })
    );

    if (meta.requestStatus === 'fulfilled') {
      navigate('/bandeja-denuncias');
    }
  };

  const handleShowPassword = () => {
    setChecked(!checked);

    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  return (
    <div>
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
        <div className='grid'>
          <div className='col-12 mb-3'>
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
              className={`w-full ${
                formik.touched.email && formik.errors.email ? 'p-invalid' : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Añadido el manejo del evento onBlur para marcar el campo como tocado
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? ( // Validar si el campo email ha sido tocado y si hay errores
              <InvalidFieldMessage formik={formik} name='email' />
            ) : null}
          </div>

          <div className='col-12'>
            <label
              htmlFor='password'
              className='text-left block text-900 font-medium mb-2'
            >
              Contraseña
            </label>
            <InputText
              id='password'
              name='password'
              type={type}
              placeholder='Ingrese contraseña'
              className={`w-full ${
                formik.touched.password && formik.errors.password
                  ? 'p-invalid'
                  : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Añadido el manejo del evento onBlur para marcar el campo como tocado
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? ( // Validar si el campo password ha sido tocado y si hay errores
              <InvalidFieldMessage formik={formik} name='password' />
            ) : null}

            <div className='flex align-items-center mt-3'>
              <Checkbox onChange={handleShowPassword} checked={checked} />

              <label className='font-semibold ml-2'>Mostrar contraseña</label>
            </div>
          </div>
        </div>

        <div className='flex align-items-center justify-content-end mt-6 mb-4'>
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
