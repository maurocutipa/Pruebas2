import { Formik, Form, Field } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { getCelularesMarcas } from '../../../../../../api/objetosPropiedad.api';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object().shape({
    imei: Yup.number(),
    idDenunciaCelularesMarca: Yup.number().required('El campo Marca es requerido'),
    modelo: Yup.string(),
    numero: Yup.number().required('El campo Número es requerido'),
    empresa: Yup.string().required('El campo Empresa es requerido'),
    otro: Yup.string(),
});

const initialValues = {
    imei: '',
    idDenunciaCelularesMarca: '',
    modelo: '',
    numero: '',
    empresa: '',
    otro: '',
};

const empresaOptions = [
    { label: 'Claro', value: 'Claro' },
    { label: 'Movistar', value: 'Movistar' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Tuenti', value: 'Tuenti' },
    { label: 'Otro', value: 'Otro' },
];

export const TelefonoForm = ({ agregarTelefono }) => {

    const [marcas, setmarcas] = useState('')

    const getMarcas = async () => {
        const data = await getCelularesMarcas();
        setmarcas(data.data.data);
    }

    useEffect(() => {   
        getMarcas();
    }, [])

    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario enviado con los siguientes valores:', values);
        agregarTelefono(values);
        resetForm();
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ dirty, isValid, errors, touched }) => (
                    <Form>
                        <div className="grid">
                            <div className="col-6">
                                <label htmlFor="imei">IMEI</label><br />
                                <Field
                                    id="imei"
                                    name="imei"
                                    as={InputText}
                                    type="number"
                                    min={0}
                                    className='p-inputtext w-full'
                                    placeholder="Ingrese codigo IMEI"
                                    onKeyDown={(e) => {
                                        // Evitar la entrada de 'e' y números negativos
                                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>

                            <div className="col-6">
                                <label htmlFor="marca">Marca*</label><br />
                                <Field
                                    id="idDenunciaCelularesMarca"
                                    name="idDenunciaCelularesMarca"
                                    as={Dropdown}
                                    options={marcas}
                                    optionLabel="name"
                                    optionValue="value"
                                    placeholder="Seleccione la marca"
                                    className={`w-full ${touched.idDenunciaCelularesMarca && errors.idDenunciaCelularesMarca ? 'p-invalid' : ''}`}
                                />
                                {touched.idDenunciaCelularesMarca && errors.idDenunciaCelularesMarca && <div className="p-error text-xs">{errors.idDenunciaCelularesMarca}</div>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="modelo">Modelo</label><br />
                                <Field
                                    id="modelo"
                                    name="modelo"
                                    as={InputText}
                                    className='p-inputtext w-full'
                                    placeholder="Ingrese modelo de telefono"
                                />
                            </div>

                            <div className="col-6">
                                <label htmlFor="numero">Número (sin guiones ni puntos)*</label><br />
                                <Field
                                    id="numero"
                                    name="numero"
                                    as={InputText}
                                    className={`p-inputtext w-full ${touched.numero && errors.numero ? 'p-invalid' : ''}`}
                                    type="number"
                                    min={0}
                                    onKeyDown={(e) => {
                                        // Evitar la entrada de 'e' y números negativos
                                        if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="Ingrese su numero"
                                />
                                {touched.numero && errors.numero && <div className="p-error text-xs">{errors.numero}</div>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="empresa">Empresa*</label><br />
                                <Field
                                    id="empresa"
                                    name="empresa"
                                    as={Dropdown}
                                    options={empresaOptions}
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Seleccione su empresa de telefonia"
                                    className={`w-full ${touched.empresa && errors.empresa ? 'p-invalid' : ''}`}
                                />
                                {touched.empresa && errors.empresa && <div className="p-error text-xs">{errors.empresa}</div>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="otro">Otro</label><br />
                                <Field
                                    id="otro"
                                    name="otro"
                                    as={InputText}
                                    className="p-inputtext w-full"
                                    placeholder="Detalle mas informacion"
                                />
                            </div>
                        </div>

                        <div className="p-fluid">
                            <Button
                                label="Agregar Celular"
                                type="submit"
                                className="btn-blue-mpa mt-4"
                                disabled={!dirty || !isValid}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default TelefonoForm;