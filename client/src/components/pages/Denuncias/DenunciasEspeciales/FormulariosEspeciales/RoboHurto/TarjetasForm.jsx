import { Formik, Form, Field } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('El campo Tipo es requerido'),
    banco: Yup.string().required('El campo Banco Emisor es requerido'),
    numero: Yup.number()
        .required('El campo Número es requerido')
});

const initialValues = {
    tipo: '',
    banco: '',  // Cambiado a string para utilizar un campo de selección (dropdown)
    numero: '',
    observaciones: '',
};

const tipoOptions = [
    { label: 'Tarjeta de Credito', value: 'Credito' },
    { label: 'Tarjeta de Debito', value: 'Debito' }
];

const bancoOptions = [
    { label: 'Macro', value: 'Macro' },
    { label: 'Santander', value: 'Santander' },
    { label: 'Galicia', value: 'Galicia' },
    { label: 'Naranja', value: 'Naranja' }, 
    { label: 'Nacion', value: 'Nacion' }, 
    { label: 'Patagonia', value: 'Patagonia' }, 
    { label: 'ICBC', value: 'ICBC' }, 
    { label: 'HSBC', value: 'HSBC' }

    // Agrega más opciones según sea necesario
];

export const TarjetasForm = ({ agregarTarjeta }) => {
    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario enviado con los siguientes valores:', values);
        agregarTarjeta(values);
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
                            <label htmlFor="tipo">Tipo de Tarjeta*</label><br />
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
                            <label htmlFor="banco">Banco Emisor*</label><br />
                            <Field
                                id="banco"
                                name="banco"
                                as={Dropdown}  // Cambiado a un campo de selección (Dropdown)
                                options={bancoOptions}  // Opciones de banco
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Seleccione el banco"  // Texto de marcador de posición
                                className={`w-full ${touched.banco && errors.banco ? 'p-invalid' : ''}`}
                            />
                            {touched.banco && errors.banco && <div className="p-error text-xs">{errors.banco}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="numero">Número*</label><br />
                            <Field
                                id="numero"
                                name="numero"
                                as={InputText}
                                type="number"
                                onKeyDown={(e) => {
                                    // Evitar la entrada de 'e' y números negativos
                                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
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
                                className="w-full"
                                placeholder="Agregue observaciones"
                            />
                        </div>
                    </div>

                    <div className="p-fluid">
                        <Button
                            label="Agregar Tarjeta"
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

export default TarjetasForm;
