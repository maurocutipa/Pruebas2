import React, { useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { classNames } from "primereact/utils";
import MapTemplate from "./MapTemplate";

import { useEffect } from "react";
import { getBarrios, getDepartamentos, getLocalidades, getNacionalidades, getProvincias } from "../../../../api/adicional.api";
import { useFormik } from "formik";
import { PersonaDenunciante } from "../../../../models";
import { Divider } from "primereact/divider";
import * as Yup from 'yup';

export const FormVictimaDenunciante = (props) => {
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });
    //const [nacionalidades, setNacionalidades] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [barrios, setBarrios] = useState([]);

    const [fotosActuales, setFotosActuales] = useState([]);
    //const [personasDenunciadas, setPersonasDenunciadas] = useState([]);
    //const [personasTestigos, setPersonasTestigos] = useState([]);

    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
    const calidades = [{ name: 'Victima', value: 1 }, { name: 'Denunciante', value: 2 }, { name: 'Victima / Denunciante', value: 3 }];
    const tiposDocumentos = ['DNI', 'Pasaporte', 'Cedula', 'Otro'];
    const identidades = ['MUJER', 'HOMBRE', 'MUJER TRANS', 'VARON TRANS', 'PERSONA NO BINARIA', 'OTRO'];
    const tiposPersona = ['Fisica', 'Juridica'];
    const vinculos = ["Padre", "Madre", "Hijo/a", "Hermano/a", "Pareja", "Ex Pareja", "Familiar", "Compañero", "Otro"]
    const [touchedFiles, setTouchedFiles] = useState(false);

    //validaciones extras(quitar si no funcionan o dan algun error)
    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es requerido').min(3,'Es muy corto el nombre.').matches(/^[^0-9]+$/,'No debe contener numeros'),
        apellido: Yup.string().required('El apellido es requerido').min(3,'Es muy corto el apellido.').matches(/^[^0-9]+$/,'No debe contener numeros'),
        email: Yup.string().email('Email invalido').required('Este campo es requerido'),
        numeroIdentificacion: Yup.number().typeError('Debe contener solo numeros').required('El nro de indentificacion es requerido'),
        telefonoFijo: Yup.number().typeError('Debe contener solo numeros').required('El telefono fijo es requerido'),
        telefonoMovil: Yup.number().typeError('Debe contener solo numeros').required('El telefono movil es requerido')
    });


    const camposDelitoSexual = props.tipo == 6 ? {
        dependeIngresos: '',
        hijosMenores: '',
        riesgoVida: '',
    } : null;

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

            idIntervinienteTipo: '',

            fotosIdentificacion: [],

            tipoPersona: "Fisica",

            //delitoSexual campos
            ...camposDelitoSexual,

            //relacionVictima: {
            conocimientoVictima: 1,
            vinculoVictima: '',
            detalleVinculo: '',
            // }//TODO organizar estructura de la relacion
        },
        validate: (data) => {
            let errors = {};

            if(data.conocimientoVictima==1 && data.idIntervinienteTipo==2){
                if(!data.vinculoVictima){
                    errors.vinculoVictima='El vínculo es requerido';
                }
            }

            if (!data.nombre) {
                errors.nombre = 'El nombre es requerido.';
            }

            if (!data.apellido) {
                errors.apellido = 'El apellido es requerido.';
            }

            if (!data.tipoIdentificacion) {
                errors.tipoIdentificacion = 'El tipo de Identificacion es requerido.';
            }

            if (!data.numeroIdentificacion) {
                errors.numeroIdentificacion = 'El número de la Identificacion es requerido.';
            }

            if (!data.identidadAutopercibida) {
                errors.identidadAutopercibida = 'La identidad Autopercibida es requerida.';
            }

            if (!data.fechaNacimiento) {
                errors.fechaNacimiento = 'La fecha de nacimiento es requerida.';
            }

            if (!data.idPais) {
                errors.idPais = 'La nacionalidad es requerida.';
            }

            if (!data.idProvincia) {
                errors.idProvincia = 'La provincia es requerida.';
            }

            if (!data.idLocalidad) {
                if (data.idProvincia == 'Jujuy' || data.idProvincia == '') {
                    errors.idLocalidad = 'Este campo es requerido.';
                }
            }

            // if (!data.departamento) {
            //     if (data.provincia == 'Jujuy' || data.provincia == '') {
            //         errors.departamento = 'Este campo es requerido.';
            //     }
            // }

            if (!data.idBarrio) {
                if (data.idProvincia == 'Jujuy' || data.idProvincia == '') {
                    errors.idBarrio = 'Este campo es requerido.';
                }
            }

            if (!data.domicilio) {
                errors.domicilio = 'El domicilio es requerida.';
            }

            if (!data.telefonoFijo) {
                errors.telefonoFijo = 'El teléfono fijo es requerido.';
            }

            if (!data.telefonoMovil) {
                errors.telefonoMovil = 'El teléfono móvil es requerido.';
            }

            if (!data.email) {
                errors.email = 'El correo electrónico es requerido.';
            }

            if (!data.idIntervinienteTipo) {
                errors.idIntervinienteTipo = 'La calidad es requerida.';
            }

            if((data.hijosMenores!=0 && data.hijosMenores!=1 && (data.idIntervinienteTipo==1 || data.idIntervinienteTipo==3))  && props.tipo == 6){
                errors.hijosMenores = 'Este campo es requerido';
            }

            if((data.dependeIngresos!=0 && data.dependeIngresos!=1 && (data.idIntervinienteTipo==1 || data.idIntervinienteTipo==3)) && props.tipo == 6){
                errors.dependeIngresos = 'Este campo es requerido';
            }

            if((data.riesgoVida!=0 && data.riesgoVida!=1 && (data.idIntervinienteTipo==1 || data.idIntervinienteTipo==3)) && props.tipo == 6){
                errors.riesgoVida = 'Este campo es requerido';
            }

            //TODO: Check fotos
            if (data.fotosIdentificacion.length != 2) {
                errors.fotosIdentificacion = "Debe subir al menos dos archivos.";
            } else {
                fotosActuales.forEach((file, index) => {
                    const isValidExtension = /\.(jpg|jpeg|png)$/i.test(file.name);
                    const isValidSize = (file.size < 25 * 1024 * 1024);

                    if (!isValidExtension) {
                        if (!errors.fotosIdentificacion) errors.fotosIdentificacion = [];
                        errors.fotosIdentificacion[index] = {
                            extension: "El archivo debe tener una extensión de imagen válida (jpg, jpeg o png)."
                        };
                    }

                    if (!isValidSize) {
                        if (!errors.fotosIdentificacion) errors.fotosIdentificacion = [];
                        errors.fotosIdentificacion[index] = {
                            ...errors.fotosIdentificacion[index],
                            size: "El archivo debe tener un tamaño máximo de 25MB."
                        };
                    }
                });
            }
            //TODO Relacion Victima
            return errors;
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            // data.fechaNacimiento = new Date(data.fechaNacimiento).toLocaleDateString('en-GB');
            var personaDenunciante = new PersonaDenunciante();
            Object.assign(personaDenunciante, data);
            
            if (personaDenunciante.idProvincia != 1){
                personaDenunciante.idBarrio = undefined
                personaDenunciante.idLocalidad = undefined
            }

            var victimas = props.victimas
            var denunciantes = props.denunciantes
            if (personaDenunciante.id == '') {
                personaDenunciante.id = props.size
                if (data.idIntervinienteTipo == 1) {
                    victimas.push(personaDenunciante)
                } else {
                    denunciantes.push(personaDenunciante)
                }
            }
            else {
                var arr = props.denunciantes.concat(props.victimas)
                var personaOldData = arr.find(persona => persona.id === data.id)
                if (personaOldData.idIntervinienteTipo != data.idIntervinienteTipo) {
                    if (personaOldData.idIntervinienteTipo == 1) {
                        victimas = props.victimas.filter(persona => persona.id != data.id)
                        denunciantes.push(personaDenunciante)
                    }
                    else if (data.idIntervinienteTipo == 1) {
                        denunciantes = props.denunciantes.filter(persona => persona.id != data.id)
                        victimas.push(personaDenunciante)
                    }
                    else
                        denunciantes = props.denunciantes.map(persona => persona.id === data.id ? personaDenunciante : persona)
                }
                else {
                    if (data.idIntervinienteTipo == 1)
                        victimas = props.victimas.map(persona => persona.id === data.id ? personaDenunciante : persona)
                    else
                        denunciantes = props.denunciantes.map(persona => persona.id === data.id ? personaDenunciante : persona)
                }
            }
            if (data.idIntervinienteTipo == 2 && data.conocimientoVictima == 0)
                data.vinculoVictima = undefined;
            props.updateTablaDenunciantes(victimas, denunciantes)
            form.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) => {
        if (name.includes('fotosIdentificacion') && isFormFieldInvalid('fotosIdentificacion')) {
            if ('fotosIdentificacion' in form.errors) {
                if (form.errors.fotosIdentificacion !== undefined) {
                    if (typeof form.errors.fotosIdentificacion === 'string') {
                        return <small className="p-error">{form.errors['fotosIdentificacion']}</small>;
                    } else if (Array.isArray(form.errors.fotosIdentificacion)) {
                        let index = String(name).slice(20).split(']')[0];
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
            return isFormFieldInvalid(name) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
        }
    };

    const recorrerArchivos = () => {
        return (
            <>
                {
                    (fotosActuales.length < 2 || fotosActuales.length > 2) &&
                    getFormErrorMessage('fotosIdentificacion')
                }
                <div className='grid'>
                    {fotosActuales.map((archivo, index) => {
                        let size = archivo.size / 1024;
                        return (<div key={index} className='col-12' style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <small>{archivo.name} {size > 1024 ? (size / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB'}.</small>
                            {
                                fotosActuales.length == 2 &&
                                getFormErrorMessage('fotosIdentificacion[' + index + '].size')
                            }
                            {
                                fotosActuales.length == 2 &&
                                getFormErrorMessage('fotosIdentificacion[' + index + '].extension')
                            }
                            <hr></hr>
                        </div>
                        );
                    })}
                </div>
            </>
        );
    }

    const changeCoord = (e) => {
        console.log(e);
        var object = JSON.parse(e)
        form.setFieldValue('latitud', object.lat)
        form.setFieldValue('longitud', object.lng)
    }

    useEffect(() => {
        getProvincias().then(({ data: { data } }) => {
            setProvincias(data);
        });

        getDepartamentos().then(({ data: { data } }) => {
            setDepartamentos(data);
        });

        //ver como editar foto
        console.log(props.rowData);
        if(props.rowData.departamento){
            let dpto = props.rowData.departamento;
            if(props.rowData.idLocalidad){
                getLocalidades(dpto).then(({ data: { data } }) => {
                    setLocalidades(data);
                });
            }
            if(props.rowData.idBarrio){
                getBarrios(dpto).then(({ data: { data } }) => {
                    setBarrios(data);
                });
            }
        }
        form.setValues(props.rowData);
    }, []);

    const handleUpload = (e) => {
        var fotosAntiguas = form.values.fotosIdentificacion

        var fotos = []

        props.fotos.forEach(foto => {
            var encontrada = false;
            fotosAntiguas.forEach(ft => {
                if (foto.id == ft)
                    encontrada = true;
            })
            if (encontrada == false)
                fotos.push(foto)
            //encontrada = false;
        })
        var ids = []

        setFotosActuales(Array.from(e.target.files))

        var idActual = props.idFoto;
        Array.from(e.target.files).forEach(fotoNueva => {
            fotoNueva.id = idActual;
            ids.push(idActual)
            fotos.push(fotoNueva);
            idActual++;
        })
        props.setFotos(fotos)
        props.setIdFoto(idActual);
        form.setFieldValue('fotosIdentificacion', ids);
        setTouchedFiles(true)
    }

    const campo = (clase, id, name, type, list) => {
        var array = list || [];
        var input = <div></div>
        switch (type) {
            case "Dropdown":
                input = <Dropdown inputId={id} name={id}
                    value={form.values[id]}
                    options={array}
                    onBlur={form.handleBlur}
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
                    onBlur={form.handleBlur}
                    placeholder="Selecciona una opcion"
                    onChange={(e) => {
                        if(id=='provincia'){
                            getDepartamentos().then(({ data: { data } }) => {
                                setDepartamentos(data);
                            });
                        }
                        form.setFieldValue(id, e.value);
                    }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "InputText":
                input = <InputText id={id} name={id}
                    value={form.values[id]}
                    onBlur={form.handleBlur}
                    onChange={(e) => { form.setFieldValue(id, e.target.value); }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            /* case "SelectButton":
                input = <SelectButton
                    value={form.values[id]}
                    onChange={(e) => form.setFieldValue(id,e.value)}
                    options={siNo}
                    unselectable={false}
                    pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}
                />
                break; */
        }
        return (
            <div className={clase}>
                <label htmlFor={id}>{name}</label>
                {input}
                {getFormErrorMessage(id)}
            </div>
        )
    }

    const victimaPrueba = (tipoInterviniente)=> {//luego borraaaaaar
        return {
          "id": '',
          "tipoIdentificacion": "DNI",
          "numeroIdentificacion": "44645191",
          "nombre": "Lucas",
          "apellido": "Mesconi",
          "alias": "Lucas",
          "identidadAutopercibida": "HOMBRE",
          "fechaNacimiento": new Date("2002-12-05T03:00:00.000Z"),
          "idPais": 11,
          "idProvincia": 1,
          "idLocalidad": 18,
          "idBarrio": 29,
          "domicilio": "jose marmol 2877",
          "latitud": -24.2072073457456,
          "longitud": -65.26612945908538,
          "telefonoFijo": "1234123",
          "telefonoMovil": "1234123",
          "email": "mesconilucas2877@gmail.com",
          "idIntervinienteTipo": tipoInterviniente,
          "fotosIdentificacion": [
              0
          ],
          "conocimientoVictima": 1,
          "vinculoVictima": "",
          "detalleVinculo": "",
          "tipoPersona": "Fisica",
          "departamento": 2
        }
    }

    const denunciantePrueba = {
            "id": '',
            "tipoIdentificacion": "DNI",
            "numeroIdentificacion": "123123",
            "nombre": "asdasd",
            "apellido": "asdasd",
            "alias": "12312312",
            "identidadAutopercibida": "HOMBRE",
            "fechaNacimiento": new Date("2002-12-05T03:00:00.000Z"),
            "idPais": 11,
            "idProvincia": 1,
            "idLocalidad": 1,
            "idBarrio": 88,
            "domicilio": "123123",
            "latitud": -23.029113246978135,
            "longitud": -66.10474999798961,
            "telefonoFijo": "123123",
            "telefonoMovil": "123123",
            "email": "123123@123123.com",
            "idIntervinienteTipo": 2,
            "fotosIdentificacion": [
                0
            ],
            "conocimientoVictima": 1,
            "vinculoVictima": "Padre",
            "detalleVinculo": "",
            "tipoPersona": "Fisica",
            "departamento": 1
        }
        
    return (
        <form onSubmit={form.handleSubmit} className="px-4">
            <Button label="víctima prueba" type="button" onClick={e => { form.setValues(victimaPrueba(1)) }}></Button>
            <Button label="denunciante prueba" type="button" onClick={e => { form.setValues(denunciantePrueba) }}></Button>
            <Button label="victima/denunciante prueba" type="button" onClick={e => { form.setValues(victimaPrueba(3))}}></Button>
            <h2 className="mt-0 text-center">Datos de las Victimas / Denunciantes</h2>
            {/* <Button label="Ver datos" type="button" onClick={e => checkForm()}></Button> */}
            <div className="formgrid grid">
                {campo('field col-12', 'idIntervinienteTipo', 'Calidad', 'DropdownValue', calidades)}
                {form.values.idIntervinienteTipo == 2 &&
                    <div className="col-12 grid">
                        <div className="field col">
                            <span className="form-label" htmlFor="conocimientoVictima">Conoce A la Victima?</span>
                            <SelectButton className="w-full" value={form.values.conocimientoVictima} onChange={(e) => form.setFieldValue('conocimientoVictima', e.value)} options={siNo} unselectable={false} optionLabel="name" />
                        </div>
                        {form.values.conocimientoVictima == 1 &&
                            <>
                                {campo('field col', 'vinculoVictima', 'Vinculo con la Victima', 'Dropdown', vinculos)}
                                {form.values.vinculoVictima == 'Otro' && campo('field col', 'detalleVinculo', 'Especifique el Vinculo', 'InputText', [])}
                            </>
                        }
                    </div>
                }
            </div>

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
                        onBlur={form.handleBlur}
                        onChange={(e) => { form.setFieldValue('fechaNacimiento', e.target.value); }} showIcon pt={{ dropdownButton: {root: { className: 'btn-blue-mpa'}}}} />
                    {getFormErrorMessage('fechaNacimiento')}
                </div>
                {campo('field col-12 lg:col', 'idPais', 'Nacionalidad', 'DropdownValue', props.nacionalidades)}
            </div>
            <div className="formgrid grid">
                {campo('field col-12 lg:col', 'idProvincia', 'Provincia', 'DropdownValue', provincias)}
                {form.values.idProvincia == 1 &&//
                    <div className="field col-12 lg:col">
                        <label htmlFor="departamento">Departamento</label>
                        <Dropdown inputId="departamento" name='departamento'
                            value={form.values.departamento}
                            options={departamentos}
                            optionLabel="name"
                            optionValue="value"
                            placeholder="Selecciona una opcion"
                            onChange={(e) => {
                                getLocalidades(e.value).then(({ data: { data } }) => {
                                    setLocalidades(data);
                                });
                                getBarrios(e.value).then(({ data: { data } }) => {
                                    setBarrios(data);
                                });
                                form.setFieldValue('departamento', e.value);
                            }}
                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('departamento') })} />
                        {getFormErrorMessage('departamento')}
                    </div>
                }
            </div>
            {
                form.values.idProvincia == 1 &&
                <div className="formgrid grid">
                    {/* {campo('field col-12 lg:col', 'localidad', 'Localidad', 'DropdownValue', localidades)} */}
                    <div className='field col-12 lg:col'>
                        <label htmlFor="idLocalidad">Localidad</label>
                        <Dropdown inputId="idLocalidad" name='idLocalidad'
                            value={form.values.idLocalidad}
                            options={localidades}
                            optionLabel="name"
                            optionValue="value"
                            placeholder="Selecciona una opcion"
                            onChange={(e) => {
                                var coords;
                                console.log(e.value);
                                var localidad = localidades.find((localidad) => { return localidad.value == e.value; });
                                console.log(localidad);
                                coords = { lat: Number(localidad.latitud), lng: Number(localidad.longitud) };
                                setCoords(coords);
                                form.setFieldValue('idLocalidad', e.value);
                            }}
                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('idLocalidad') })} />
                        {getFormErrorMessage('idLocalidad')}
                    </div>
                    {campo('field col-12 lg:col', 'idBarrio', 'Barrio', 'DropdownValue', barrios)}
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
            <div className="field">
                <span className="form-label">Fotos DNI</span>
                <div style={{ position: "relative" }} >
                    <label htmlFor="file" className={classNames({ 'file-style': form.values.fotosIdentificacion.length > 0 || touchedFiles == false, 'file-style-invalid': touchedFiles == true && form.values.fotosIdentificacion.length == 0 })}>
                        <i className="pi pi-cloud-upload text-5xl"></i>
                        <p>Arrastre o Haga click para subir Archivos</p>
                    </label>
                    <input id="file" type='file' multiple onClick={e => setTouchedFiles(true)}
                        onChange={(e) => { handleUpload(e) }}></input>
                </div>
                <div className='mt-3 mb-5'>
                    {recorrerArchivos()}
                </div>
            </div>

            <h2>Datos de Contacto</h2>
            <div className="formgrid grid">
                {campo('field col-12 lg:col', 'telefonoFijo', 'Telefono Fijo', 'InputText', [])}
                {campo('field col-12 lg:col', 'telefonoMovil', 'Telefono Movil', 'InputText', [])}
                {campo('field col-12 lg:col', 'email', 'Correo Electronico', 'InputText', [])}
            </div>

            {
                props.tipo == 6 && (form.values.idIntervinienteTipo == 1  || form.values.idIntervinienteTipo == 3)  && (
                    <>
                        <Divider/>
                        <div className="formgrid grid">
                            <div className="field col-12 lg:col-4">
                                <span className="form-label" htmlFor="dependeIngresos">¿Depende de los ingresos que le aporta el autor del hecho para subsistir?</span>
                                <SelectButton className="field col-12 lg:col" value={form.values.dependeIngresos} onChange={(e) => form.setFieldValue('dependeIngresos', e.value)} options={siNo} unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}/>
                            </div>
                            <div className="field col-12 lg:col-4">
                                <span className="form-label" htmlFor="hijosMenores">¿Tiene hijos menores de edad?</span>
                                <SelectButton className="field col-12 lg:col" value={form.values.hijosMenores} onChange={(e) => form.setFieldValue('hijosMenores', e.value)} options={siNo} unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}/>
                            </div>
                            <div className="field col-12 lg:col-4">
                                <span className="form-label" htmlFor="riesgoVida">¿Considera que se encuentra en riesgo de vida?</span>
                                <SelectButton className="field col-12 lg:col" value={form.values.riesgoVida} onChange={(e) => form.setFieldValue('riesgoVida', e.value)} options={siNo} unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}/>
                            </div>
                        </div>
                    </>
                )
            }
            

            <Button type="submit" className='w-full btn-blue-mpa py-3 mt-6' icon='pi pi-upload' label="Confirmar" 
                /* onClick={(e)=>setTimeout(
                    function () {
                    console.log(Object.keys(form.errors)[0]);
                    const element = document.getElementById(Object.keys(form.errors)[0]);
                    if(element) element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                }, 100)} si hay errores hace un scroll hacia el primer campo que tenga un error(faltaria cambiar ids de los campos)*/
            />
        </form>
    );
}
