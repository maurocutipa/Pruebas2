import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react'

import * as Yup from 'yup';
import { AnimalesTable } from './TablasEspeciales/AnimalesTable';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

export const Abigeato = ({ abigeato, setAbigeato }) => {

  const [violenciaFisica, setViolenciaFisica] = useState(1);
  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    setViolenciaFisica(abigeato.violenciaFisica);
    setAnimales(abigeato.animales);
  }, [])

  //Operaciones con Animales
  const agregarAnimal = (animal) => {
    const auxAnimales = [...animales];
    auxAnimales.push(animal);
    setAnimales(auxAnimales);
    setAbigeato({ ...abigeato, animales: auxAnimales });
    formikAnimal.resetForm();
  };
  const eliminarAnimal = (animal) => {
    const animalesActualizados = animales.filter((t) => t !== animal);
    setAnimales(animalesActualizados);
    setAbigeato({ ...abigeato, animales: animalesActualizados })
  };

  const formikAnimal = useFormik({
    initialValues: {
      idDenunciaAbigeatoDetallesEspecies: '',
      cantidad: 1,
      detalle: '',
    },
    validationSchema: Yup.object().shape({
      idDenunciaAbigeatoDetallesEspecies: Yup.object().required('El campo Especie es requerido'),
      detalle: Yup.string().required("El campo Descripcion es requerido"),
      cantidad: Yup.number().required("El campo Cantidad es requerido")
    }),
    onSubmit: (values, { resetForm }) => {
      // Aquí puedes manejar la lógica para enviar los datos del formulario.
      console.log('Formulario enviado con los siguientes valores:', values);
      agregarAnimal(values);
      resetForm();
    },
  });

  const siNo = [
    { label: 'SI', code: 1 },
    { label: 'NO', code: 0 }
  ];

  const tiposEspecies = [
    { label: 'ASNAL', code: 1 },
    { label: 'AVES', code: 2 },
    { label: 'BOVINOS', code: 3 },
    { label: 'CAPRINOS', code: 4 },
    { label: 'CONEJOS', code: 5 },
    { label: 'EQUINOS', code: 6 },
    { label: 'MULAR', code: 7 },
    { label: 'OVINOS', code: 8 },
    { label: 'PORCINOS', code: 9 },
    { label: 'OTRAS ESPECIES', code: 10 },
  ];

  const isFormFieldInvalid = (name) => !!(formikAnimal.touched[name] && formikAnimal.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formikAnimal.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <>
      <div>
        <div className="field col-12 ">{/* lg:col-6 */}
          <label htmlFor="violenciaFisica">¿Existió violencia física o daños materiales?</label>
          <Dropdown
            id="violenciaFisica"
            value={violenciaFisica}
            options={siNo}
            optionValue='code'
            placeholder="Seleccione"
            onChange={(e) => {
              console.log(violenciaFisica);
              setViolenciaFisica(e.value);
              setAbigeato({ ...abigeato, violenciaFisica: e.value });
            }}
            className="w-full"
          />
        </div>
        <h3 className='text-lightblue-mpa text-4xl'>Datos de los animales sustraídos</h3>

        <div className="formgrid grid">
          <div className="field col-12 lg:col-6">{/*  */}
            <label htmlFor="idDenunciaAbigeatoDetallesEspecies">Especie</label>
            <Dropdown
              id="idDenunciaAbigeatoDetallesEspecies"
              value={formikAnimal.values.idDenunciaAbigeatoDetallesEspecies}
              options={tiposEspecies}
              className={classNames('w-full',{ 'p-invalid': isFormFieldInvalid('idDenunciaAbigeatoDetallesEspecies') })}
              placeholder="Seleccione"
              onChange={(e) => {
                formikAnimal.setFieldValue('idDenunciaAbigeatoDetallesEspecies', e.value);
              }}
            />
            {getFormErrorMessage('idDenunciaAbigeatoDetallesEspecies')}
          </div>

          <div className="field col-12 lg:col-6">
            <label htmlFor="cantidad">Cantidad</label>
            <InputNumber
              inputId="cantidad"
              name="cantidad"
              value={formikAnimal.values.cantidad}
              onValueChange={(e) => {
                formikAnimal.setFieldValue('cantidad', e.value);
              }}
              useGrouping={false}
              inputClassName={classNames({ 'p-invalid': isFormFieldInvalid('cantidad') })}
              className='w-full'
              pt={{
                input: {
                  root: { autoComplete: 'off' }
                }
              }}
            />
            {getFormErrorMessage('cantidad')}
          </div>

          <div className="field col-12 ">
            <label htmlFor="detalle">Descripción, marcas o señas particulares de los animales (Pelaje, Sexo, Raza, Cicatrices o Marcas)</label>
            <InputTextarea
              inputid="detalle"
              name="detalle"
              rows={4}
              // cols={30}
              className={classNames('w-full',{ 'p-invalid': isFormFieldInvalid('detalle') })}
              value={formikAnimal.values.detalle}
              onChange={(e) => {
                formikAnimal.setFieldValue('detalle', e.target.value);
              }}
            />
            {getFormErrorMessage('detalle')}
          </div>

          <Button type="button" label="Agregar Animales" icon="pi pi-plus" onClick={(e) => formikAnimal.submitForm()} className="btn-blue-mpa w-full"/>

        </div>

        {
          animales.length != 0 ? (
            <div className="mt-6">
              <h3>Lista de animales</h3>
              <AnimalesTable animales={animales} eliminarAnimal={eliminarAnimal} />
            </div>
          )
            : null
        }
      </div>
    </>
  )
}
