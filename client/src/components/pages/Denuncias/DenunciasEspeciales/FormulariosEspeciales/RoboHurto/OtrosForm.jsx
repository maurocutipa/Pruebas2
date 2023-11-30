import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('El campo Tipo es requerido'),
});

const initialValues = {
    tipo: '',
    observaciones: '',
};

export const OtrosForm = ({agregarOtro}) => {
    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario de Otros enviado con los siguientes valores:', values);
        agregarOtro(values);
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
                        <div className="col-12">
                            <label htmlFor="tipo">Tipo de Objeto *</label><br />
                            <Field
                                id="tipo"
                                name="tipo"
                                as={InputText}
                                className={`w-full ${touched.tipo && errors.tipo ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el tipo"
                            />
                            {touched.tipo && errors.tipo && <div className="p-error text-xs">{errors.tipo}</div>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="observaciones">Observaciones</label><br />
                            <Field
                                id="observaciones"
                                name="observaciones"
                                as={InputTextarea}
                                className="w-full"
                                placeholder="Agregue observaciones"
                            />
                        </div>
                    </div>

                    <div className="p-fluid">
                        <Button
                            label="Agregar Otro"
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

export default OtrosForm;
