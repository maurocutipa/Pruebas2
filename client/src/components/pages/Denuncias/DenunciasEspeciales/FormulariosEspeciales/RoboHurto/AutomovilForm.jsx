import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { getAutomovilesTipos, getAutomovilesMarcas } from '../../../../../../api/objetosPropiedad.api';
import { useEffect } from 'react';

import * as Yup from 'yup';

export const AutomovilForm = ({ agregarAutomovil, tipoDenuncia }) => {

    const validationSchema = Yup.object().shape({
        idDenunciaAutomovilesTipo: Yup.number().required('El campo Tipo automóvil es requerido'),
        idDenunciaAutomovilesMarca: Yup.number().required('El campo marca es requerido'),
        modelo: Yup.string(),
        dominio: Yup.string().required('El campo Dominio es requerido'),
        anioFabricacion: Yup.number()
            .typeError('El año de fabricación debe ser un número')
            .min(1900, 'El año de fabricación debe ser mayor o igual a 1900')
            .max(2300, 'El año de fabricación debe ser menor o igual a 2300'),
        numMotor: Yup.string(),
        numChasis: Yup.string(),
        puertas: Yup.number()
            .typeError('El número de puertas debe ser un número')
            .integer('El número de puertas debe ser un número entero')
            .min(1, 'El número de puertas debe ser mayor o igual a 1')
            .max(10, 'El número de puertas debe ser menor o igual a 10'),
        titular: Yup.string(),
        color: Yup.string(),
        gnc: Yup.boolean(),
        observaciones: Yup.string(),
        empresaSeguro: Yup.string(),
        numeroSeguro: Yup.number()
    });

    const initialValues = {
        idDenunciaAutomovilesTipo: '',
        idDenunciaAutomovilesMarca: '',
        modelo: '',
        dominio: '',
        anioFabricacion: '',
        numMotor: '',
        numChasis: '',
        puertas: '',
        titular: '',
        color: '',
        gnc: false,
        observaciones: '',
        empresaSeguro: '',
        numeroSeguro: ''
    };



    const [tiposAutomovil, setTiposAutomovil] = useState('')
    const [marcasAutomovil, setMarcasAutomovil] = useState('')

    const getTipos = async () => {
        const data = await getAutomovilesTipos();
        setTiposAutomovil(data.data.data);
        console.log(data)
    }

    useEffect(() => {
        getTipos();
    }, [])

    const getMarcas = async () => {
        const data = await getAutomovilesMarcas();
        setMarcasAutomovil(data.data.data);
        console.log(data)
    }

    useEffect(() => {
        getMarcas();
    }, [])

    const [checked, setChecked] = useState(false);

    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario enviado con los siguientes valores:', values);
        agregarAutomovil(values)
        setChecked(false);
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
                            <label htmlFor="idDenunciaAutomovilesTipo">Tipo Automóvil*</label><br />
                            <Field
                                id="idDenunciaAutomovilesTipo"
                                name="idDenunciaAutomovilesTipo"
                                as={Dropdown}
                                options={tiposAutomovil}
                                optionLabel="name"
                                optionValue="value"
                                placeholder="Seleccione el tipo de automóvil"
                                className={`w-full ${touched.idDenunciaAutomovilesTipo && errors.idDenunciaAutomovilesTipo ? 'p-invalid' : ''}`}
                            />
                            {touched.idDenunciaAutomovilesTipo && errors.idDenunciaAutomovilesTipo && <div className="p-error text-xs">{errors.idDenunciaAutomovilesTipo}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="idDenunciaAutomovilesMarca">Marca*</label><br />
                            <Field
                                id="idDenunciaAutomovilesMarca"
                                name="idDenunciaAutomovilesMarca"
                                as={Dropdown}
                                options={marcasAutomovil}
                                optionLabel="name"
                                optionValue="value"
                                placeholder="Seleccione la idDenunciaAutomovilesMarca"
                                className={`w-full ${touched.idDenunciaAutomovilesMarca && errors.idDenunciaAutomovilesMarca ? 'p-invalid' : ''}`}
                            />
                            {touched.idDenunciaAutomovilesMarca && errors.idDenunciaAutomovilesMarca && <div className="p-error text-xs">{errors.idDenunciaAutomovilesMarca}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="modelo">Modelo</label><br />
                            <Field
                                id="modelo"
                                name="modelo"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el modelo del automóvil"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="dominio">Dominio*</label><br />
                            <Field
                                id="dominio"
                                name="dominio"
                                as={InputText}
                                className={`w-full ${touched.dominio && errors.dominio ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el dominio del automóvil"
                            />
                            {touched.dominio && errors.dominio && <div className="p-error text-xs">{errors.dominio}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="anioFabricacion">Año de Fabricación</label><br />
                            <Field
                                id="anioFabricacion"
                                name="anioFabricacion"
                                as={InputText}
                                type="number"
                                onKeyDown={(e) => {
                                    // Evitar la entrada de 'e' y números negativos
                                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                className={`w-full ${touched.anioFabricacion && errors.anioFabricacion ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el año de fabricación"
                            />
                            {touched.anioFabricacion && errors.anioFabricacion && <div className="p-error text-xs">{errors.anioFabricacion}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="numMotor">Número de Motor</label><br />
                            <Field
                                id="numMotor"
                                name="numMotor"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el número de motor"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="numChasis">Número de Chasis</label><br />
                            <Field
                                id="numChasis"
                                name="numChasis"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el número de chasis"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="puertas">Número de Puertas</label><br />
                            <Field
                                id="puertas"
                                name="puertas"
                                as={InputText}
                                type="number"
                                min="0"
                                max="10"
                                onKeyDown={(e) => {
                                    // Evitar la entrada de 'e' y números negativos
                                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                className={`w-full ${touched.puertas && errors.puertas ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el número de puertas"
                            />
                            {touched.puertas && errors.puertas && <div className="p-error text-xs">{errors.puertas}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="titular">Titular</label><br />
                            <Field
                                id="titular"
                                name="titular"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el titular del automóvil"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="color">Color</label><br />
                            <Field
                                id="color"
                                name="color"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el color del automóvil"
                            />
                        </div>
    
                        <div className="col-6">
                            <label htmlFor="empresaSeguro">Empresa Aseguradora</label><br />
                            <Field
                                id="empresaSeguro"
                                name="empresaSeguro"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese la empresa aseguradora del automóvil"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="numeroSeguro">Número de Seguro</label><br />
                            <Field
                                id="numeroSeguro"
                                name="numeroSeguro"
                                as={InputText}
                                type="number"
                                min="0"
                                onKeyDown={(e) => {
                                    // Evitar la entrada de 'e' y números negativos
                                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                className={`w-full ${touched.numeroSeguro && errors.numeroSeguro ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el número de seguro"
                            />
                            {touched.numeroSeguro && errors.numeroSeguro && <div className="p-error text-xs">{errors.numeroSeguro}</div>}
                        </div>
                             

                        <div className="col-6">
                            <label htmlFor="gnc">¿Tenía Equipo de GNC?</label><br />
                            <Field
                                id="gnc"
                                name="gnc"
                                as={Checkbox}
                                onClick={() => setChecked(!checked)}
                                checked={checked}
                                className="ml-8"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="observaciones">Observaciones</label><br />
                            <Field
                                id="observaciones"
                                name="observaciones"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Agregue observaciones"
                            />
                        </div>
                    </div>

                    <div className="p-fluid">
                        <Button
                            label="Agregar Automovil"
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

export default AutomovilForm;