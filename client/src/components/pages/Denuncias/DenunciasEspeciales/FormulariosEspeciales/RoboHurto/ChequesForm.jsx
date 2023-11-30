import { Formik, Form, Field } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('El campo Tipo es requerido'),
    banco: Yup.string().required('El campo Banco Emisor es requerido'),
    sucursal: Yup.string().required('El campo Sucursal es requerido'),
    titularCuenta: Yup.string().required('El campo Titular de Cuenta es requerido'),
    numeroCuenta: Yup.string().required('El campo Número de Cuenta es requerido'),
    numeroCheque: Yup.number().required('El campo Número de Cheque es requerido'),
});

const initialValues = {
    tipo: '',
    banco: '',  // Cambiado a string para utilizar un campo de selección (dropdown)
    sucursal: '',
    titularCuenta: '',
    numeroCuenta: '',
    numeroCheque: '',
    observaciones: '',
};

const tipoOptions = [
    { label: 'Cancelatorio', value: 'Cancelatorio' },
    { label: 'Certificado - Conformado', value: 'Certificado - Conformado' },
    { label: 'Cruzado', value: 'Cruzado' },
    { label: 'De Caja', value: 'De Caja' },
    { label: 'De Viajero', value: 'De Viajero' },
    { label: 'En Blanco', value: 'En Blanco' },
    { label: 'Otro', value: 'Otro' },
    { label: 'Pago Diferido', value: 'Pago Diferido' },
    { label: 'Para Abono en Cuenta', value: 'Para Abono en Cuenta' }
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
    // Agrega más opciones de banco según sea necesario
];

export const ChequesForm = ({agregarCheque}) => {
    const onSubmit = (values, { resetForm }) => {
        // Aquí puedes manejar la lógica para enviar los datos del formulario.
        console.log('Formulario de Cheques enviado con los siguientes valores:', values);
        agregarCheque(values); 
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
                            <label htmlFor="tipo">Tipo de Cheque*</label><br />
                            <Field
                                id="tipo"
                                name="tipo"
                                as={Dropdown}
                                options={tipoOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Seleccione el tipo de cheque"
                                className={`w-full ${touched.tipo && errors.tipo ? 'p-invalid' : ''}`}
                            />
                            {touched.tipo && errors.tipo && <div className="p-error text-xs">{errors.tipo}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="banco">Banco*</label><br />
                            <Field
                                id="banco"
                                name="banco"
                                as={Dropdown}  // Cambiado a un campo de selección (Dropdown)
                                options={bancoOptions}  // Opciones de banco
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Seleccione el banco emisor"  // Texto de marcador de posición
                                className={`w-full ${touched.banco && errors.banco ? 'p-invalid' : ''}`}
                            />
                            {touched.banco && errors.banco && <div className="p-error text-xs">{errors.banco}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="sucursal">Sucursal*</label><br />
                            <Field
                                id="sucursal"
                                name="sucursal"
                                as={InputText}
                                className={`w-full ${touched.sucursal && errors.sucursal ? 'p-invalid' : ''}`}
                                placeholder="Ingrese la sucursal"
                            />
                            {touched.sucursal && errors.sucursal && <div className="p-error text-xs">{errors.sucursal}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="titularCuenta">Titular de la Cuenta*</label><br />
                            <Field
                                id="titularCuenta"
                                name="titularCuenta"
                                as={InputText}
                                className={`w-full ${touched.titularCuenta && errors.titularCuenta ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el titular de la cuenta"
                            />
                            {touched.titularCuenta && errors.titularCuenta && <div className="p-error text-xs">{errors.titularCuenta}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="numeroCuenta">N° de Cuenta*</label><br />
                            <Field
                                id="numeroCuenta"
                                name="numeroCuenta"
                                as={InputText}
                                className={`w-full ${touched.numeroCuenta && errors.numeroCuenta ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el número de cuenta"
                            />
                            {touched.numeroCuenta && errors.numeroCuenta && <div className="p-error text-xs">{errors.numeroCuenta}</div>}
                        </div>

                        <div className="col-6">
                            <label htmlFor="numeroCheque">N° de Cheque*</label><br />
                            <Field
                                id="numeroCheque"
                                name="numeroCheque"
                                type="number"
                                onKeyDown={(e) => {
                                    // Evitar la entrada de 'e' y números negativos
                                    if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                as={InputText}
                                className={`w-full ${touched.numeroCheque && errors.numeroCheque ? 'p-invalid' : ''}`}
                                placeholder="Ingrese el número de cheque"
                            />
                            {touched.numeroCheque && errors.numeroCheque && <div className="p-error text-xs">{errors.numeroCheque}</div>}
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
                            label="Agregar Cheque"
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

export default ChequesForm;
