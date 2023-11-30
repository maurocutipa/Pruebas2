import { Formik, Form, Field } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('El campo Tipo es requerido'),
    numero: Yup.string().required('El campo Número es requerido'),
});

const initialValues = {
    tipo: '',
    numero: '',
    observaciones: '',
};

const tipoOptions = [
    { label: 'Pasaporte', value: 'Pasaporte' },
    { label: 'Certificado', value: 'Certificado' },
    { label: 'Certificado de Nacionalidad', value: 'Certificado de Nacionalidad' },
    { label: 'Cuil', value: 'Cuil' },
    { label: 'Cuit', value: 'Cuit' },
    { label: 'Libreta Civica', value: 'Libreta Civica' },
    { label: 'Libreta de Enrolamiento', value: 'Libreta de Enrolamiento' },
    { label: 'Cedula de identidad', value: 'Cedula de identidad' },
    { label: 'DNI', value: 'DNI' },
    { label: 'Otro', value: 'Otro' },
];

export const DocumentacionForm = ({agregarDocumento}) => {

    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario enviado con los siguientes valores:', values);
        agregarDocumento(values);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ dirty, isValid, errors, touched }) => (
                <Form>
                    <div className="grid">
                        <div className="col-6">
                            <label htmlFor="tipo">Tipo de documentación*</label><br />
                            <Field
                                id="tipo"
                                name="tipo"
                                as={Dropdown}
                                options={tipoOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Seleccione el tipo"
                                className={`w-full ${touched.tipo && errors.tipo ? 'p-invalid' : ''}`}
                            />
                            {touched.tipo && errors.tipo && <div className="p-error text-xs">{errors.tipo}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="numero">Número*</label><br />
                            <Field
                                id="numero"
                                name="numero"
                                as={InputText}
                                className={`w-full ${touched.numero && errors.numero ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el número"
                            />
                            {touched.numero && errors.numero && <div className="p-error text-xs">{errors.numero}</div>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="observaciones">Observaciones</label><br />
                            <Field
                                id="observaciones"
                                name="observaciones"
                                as={InputTextarea}
                                className='p-inputtext w-full'
                                placeholder="Agregue observaciones"
                            />
                        </div>
                    </div>

                    <div className="p-fluid">
                        <Button
                            label="Agregar Objeto"
                            type="submit"
                            className="btn-blue-mpa mt-4"
                            disabled={!dirty || !isValid}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default DocumentacionForm;
