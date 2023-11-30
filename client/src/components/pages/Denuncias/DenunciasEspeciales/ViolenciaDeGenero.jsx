import { Field, Form, Formik, useFormik } from 'formik'
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState } from 'react';

import * as Yup from 'yup';
import { DatosViolenciaGenero } from '../../../../models/DatosViolenciaGenero';
import { Divider } from 'primereact/divider';

export default function ViolenciaDeGenero({ changePaso, setAnexoViolenciaGenero, anexoViolenciaGenero }) {

  const [checked, setChecked] = useState(false);

  const situacion = [
    { label: 'Separación reciente o en trámite de separación', denuncia: 'situacion1' },
    { label: 'Acoso reciente a la víctima o quebrante de la orden de alejamiento', denuncia: 'situacion2' },
  ];

  const tipoViolencia = [
    { label: 'Existencia de violencia física susceptible de causar lesiones', denuncia: 'tipoViolencia1' },
    { label: 'Violencia física en presencia de los hijos u otros familiares', denuncia: 'tipoViolencia2' },
    { label: 'Aumento de la frecuencia y de la gravedad de los incidentes violentos en el último mes', denuncia: 'tipoViolencia3' },
    { label: 'Amenazas graves o de muerte en el último mes', denuncia: 'tipoViolencia4' },
    { label: 'Amenazas con objetos peligrosos o con armas de cualquier tipos', denuncia: 'tipoViolencia5' },
    { label: 'Intención clara de causar lesiones graves o muy graves', denuncia: 'tipoViolencia6' },
    { label: 'Agresiones sexuales en la relación de pareja', denuncia: 'tipoViolencia7' }
  ];

  const perfilAgresor = [
    { label: 'Celos muy intensos o conductas controladoras sobre la pareja', denuncia: 'perfilAgresor1' },
    { label: 'Historial de conductas violentas con una pareja anterior', denuncia: 'perfilAgresor2' },
    { label: 'Historial de conductas violentas con otras personas (amigos, compañeros de trabajo, etc.)', denuncia: 'perfilAgresor3' },
    { label: 'Consumo abusivo de alcohol y/o drogas', denuncia: 'perfilAgresor4' },
    { label: 'Antecedentes de enfermedad mental con abandono de tratamientos psiquiátricos o psicológicos', denuncia: 'perfilAgresor5' },
    { label: 'Conductas de crueldad, de desprecio a la víctima y de falta de arrepentimiento', denuncia: 'perfilAgresor6' },
    { label: 'Justificación de las conductas violentas por su propio estado (alcohol, drogas, estrés) o por la provocación de la víctima', denuncia: 'perfilAgresor7' }
  ];

  const vulnerabilidades = [
    { label: 'Percepción de la víctima de peligro de muerte en el último mes', denuncia: 'vulnerabilidades1' },
    { label: 'Intentos de retirar denuncias previas o de echarse atrás en la decisión de abandonar o denunciar al agresor', denuncia: 'vulnerabilidades2' },
    { label: 'Vulnerabilidad de la víctima por razones de enfermedad, soledad o dependencia', denuncia: 'vulnerabilidades3' },
    { label: 'Depende económicamente la víctima del agresor', denuncia: 'vulnerabilidades4' }
  ];

  const validationSchema = Yup.object().shape({
    //situacion: Yup.array().min(1, 'Selecciona al menos una situación.'),
  });

  const formikViolenciaGenero = useFormik({
    initialValues: {
      situacion: anexoViolenciaGenero.situacion,
      tipoViolencia: anexoViolenciaGenero.tipoViolencia,
      perfilAgresor: anexoViolenciaGenero.perfilAgresor,
      vulnerabilidades: anexoViolenciaGenero.vulnerabilidades,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      var datosViolenciaGenero = new DatosViolenciaGenero();
      Object.assign(datosViolenciaGenero, values);
      resetForm();

      setAnexoViolenciaGenero(datosViolenciaGenero);
      changePaso(5);
    },
  });

  return (
    <>
      <div id='container' className='my-6 px-6'>
        <div className='mx-5 mt-3'>
          <div className=''>
            <h1 className='text-lightblue-mpa'>Anexo de Violencia de Género</h1>
          </div>

          <form onSubmit={formikViolenciaGenero.handleSubmit}>
            <h3 className='form-label mb-4'>Marque lo que corresponda</h3>
            <div className="grid mb-4">
              <div className="field col-12 md:col-6">
                <label htmlFor="situacion">Marque las situaciones en las cuales se encuentre la víctima con respecto a su pareja</label><br />
                <MultiSelect
                  id='situacion'
                  name='situacion'
                  options={situacion}
                  value={formikViolenciaGenero.values.situacion}
                  onChange={(e) => formikViolenciaGenero.setFieldValue('situacion', e.value)}
                  optionLabel='label'
                  placeholder="Seleccionar"
                  className='w-full mb-4'
                  selectedItemsLabel={`${formikViolenciaGenero.values.situacion ? formikViolenciaGenero.values.situacion.length : ''} Items seleccionados`}
                  showSelectAll={false}
                  panelHeaderTemplate={<></>}
                />
                {formikViolenciaGenero.touched.situacion && formikViolenciaGenero.errors.situacion && (
                  <div className="error">{formikViolenciaGenero.errors.situacion}</div>
                )}
              </div>

              <div className="field col-12 md:col-6">
                <label htmlFor="tipoViolencia">Marque los episodios que haya sufrido la víctima</label><br />
                <MultiSelect
                  id='tipoViolencia'
                  name='tipoViolencia'
                  options={tipoViolencia}
                  value={formikViolenciaGenero.values.tipoViolencia}
                  onChange={(e) => formikViolenciaGenero.setFieldValue('tipoViolencia', e.value)}
                  optionLabel='label'
                  placeholder="Seleccionar"
                  maxSelectedLabels={2}
                  selectedItemsLabel={`${formikViolenciaGenero.values.tipoViolencia ? formikViolenciaGenero.values.tipoViolencia.length : ''} Items seleccionados`}
                  showSelectAll={false}
                  className='w-full mb-4'
                  panelHeaderTemplate={<></>}
                />
                {formikViolenciaGenero.touched.tipoViolencia && formikViolenciaGenero.errors.tipoViolencia && (
                  <div className="error">{formikViolenciaGenero.errors.tipoViolencia}</div>
                )}
              </div>
            </div>

            <div className="grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="perfilAgresor">Marque las conductas que posea el agresor</label><br />
                <MultiSelect
                  id='perfilAgresor'
                  name='perfilAgresor'
                  options={perfilAgresor}
                  value={formikViolenciaGenero.values.perfilAgresor}
                  onChange={(e) => formikViolenciaGenero.setFieldValue('perfilAgresor', e.value)}
                  optionLabel='label'
                  placeholder="Seleccionar"
                  maxSelectedLabels={2}
                  selectedItemsLabel={`${formikViolenciaGenero.values.perfilAgresor ? formikViolenciaGenero.values.perfilAgresor.length : ''} Items seleccionados`}
                  showSelectAll={false}
                  className='w-full mb-4'
                  panelHeaderTemplate={<></>}
                />
                {formikViolenciaGenero.touched.perfilAgresor && formikViolenciaGenero.errors.perfilAgresor && (
                  <div className="error">{formikViolenciaGenero.errors.perfilAgresor}</div>
                )}
              </div>

              <div className="field col-12 md:col-6">
                <label htmlFor="vulnerabilidades">Marque las vulnerabilidades que presenta la víctima</label><br />
                <MultiSelect
                  id='vulnerabilidades'
                  name='vulnerabilidades'
                  options={vulnerabilidades}
                  value={formikViolenciaGenero.values.vulnerabilidades}
                  onChange={(e) => formikViolenciaGenero.setFieldValue('vulnerabilidades', e.value)}
                  optionLabel='label'
                  placeholder="Seleccionar"
                  maxSelectedLabels={3}
                  selectedItemsLabel={`${formikViolenciaGenero.values.vulnerabilidades ? formikViolenciaGenero.values.vulnerabilidades.length : ''} Items seleccionados`}
                  showSelectAll={false}
                  className='w-full mb-4'
                  panelHeaderTemplate={<></>}
                />
                {formikViolenciaGenero.touched.vulnerabilidades && formikViolenciaGenero.errors.vulnerabilidades && (
                  <div className="error">{formikViolenciaGenero.errors.vulnerabilidades}</div>
                )}
              </div>
            </div>

            <Divider className="my-6" />

            <div className="grid">
              <div className="col-12 sm:col-5 md:col-4 ">
                <Button
                  className='text-lightblue-mpa w-full py-4'
                  type='button'
                  label='Volver Atrás'
                  link
                  onClick={(e) => changePaso(3)}
                />
              </div>
              <div className="col-12 sm:col-7 md:col-8 ">
                <Button
                  type="submit"
                  className='btn-blue-mpa py-4 w-full'
                  icon='pi pi-chevron-right' iconPos='right'
                  label="Siguiente Paso"
                  disabled={!formikViolenciaGenero.isValid}
                />
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}
