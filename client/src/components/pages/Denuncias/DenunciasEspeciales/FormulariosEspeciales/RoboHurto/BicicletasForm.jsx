import { Formik, Form, Field } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState, useEffect } from 'react';
import { useBicicletasContext} from '../../RoboHurto'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    idDenunciaBicicletasTipo: Yup.number().required('El campo Tipo Bicicleta es requerido'),
    marca: Yup.string().required('El campo Marca es requerido'),
    rodado: Yup.string(),
    numSerie: Yup.string(),
    seguro: Yup.boolean().required('El campo Seguro es requerido'),
    observaciones: Yup.string(),
});

const initialValues = {
    idDenunciaBicicletasTipo: '',
    marca: '',
    rodado: '',
    numSerie: '',
    colorCuadro: '',
    seguro: false,
    observaciones: '',
};

const marcaOptions = [
    { label: 'Trek', value: '1' },
    { label: 'Giant', value: '2' },
    { label: 'Specialized', value: '3' },
    // Agrega más opciones según sea necesario
];

const seguroOptions = [
    { label: 'Sí', value: '1' },
    { label: 'No', value: '0' },
];

export const BicicletasForm = ({agregarBicicleta}) => {
    const { tiposBicicleta } = useBicicletasContext();

    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario enviado con los siguientes valores:', values);
        agregarBicicleta(values);
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
                            <label htmlFor="tipoBicicleta">Tipo de Bicicleta*</label><br />
                            <Field
                                id="idDenunciaBicicletasTipo"
                                name="idDenunciaBicicletasTipo"
                                as={Dropdown}
                                options={tiposBicicleta}
                                optionLabel="name"
                                optionValue="value"
                                placeholder="Seleccione el tipo de bicicleta"
                                className={`w-full ${touched.idDenunciaBicicletasTipo && errors.idDenunciaBicicletasTipo ? 'p-invalid' : ''}`}
                            />
                            {touched.idDenunciaBicicletasTipo && errors.idDenunciaBicicletasTipo && (
                                <div className="p-error text-xs">{errors.idDenunciaBicicletasTipo}</div>
                            )}
                        </div>

                        <div className="col-6">
                            <label htmlFor="marca">Marca*</label><br />
                            <Field
                                id="marca"
                                name="marca"
                                as={InputText}
                                placeholder="Seleccione la marca"
                                className={`w-full ${touched.marca && errors.marca ? 'p-invalid' : ''}`}
                            />
                            {touched.marca && errors.marca && (
                                <div className="p-error text-xs">{errors.marca}</div>
                            )}
                        </div>

                        <div className="col-6">
                            <label htmlFor="rodado">Talle del Rodado</label><br />
                            <Field
                                id="rodado"
                                name="rodado"
                                as={InputText}
                                className={`w-full ${touched.rodado && errors.rodado ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el talle del rodado"
                            />
                            {touched.rodado && errors.rodado && (
                                <div className="p-error text-xs">{errors.rodado}</div>
                            )}
                        </div>

                        <div className="col-6">
                            <label htmlFor="numSerie">Número de Serie</label><br />
                            <Field
                                id="numSerie"
                                name="numSerie"
                                as={InputText}
                                className={`w-full ${touched.numSerie && errors.numSerie ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el número de serie"
                            />
                            {touched.numSerie && errors.numSerie && (
                                <div className="p-error text-xs">{errors.numSerie}</div>
                            )}
                        </div>

                        <div className="col-6">
                            <label htmlFor="colorCuadro">Color del Cuadro</label><br />
                            <Field
                                id="colorCuadro"
                                name="colorCuadro"
                                as={InputText}
                                className='p-inputtext w-full'
                                placeholder="Ingrese el color del cuadro"
                            />
                        </div>

                        <div className="col-6">
                            <label htmlFor="seguro">¿Tiene Seguro?*</label><br />
                            <Field
                                id="seguro"
                                name="seguro"
                                as={Dropdown}
                                options={seguroOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Seleccione una opción"
                                className={`w-full ${touched.seguro && errors.seguro ? 'p-invalid' : ''}`}
                            />
                            {touched.seguro && errors.seguro && (
                                <div className="p-error text-xs">{errors.seguro}</div>
                            )}
                        </div>

                        <div className="col-12">
                            <Field
                                id="observaciones"
                                name="observaciones"
                                as={InputTextarea}
                                className="p-inputtext w-full"
                                placeholder="Agregue información adicional"
                            />
                             <label className='text-sm'>Agregue toda informacion que considere relevante para individualizar la bicicleta, por ejemplo: 
                            marca, de cambios o frenos, si tiene canasto, guardabarros, alforjas, elementos decorativos, etc.</label>
                        </div>
                        
                    </div>

                    <div className="p-fluid">
                        <Button
                            label="Agregar Bicicleta"
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

export default BicicletasForm;