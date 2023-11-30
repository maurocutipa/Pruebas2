import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('El campo Tipo de Objeto es requerido'),
    marca: Yup.string().required('El campo Marca es requerido'),
    dominio: Yup.string().required('El campo Dominio es requerido'),
});

const initialValues = {
    tipo: '',
    marca: '',
    modelo: '',
    dominio: '',
    sustraido: false,
    danada: false,
    observaciones: '',
};

export const AutopartesForm = ({agregarAutoparte}) => {
    const [sustraido, setsustraido] = useState(false)
    const [danada, setdanada] = useState(false);

    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario enviado con los siguientes valores:', values);
        resetForm();
        setdanada(false); 
        setsustraido(false); 
        agregarAutoparte(values);
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
                            <label htmlFor="tipo">Tipo de Objeto*</label><br />
                            <Field
                                id="tipo"
                                name="tipo"
                                as={InputText}
                                className={`w-full ${touched.tipoObjeto && errors.tipoObjeto ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el tipo de objeto"
                            />
                            {touched.tipo && errors.tipo && <div className="p-error text-xs">{errors.tipo}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="marca">Marca*</label><br />
                            <Field
                                id="marca"
                                name="marca"
                                as={InputText}
                                className={`w-full ${touched.marca && errors.marca ? 'p-invalid' : ''}`}
                                placeholder="Ingrese la marca"
                            />
                            {touched.marca && errors.marca && <div className="p-error text-xs">{errors.marca}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="modelo">Modelo</label><br />
                            <Field
                                id="modelo"
                                name="modelo"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el modelo del objeto"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="dominio">Dominio*</label><br />
                            <Field
                                id="dominio"
                                name="dominio"
                                as={InputText}
                                className={`w-full ${touched.dominio && errors.dominio ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el dominio del objeto"
                            />
                            {touched.dominio && errors.dominio && <div className="p-error text-xs">{errors.dominio}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="sustraido">Fue sustraída</label><br />
                            <Field
                                id="sustraido"
                                name="sustraido"
                                as={Checkbox}
                                onClick={() => setsustraido(!sustraido)}
                                checked={sustraido}
                                className="ml-8"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="danada">Fue dañada</label><br />
                            <Field
                                id="danada"
                                name="danada"
                                as={Checkbox}
                                onClick={() => setdanada(!danada)}
                                checked={danada}
                                className="ml-8"
                            />
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

export default AutopartesForm;
