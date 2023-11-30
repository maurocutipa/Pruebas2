import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import React, { useEffect } from 'react'
import { useOtrosFormContext } from '../../../../pages/Denuncia/Denuncia';

export const Danos = ({ }) => {

  const { danos, setDanos, validaDanos} = useOtrosFormContext();

  const formikDanos = useFormik({
    initialValues: {
      tipoDano: [],
      tipoConsecuencia: [],
      consecuenciaDetallesOtro: '',
      pertenencia: ''
    },
    validate: (data) => {
      let errors = {};
      if (data.tipoDano.length == 0) {
        errors.tipoDano = 'Este campo es requerido.';
      }

      if (data.tipoConsecuencia.length == 0) {
        errors.tipoConsecuencia = 'Este campo es requerido.';
      }

      if (isPressedConsecuenciaOtro(data.tipoConsecuencia)) {
        if (!data.consecuenciaDetallesOtro) {
          errors.consecuenciaDetallesOtro = 'Este campo es requerido.';
        }
      }

      if (!data.pertenencia) {
        errors.pertenencia = 'Este campo es requerido.';
      }
      return errors;
    },
  });

  useEffect(() => {
    formikDanos.setValues(danos);
  }, []);

  useEffect(() => {
    const allTouched = {};
    formikDanos.setValues(danos);
    if (validaDanos == true) {
      Object.keys(formikDanos.initialValues).forEach((key) => {
        allTouched[key] = true;
      });
      formikDanos.setTouched(allTouched);
    }
  }, [formikDanos.values, validaDanos]);

  const enviarDatos = (e, campo) => {
    formikDanos.setFieldValue(campo, e.value);
    danos[campo] = e.value;
    setDanos(danos);
    formikDanos.touched[campo] = true;
  }

  const tiposDanos = [
    { label: 'Animal', code: 'danoAnimal' },
    { label: 'Cosa material (auto, teléfono, entre otros)', code: 'danoCosaMaterial' },
    { label: 'Inmueble (edificio, casa, construcción, entre otras)', code: 'danoInmueble' },
    { label: 'Sistema informático, datos o un documento digital', code: 'danoSistemaInformatico' },
  ];

  const tiposConsecuencias = [
    { label: 'Daño o sabotaje informático (borrado de información)', code: 'consecuenciaDano' },
    { label: 'Destrucción', code: 'consecuenciaDestruccion' },
    { label: 'Hacerla desaparecer', code: 'consecuenciaDesaparicion' },
    { label: 'Inutilización', code: 'consecuenciaInutilizacion' },
    { label: 'Dañarla de otro modo', code: 'consecuenciaOtro' },
  ];

  const tiposPertenencias = [
    { label: 'Agresor (parcialmente)', code: 'agresor' },
    { label: 'Bien de uso público (puentes, caminos, biblitecas, entre otros)', code: 'usoPublico' },
    { label: 'Denunciante', code: 'denunciante' },
    { label: 'Tercero', code: 'tercero' },
  ];

  const isFormFieldInvalid = (name) => !!(formikDanos.touched[name] && formikDanos.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formikDanos.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  const isPressedConsecuenciaOtro = (tipoConsecuencia) => {
    let isOtro = false;
    tipoConsecuencia.forEach(consec => {
      if (consec.code == 'consecuenciaOtro') {
        isOtro = true;
      }
    });
    return isOtro;
  }

  // const isPressedConsecuenciaOtro = (tipoConsecuencia) => {
  //   return Array(tipoConsecuencia).some(consec => consec.code === 'consecuenciaOtro');
  // }

  return (
    <div className="formgrid grid">
      <div className="field col-12 lg:col-6">
        <label htmlFor="tipoDano">¿Qué se dañó?</label>
        <MultiSelect
          id='tipoDano'
          name='tipoDano'
          options={tiposDanos}
          value={formikDanos.values.tipoDano}
          onChange={(e) => {
            enviarDatos(e, "tipoDano");
            //formikDanos.setFieldValue('tipoDano', e.value);
          }}
          onBlur={formikDanos.handleBlur}
          optionLabel='label'
          placeholder="Seleccionar"
          className={classNames('w-full', 'mb-3', { 'p-invalid': isFormFieldInvalid('tipoDano') })}
          selectedItemsLabel={`${formikDanos.values.tipoDano ? formikDanos.values.tipoDano.length : ''} Items seleccionados`}
          showSelectAll={false}
          panelHeaderTemplate={<></>}
        />
        {getFormErrorMessage('tipoDano')}
      </div>
      <div className="field col-12 lg:col-6">
        <label htmlFor="tipoConsecuencia">¿Qué consecuencias provocó sobre la cosa dañada?</label>
        <MultiSelect
          id='tipoConsecuencia'
          name='tipoConsecuencia'
          options={tiposConsecuencias}
          value={formikDanos.values.tipoConsecuencia}
          onBlur={formikDanos.handleBlur}
          onChange={(e) => {
            enviarDatos(e, "tipoConsecuencia");
            //formikDanos.setFieldValue('tipoConsecuencia', e.value);
          }}
          optionLabel='label'
          placeholder="Seleccionar"
          className={classNames('w-full', 'mb-3', { 'p-invalid': isFormFieldInvalid('tipoConsecuencia') })}
          selectedItemsLabel={`${formikDanos.values.tipoConsecuencia ? formikDanos.values.tipoConsecuencia.length : ''} Items seleccionados`}
          showSelectAll={false}
          panelHeaderTemplate={<></>}
        />
        {getFormErrorMessage('tipoConsecuencia')}
      </div>
      {
        isPressedConsecuenciaOtro(formikDanos.values.tipoConsecuencia) && (
          <div className="field col-12 lg:col-6">
            <label htmlFor="consecuenciaDetallesOtro">Descripción del daño</label>
            <InputTextarea
              inputid="consecuenciaDetallesOtro"
              name="consecuenciaDetallesOtro"
              rows={4}
              className={classNames('w-full', 'mb-3', { 'p-invalid': isFormFieldInvalid('consecuenciaDetallesOtro') })}
              value={formikDanos.values.consecuenciaDetallesOtro}
              onBlur={formikDanos.handleBlur}
              onChange={(e) => {
                enviarDatos(e, "consecuenciaDetallesOtro");
                //formikDanos.setFieldValue('consecuenciaDetallesOtro', e.target.value);
              }}
              placeholder="Escribe aquí"
            />
            {getFormErrorMessage('consecuenciaDetallesOtro')}
          </div>
        )
      }
      <div className="field col-12 lg:col-6">
        <label htmlFor="descripcionDano">¿A quién pertenece la cosa?</label>
        <Dropdown
          id="pertenencia"
          value={formikDanos.values.pertenencia}
          options={tiposPertenencias}
          onBlur={formikDanos.handleBlur}
          placeholder="Seleccionar"
          onChange={(e) => {
            enviarDatos(e, "pertenencia");
            //formikDanos.setFieldValue('pertenencia', e.value);
          }}
          className={classNames('w-full', 'mb-3', { 'p-invalid': isFormFieldInvalid('pertenencia') })}
        />
        {getFormErrorMessage('pertenencia')}
      </div>
    </div>
  )
}
