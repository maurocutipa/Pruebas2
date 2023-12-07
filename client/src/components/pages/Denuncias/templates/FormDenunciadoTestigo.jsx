import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import MapTemplate from "./MapTemplate";
import * as Yup from 'yup';

// import { getBarrios, getDepartamentos, getLocalidades, getNacionalidades, getProvincias } from "../../../../api/adicional.api";
import { useFormik } from "formik";
import { PersonaDenunciada } from "../../../../models";

export const FormDenunciadoTestigo = (props) => {
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    // const [nacionalidades, setNacionalidades] = useState([]);
    // const [provincias, setProvincias] = useState([]);
    // const [departamentos, setDepartamentos] = useState([]);
    // const [localidades, setLocalidades] = useState([]);
    // const [barrios, setBarrios] = useState([]);

    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
    const tiposDocumentos = ['DNI', 'Pasaporte', 'Cedula', 'Otro'];
    const identidades = ['MUJER', 'HOMBRE', 'MUJER TRANS', 'VARON TRANS', 'PERSONA NO BINARIA', 'OTRO'];
    const tiposPersona = ['Fisica', 'Juridica'];

    //validaciones extras(quitar si no funcionan o dan algun error)
    const validationSchema = Yup.object().shape({
        nombre: Yup.string().min(3,'Es muy corto el nombre.').matches(/^[^0-9]+$/,'No debe contener numeros'),
        apellido: Yup.string().min(3,'Es muy corto el apellido.').matches(/^[^0-9]+$/,'No debe contener numeros'),
        email: Yup.string().email('Email invalido.'),
        numeroIdentificacion: Yup.number().typeError('Debe contener solo numeros.'),
        telefonoFijo: Yup.number().typeError('Debe contener solo numeros.'),
        telefonoMovil: Yup.number().typeError('Debe contener solo numeros.')
    });

    const form = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            apellido: '',
            alias: '',
            tipoIdentificacion: '',
            numeroIdentificacion: '',
            identidadAutopercibida: '',
            fechaNacimiento: '',
            idPais: '',//idPais
            idProvincia: '', //idProvincia
            idLocalidad: '',//idLocalidad
            idBarrio: '',//idBarrio
            domicilio: '',
            latitud: '',
            longitud: '',
            telefonoFijo: '',
            telefonoMovil: '',
            email: '',

            idIntervinienteTipo: 5,
            tipoPersona: "Fisica",
            conocimientoDatosPersonales: 1,
            informacionAdicional: ''
        },
        validate: (data) => {
            let errors = {};

            if (data.conocimientoDatosPersonales == 0) {
                if (!data.informacionAdicional)
                    errors.informacionAdicional = 'La informacion adicional es requerido.';
            } else {
                if(!data.alias && !data.apellido && !data.domicilio && !data.email &&!data.fechaNacimiento && !data.idBarrio &&!data.idLocalidad && !data.idPais &&!data.idProvincia && !data.idbarrio &&!data.identidadAutopercibida && !data.latitud &&!data.longitud && !data.nombre && (!data.numeroIdentificacion || !data.tipoIdentificacion) && !data.telefonoFijo && !data.telefonoMovil ){
                    errors.empty = 'Debe llenar algún campo.';
                }
            }
            return errors;
        },
        validationSchema: validationSchema,
        onSubmit: (data) => {
            //data.fechaNacimiento = new Date(data.fechaNacimiento).toLocaleDateString('en-GB');
            if (props.tipo == 'Denunciado')
                data.idIntervinienteTipo = 5;
            else
                data.idIntervinienteTipo = 9;
            var denTest = new PersonaDenunciada();
            Object.assign(denTest, data);

            if(denTest.conocimientoDatosPersonales==0){
                denTest.alias = undefined;
                denTest.apellido = undefined;
                denTest.domicilio = undefined;
                denTest.email = undefined;
                denTest.fechaNacimiento = undefined;
                denTest.idBarrio = undefined;
                denTest.idLocalidad = undefined;
                denTest.idPais = undefined;
                denTest.idProvincia = undefined;
                denTest.idbarrio = undefined;
                denTest.identidadAutopercibida = undefined;
                denTest.latitud = undefined;
                denTest.longitud = undefined;
                denTest.nombre = undefined;
                denTest.numeroIdentificacion = undefined;
                denTest.telefonoFijo = undefined;
                denTest.telefonoMovil = undefined;
                denTest.tipoIdentificacion = undefined;
            }else{
                //Revisar si los id son '', en caso de que lo sean, no enviarlos al definir undefined
                if (denTest.idPais == '')
                    denTest.idPais = undefined
                if (denTest.idProvincia == '')
                    denTest.idProvincia = undefined
                if (denTest.idLocalidad == '')
                    denTest.idLocalidad = undefined
                if (denTest.idBarrio == '')
                    denTest.idbarrio = undefined

                //Revisar si la provincia es Jujuy, en caso de no serlo, enviar barrio y localidad undefined
                if (denTest.idProvincia != 1) {
                    denTest.idBarrio = undefined
                    denTest.idLocalidad = undefined
                }

                // if (denTest.alias == '')
                //     denTest.alias = undefined
                // if (denTest.email == '')
                //     denTest.email = undefined
                // if (denTest.apellido == '')
                //     denTest.apellido = undefined
                // if (denTest.domicilio == '')
                //     denTest.domicilio = undefined
                // if (denTest.fechaNacimiento == '')
                //     denTest.fechaNacimiento = undefined
                // if (denTest.identidadAutopercibida == '')
                //     denTest.identidadAutopercibida = undefined
                // if (denTest.informacionAdicional == '')
                //     denTest.informacionAdicional = undefined
                // if (denTest.latitud == '')
                //     denTest.latitud = undefined
                // if (denTest.longitud == '')
                //     denTest.longitud = undefined
                // if (denTest.nombre == '')
                //     denTest.nombre = undefined
                // if (denTest.numeroIdentificacion == '')
                //     denTest.numeroIdentificacion = undefined
                // if (denTest.telefonoFijo == '')
                //     denTest.telefonoFijo = undefined
                // if (denTest.telefonoMovil == '')
                //     denTest.telefonoMovil = undefined
                // if (denTest.tipoIdentificacion == '')
                //     denTest.tipoIdentificacion = undefined
            }

            if (denTest.id == '') {
                denTest.id = props.array.length + 1;
                var arr = props.array;
                arr.push(denTest);
                props.setArray(arr);
                // props.setArray([...props.array, denTest]);
            }
            else
                props.setArray(props.array.map(persona => persona.id === data.id ? denTest : persona))
            form.resetForm();
            props.setDialog(false);
        }
    });

    const isFormFieldInvalid = (name) => !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) => {
        if (name.includes('fotosIdentificacion')) {
            if ('fotosIdentificacion' in form.errors) {
                if (form.errors.fotosIdentificacion !== undefined) {
                    if (typeof form.errors.fotosIdentificacion === 'string') {
                        return <small className="p-error">{form.errors['fotosIdentificacion']}</small>;
                    } else if (Array.isArray(form.errors.fotosIdentificacion)) {
                        let index = String(name).slice(9).split(']')[0];
                        if (form.errors.fotosIdentificacion[index] !== undefined) {
                            if (name.includes('size') && 'size' in form.errors.fotosIdentificacion[index]) {
                                return <small className="p-error">&nbsp;{form.errors.fotosIdentificacion[index].size}</small>;
                            }
                            if (name.includes('extension') && 'extension' in form.errors.fotosIdentificacion[index]) {
                                return <small className="p-error">&nbsp;{form.errors.fotosIdentificacion[index].extension}</small>;
                            }
                        }
                    }
                }
            }
        } else {
            if(name==="empty"){
                if(form.errors[name]){
                    return <small className="p-error">{form.errors[name]}</small>;
                }
            }
            return isFormFieldInvalid(name) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
        }
    };

    const changeCoord = (e) => {
        var object = JSON.parse(e)
        form.setFieldValue('latitud', object.lat)
        form.setFieldValue('longitud', object.lng)
    }

    useEffect(() => {
        // getProvincias().then(({ data: { data } }) => {
        //     setProvincias(data);
        // });

        // getNacionalidades().then(({ data: { data } }) => {
        //     setNacionalidades(data);
        // });

        // getDepartamentos().then(({ data: { data } }) => {
        //     setDepartamentos(data);
        // });

        // getLocalidades('').then(({ data: { data } }) => {
        //     setLocalidades(data);
        // });
        // getBarrios('').then(({ data: { data } }) => {
        //     setBarrios(data);
        // });

        form.setValues(props.rowData)
    }, []);

    const campo = (clase, id, name, type, list) => {
        var array = list || [];
        var input = <div></div>
        switch (type) {
            case "Dropdown":
                input = <Dropdown inputId={id} name={id}
                    value={form.values[id]}
                    options={array}
                    placeholder="Selecciona una opcion"
                    onChange={(e) => {
                        form.setFieldValue(id, e.value);
                    }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "DropdownValue":
                input = <Dropdown inputId={id} name={id}
                    value={form.values[id]}
                    optionLabel="name"
                    optionValue="value"
                    options={array}
                    placeholder="Selecciona una opcion"
                    onChange={(e) => {
                        form.setFieldValue(id, e.value);
                    }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "InputText":
                input = <InputText id={id} name={id}
                    value={form.values[id]}
                    onChange={(e) => { form.setFieldValue(id, e.target.value); }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "TextArea":
                input = <InputTextarea
                    id={id} name={id} rows={4} cols={30} value={form.values[id]}
                    onChange={(e) => { form.setFieldValue(id, e.target.value); }}
                    onBlur={form.handleBlur}
                    placeholder='Informacion adicional para identificar a la persona'
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
        }
        return (
            <div className={clase}>
                <label htmlFor={id}>{name}</label>
                {input}
                {getFormErrorMessage(id)}
            </div>
        )
    }

    const denunciadoCompletoPrueba = {
            "id": '',
            "tipoIdentificacion": "DNI",
            "numeroIdentificacion": "12312",
            "nombre": "lucas",
            "apellido": "mesconi",
            "alias": "123123",
            "identidadAutopercibida": "HOMBRE",
            "fechaNacimiento": new Date("2023-11-08T03:00:00.000Z"),
            "idPais": 11,
            "idProvincia": 1,
            "idLocalidad": 3,
            "idBarrio": 2,
            "domicilio": "123123",
            "latitud": -23.083081019494887,
            "longitud": -65.97933712147473,
            "telefonoFijo": "123123",
            "telefonoMovil": "123123123",
            "email": "12312312@123123.com",
            "idIntervinienteTipo": 5,
            "tipoPersona": "Fisica",
            "conocimientoDatosPersonales": 1,
            "informacionAdicional": "123123123123"
    }

    return (
        <form onSubmit={form.handleSubmit} className="px-4 mt-4">
            <h2 className="mt-0 text-center">Datos del {props.tipo}</h2>
            <Button label="denunciado/testigo completo prueba" type="button" onClick={e => { form.setValues(denunciadoCompletoPrueba) }}></Button>
            {/* <Button label="Ver datos" type="button" onClick={e => checkForm()}></Button> */}
            <div className="formgrid grid">
                <div className="field col mb-5">
                    <span className="form-label " htmlFor="conocimientoDatosPersonales">¿Conoce los Datos Personales del {props.tipo}?</span>
                    <SelectButton className="w-full md:w-5 lg:w-3" value={form.values.conocimientoDatosPersonales} onChange={(e) => form.setFieldValue('conocimientoDatosPersonales', e.value)} options={siNo} unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }) }} />
                </div>
            </div>
            {form.values.conocimientoDatosPersonales == 1 &&
                <>
                    {props.tipo == "Denunciado" &&
                        <div className="flex">
                            <div className="flex-grow-1">
                                {campo('field', 'tipoPersona', 'Tipo de Persona', 'Dropdown', tiposPersona)}
                            </div>
                            <div className="flex-none ml-3 mt-5">
                                <Tooltip target=".informacion" />
                                <i className="informacion pi pi-question-circle p-text-secondary p-overlay-badge"
                                    data-pr-tooltip="Persona Fisica: Persona humana, individuo.
                                        
                                        Persona Juridica: Empresa, cooperativa, etc."
                                    data-pr-position="right"
                                    data-pr-at="right+5 top"
                                    data-pr-my="left center-2"
                                    style={{ fontSize: '2rem', cursor: 'pointer' }}>
                                </i>
                            </div>
                        </div>
                    }

                    <div className="formgrid grid">
                        {campo('field col-12 md:col', 'tipoIdentificacion', 'Tipo de Identificacion', 'Dropdown', tiposDocumentos)}
                        {campo('field col-12 lg:col', 'numeroIdentificacion', 'Nº Identificacion', 'InputText', [])}
                    </div>
                    <div className="formgrid grid">
                        {campo('field col-12 md:col-6', 'nombre', 'Nombre', 'InputText', [])}
                        {campo('field col-12 md:col-6', 'apellido', 'Apellido', 'InputText', [])}
                    </div>
                    <div className="formgrid grid">
                        {campo('field col-12 md:col', 'alias', 'Alias', 'InputText', [])}
                        {campo('field col-12 md:col', 'identidadAutopercibida', 'Identidad Autopercibida', 'Dropdown', identidades)}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-12 lg:col">
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                            <Calendar inputId="fechaNacimiento" name="fechaNacimiento"
                                value={form.values.fechaNacimiento} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('fechaNacimiento') })}
                                onChange={(e) => { form.setFieldValue('fechaNacimiento', e.target.value); }} showIcon pt={{ dropdownButton: {root: { className: 'btn-blue-mpa'}}}} />
                            {getFormErrorMessage('fechaNacimiento')}
                        </div>
                        {campo('field col-12 lg:col', 'idPais', 'Nacionalidad', 'DropdownValue', props.nacionalidades)}
                    </div>
                    <div className="formgrid grid">
                        {campo('field col-12 lg:col', 'idProvincia', 'Provincia', 'DropdownValue', props.provincias)}
                    </div>
                    {
                        form.values.idProvincia == 1 &&
                        <div className="formgrid grid">
                            {/* {campo('field col-12 lg:col', 'localidad', 'Localidad', 'DropdownValue', localidades)} */}
                            <div className='field col-12 lg:col'>
                                <label htmlFor="idLocalidad">Localidad</label>
                                <Dropdown inputId="idLocalidad" name='idLocalidad'
                                    value={form.values.idLocalidad}
                                    options={props.localidades}
                                    optionLabel="name"
                                    optionValue="value"
                                    placeholder="Selecciona una opcion"
                                    onChange={(e) => {
                                        var coords;
                                        var localidad = props.localidades.find((localidad) => { return localidad.value == e.value; });
                                        coords = { lat: Number(localidad.latitud), lng: Number(localidad.longitud) };
                                        setCoords(coords);
                                        form.setFieldValue('idLocalidad', e.value);
                                    }}
                                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('idLocalidad') })} />
                                {getFormErrorMessage('idLocalidad')}
                            </div>
                            {campo('field col-12 lg:col', 'idBarrio', 'Barrio', 'DropdownValue', props.barrios)}
                        </div>
                    }
                    <div className="formgrid grid">
                        {campo('field col-12 lg:col', 'domicilio', 'Domicilio', 'InputText', [])}
                        <div className='field col-12'>
                            <h3 htmlFor="georeferencia" className="my-0">Georreferencia</h3>
                            <small>Haga click en el mapa para marcar un punto</small>
                            <MapTemplate changeCoord={changeCoord} center={coords}></MapTemplate>
                        </div>
                    </div>
                    <h2>Datos de Contacto</h2>
                    <div className="formgrid grid">
                        {campo('field col-12 lg:col', 'telefonoFijo', 'Telefono Fijo', 'InputText', [])}
                        {campo('field col-12 lg:col', 'telefonoMovil', 'Telefono Movil', 'InputText', [])}
                        {campo('field col-12 lg:col', 'email', 'Correo Electronico', 'InputText', [])}

                    </div>
                </>
            }
            {campo('field', 'informacionAdicional', 'Informacion Adicional', 'TextArea', [])}
            {getFormErrorMessage('empty')}
            <Button type="submit" className='w-full btn-blue-mpa py-3 mt-6' icon='pi pi-upload' label="Confirmar" />
        </form>
    );
}
