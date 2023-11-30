import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha"
import MapView from './pages/Denuncias/templates/MapView';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { crearDenuncia } from '../api/denuncias.api'

export default function FormularioDenunciante(props) {
    const [dialogEnviando, setDialogEnviando] = useState(false);
    const [hasId, setHasId] = useState(false);
    const [responseDenuncia, setResponseDenuncia] = useState({ nroDenuncia: 0, email: '' });
    const [response, setResponse] = useState(null);
    const [denunciantes, setDenunciantes] = useState([]);
    const recaptchaRef = React.createRef();
    const toast = useRef(null);


    //https://www.google.com/recaptcha/api/siteverify
    useEffect(() => {
        
        // props.setDenunciantes([
        //     {
        //         "id": 0,
        //         "tipoDocumento": "DNI",
        //         "tipoDocumentoOtro": "",
        //         "nroDocumento": "4234234",
        //         "nombre": "Marcos Tadeo",
        //         "apellido": "Rosales",
        //         "alias": "Picante",
        //         "identidad": "HOMBRE",
        //         "fechaNacimiento": "24/03/2003",
        //         "nacionalidad": "Argentino/a",
        //         "barrio": "Alto Gorriti",
        //         "localidad": "Abra Pampa",
        //         "direccion": "Iriarte 153",
        //         "latitudHecho": -24.186148060260322,
        //         "longitudHecho": -65.30016952003022,
        //         "telefonoFijo": "38842342342",
        //         "telefonoMovil": "38842342342",
        //         "email": "marcostadeorosales@gmail.com",
        //         "calidad": "Victima",
        //         "fotosDni": [
        //         ],
        //         "provincia": "Jujuy"
        //     },
        //     {
        //         "id": 2,
        //         "tipoDocumento": "DNI",
        //         "tipoDocumentoOtro": "",
        //         "nroDocumento": "4234234",
        //         "nombre": "Marcos Tadeo",
        //         "apellido": "Rosales",
        //         "alias": "Picante",
        //         "identidad": "HOMBRE",
        //         "fechaNacimiento": "24/03/2003",
        //         "nacionalidad": "Argentino/a",
        //         "barrio": "Alto Gorriti",
        //         "localidad": "Abra Pampa",
        //         "direccion": "Iriarte 153",
        //         "latitudHecho": -24.186148060260322,
        //         "longitudHecho": -65.30016952003022,
        //         "telefonoFijo": "38842342342",
        //         "telefonoMovil": "38842342342",
        //         "email": "marcostadeorosales@gmail.com",
        //         "calidad": "Denunciante",
        //         "fotosDni": [
        //         ],
        //         "provincia": "Jujuy"
        //     },
        //     {
        //         "id": 3,
        //         "tipoDocumento": "DNI",
        //         "tipoDocumentoOtro": "",
        //         "nroDocumento": "4234234",
        //         "nombre": "Marcos Tadeo",
        //         "apellido": "Rosales",
        //         "alias": "Picante",
        //         "identidad": "HOMBRE",
        //         "fechaNacimiento": "24/03/2003",
        //         "nacionalidad": "Argentino/a",
        //         "barrio": "Alto Gorriti",
        //         "localidad": "Abra Pampa",
        //         "direccion": "Iriarte 153",
        //         "latitudHecho": -24.186148060260322,
        //         "longitudHecho": -65.30016952003022,
        //         "telefonoFijo": "38842342342",
        //         "telefonoMovil": "38842342342",
        //         "email": "marcostadeorosales@gmail.com",
        //         "calidad": "Victima / Denunciante",
        //         "fotosDni": [
        //         ],
        //         "provincia": "Jujuy"
        //     },
        // ])

        // props.setTestigos([
        //     {
        //         "id": 0,
        //         "tipoDocumento": "DNI",
        //         "tipoDocumentoOtro": "",
        //         "nroDocumento": "4234234",
        //         "nombre": "testigculo",
        //         "apellido": "Rosales",
        //         "alias": "Picante",
        //         "identidad": "HOMBRE",
        //         "fechaNacimiento": "24/03/2003",
        //         "nacionalidad": "Argentino/a",
        //         "barrio": "Alto Gorriti",
        //         "localidad": "Abra Pampa",
        //         "direccion": "Iriarte 153",
        //         "latitudHecho": -24.186148060260322,
        //         "longitudHecho": -65.30016952003022,
        //         "telefonoFijo": "38842342342",
        //         "telefonoMovil": "38842342342",
        //         "email": "marcostadeorosales@gmail.com",
        //         "calidad": "Victima",
        //         "fotosDni": [
        //         ],
        //         "provincia": "Jujuy"
        //     },
        // ])

        // props.setDenunciados([
        //     {
        //         "id": 0,
        //         "tipoDocumento": "DNI",
        //         "tipoDocumentoOtro": "",
        //         "nroDocumento": "4234234",
        //         "nombre": "Denunciado",
        //         "apellido": "Rosales",
        //         "alias": "Picante",
        //         "identidad": "HOMBRE",
        //         "fechaNacimiento": "24/03/2003",
        //         "nacionalidad": "Argentino/a",
        //         "barrio": "Alto Gorriti",
        //         "localidad": "Abra Pampa",
        //         "direccion": "Iriarte 153",
        //         "latitudHecho": -24.186148060260322,
        //         "longitudHecho": -65.30016952003022,
        //         "telefonoFijo": "38842342342",
        //         "telefonoMovil": "38842342342",
        //         "email": "marcostadeorosales@gmail.com",
        //         "calidad": "Victima",
        //         "fotosDni": [
        //         ],
        //         "provincia": "Jujuy"
        //     },
        // ])





        // props.setDenuncia({
        //     "descripcionQue": "Equisde",
        //     "descripcionComo": "lol",
        //     "fechaDelhecho": "",
        //     "horaDelhecho": "",
        //     "localidad": "Aguas Calientes",
        //     "barrio": "Bajo Gorriti",
        //     "calleHecho": "dawdawd dawda",
        //     "numCalle": 4244,
        //     "piso": "",
        //     "departamento": "",
        //     "informacionAdicional": "ddddddd",
        //     "descripcionAdjuntos": "aaaaaaaa",
        //     "certezaFecha": "No",
        //     "detallesFecha": "No hay fecha",
        //     "certezaLugar": "Si",
        //     "latitudHecho": -24.190347859030425,
        //     "longitudHecho": -65.30240111793061
        // })
    }, []);


    function onChange(value) {
        console.log("Captcha value:", value);
        setResponse(value);
    }

    const buscarValorIntrafamiliar = (lista, valor) => {
        return lista.find((e) => e.code == valor);
    }

    const getDenunciaIntrafamiliar = () => {
        let denunciaIntrafamiliar = props.denunciaIntrafamiliar;
        let denunciaIntrafamiliarCompleta = {
            idDenuncia: 0,
            situacion1: denunciaIntrafamiliar.situacionHacinamiento == 'Si' ? 1 : 0,
            situacion2: denunciaIntrafamiliar.tituloPropiedad == 'Si' ? 1 : 0,
            situacion3: denunciaIntrafamiliar.viveConAgresor == 'Si' ? 1 : 0,
            situacion4: denunciaIntrafamiliar.medidasRestriccion == 'Si' ? 1 : 0,
            tipoViolencia1: buscarValorIntrafamiliar(denunciaIntrafamiliar.tiposViolencia, 'tipoviolencia1') ? 1 : 0,
            tipoViolencia2: buscarValorIntrafamiliar(denunciaIntrafamiliar.tiposViolencia, 'tipoviolencia2') ? 1 : 0,
            tipoViolencia3: buscarValorIntrafamiliar(denunciaIntrafamiliar.tiposViolencia, 'tipoviolencia3') ? 1 : 0,
            tipoViolencia4: buscarValorIntrafamiliar(denunciaIntrafamiliar.tiposViolencia, 'tipoviolencia4') ? 1 : 0,
            tipoViolencia5: buscarValorIntrafamiliar(denunciaIntrafamiliar.tiposViolencia, 'tipoviolencia5') ? 1 : 0,
            tipoViolencia6: buscarValorIntrafamiliar(denunciaIntrafamiliar.tiposViolencia, 'tipoviolencia6') ? 1 : 0,
            perfilAgresor1: buscarValorIntrafamiliar(denunciaIntrafamiliar.perfilAgresor, 'perfilagresor1') ? 1 : 0,
            perfilAgresor2: buscarValorIntrafamiliar(denunciaIntrafamiliar.perfilAgresor, 'perfilagresor2') ? 1 : 0,
            perfilAgresor3: buscarValorIntrafamiliar(denunciaIntrafamiliar.perfilAgresor, 'perfilagresor3') ? 1 : 0,
            perfilAgresor4: buscarValorIntrafamiliar(denunciaIntrafamiliar.perfilAgresor, 'perfilagresor4') ? 1 : 0,
            perfilAgresor5: buscarValorIntrafamiliar(denunciaIntrafamiliar.perfilAgresor, 'perfilagresor5') ? 1 : 0,
            perfilAgresor6: buscarValorIntrafamiliar(denunciaIntrafamiliar.perfilAgresor, 'perfilagresor6') ? 1 : 0,
            victima1: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima1') ? 1 : 0,
            victima2: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima2') ? 1 : 0,
            victima3: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima3') ? 1 : 0,
            victima4: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima4') ? 1 : 0,
            victima5: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima5') ? 1 : 0,
            victima6: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima6') ? 1 : 0,
            victima7: buscarValorIntrafamiliar(denunciaIntrafamiliar.victima, 'victima7') ? 1 : 0,
            caracteristica1: buscarValorIntrafamiliar(denunciaIntrafamiliar.caracteristicasVictima, 'caracteristica1') ? 1 : 0,
            caracteristica2: buscarValorIntrafamiliar(denunciaIntrafamiliar.caracteristicasVictima, 'caracteristica2') ? 1 : 0,
            caracteristica3: buscarValorIntrafamiliar(denunciaIntrafamiliar.caracteristicasVictima, 'caracteristica3') ? 1 : 0,
            caracteristica4: buscarValorIntrafamiliar(denunciaIntrafamiliar.caracteristicasVictima, 'caracteristica4') ? 1 : 0,
            caracteristica5: buscarValorIntrafamiliar(denunciaIntrafamiliar.caracteristicasVictima, 'caracteristica5') ? 1 : 0,
            caracteristica6: buscarValorIntrafamiliar(denunciaIntrafamiliar.caracteristicasVictima, 'caracteristica6') ? 1 : 0,
        }
        return denunciaIntrafamiliarCompleta;
    }

    const getDenunciaViolenciaGenero = () => {
        let denunciaViolenciaGenero = props.anexoViolenciaGenero;
        let denunciaViolenciaGeneroCompleta = {
            situacion1: 0, situacion2: 0,
            tipoViolencia1: 0, tipoViolencia2: 0, tipoViolencia3: 0, tipoViolencia4: 0,
            tipoViolencia5: 0, tipoViolencia6: 0, tipoViolencia7: 0,
            perfilAgresor1: 0, perfilAgresor2: 0, perfilAgresor3: 0, perfilAgresor4: 0,
            perfilAgresor5: 0, perfilAgresor6: 0, perfilAgresor7: 0,
            vulnerabilidades1: 0, vulnerabilidades2: 0, vulnerabilidades3: 0, vulnerabilidades4: 0,
        };

        if (denunciaViolenciaGenero.situacion) {
            denunciaViolenciaGenero.situacion.forEach(situacion => {
                denunciaViolenciaGeneroCompleta[situacion.denuncia] = 1;
            });
        }

        if (denunciaViolenciaGenero.tipoViolencia) {
            denunciaViolenciaGenero.tipoViolencia.forEach(tipoViolencia => {
                denunciaViolenciaGeneroCompleta[tipoViolencia.denuncia] = 1;
            });
        }

        if (denunciaViolenciaGenero.perfilAgresor) {
            denunciaViolenciaGenero.perfilAgresor.forEach(perfilAgresor => {
                denunciaViolenciaGeneroCompleta[perfilAgresor.denuncia] = 1;
            });
        }

        if (denunciaViolenciaGenero.vulnerabilidades) {
            denunciaViolenciaGenero.vulnerabilidades.forEach(vulnerabilidades => {
                denunciaViolenciaGeneroCompleta[vulnerabilidades.denuncia] = 1;
            });
        }

        return denunciaViolenciaGeneroCompleta;
    }

    const send = () => {
        if (response != null) {
            setDialogEnviando(true);

            //si es que hay una denuncia intrafamiliar
            if (props.denunciaIntrafamiliar != null) {
                console.log(getDenunciaIntrafamiliar());
                //var denunciaIntrafamiliar = getDenunciaIntrafamiliar()
            }

            let datosViolenciaGenero;
            if (props.anexoViolenciaGenero != null) {
                datosViolenciaGenero = getDenunciaViolenciaGenero();
            }

            var datDen = props.denuncia;
            console.log(props)
            //var inter = props.denunciados + props.testigos //+ props.denunciantes

            var denunciaCompleta = {}


            var anonimo = 0;
            if (props.anonimo == "Si")
                anonimo = 1;
            else
                anonimo = 0;

            var certezaFecha = 0, certezaLugar = 0;
            if (datDen.certezaFecha == "Si")
                denunciaCompleta.denuncia.certezaFecha = 1;
            else
                denunciaCompleta.denuncia.certezaFecha = 0;
            //TODO

            if (datDen.certezaLugar == "Si")
                certezaLugar = 1;
            else
                certezaLugar = 0;

            console.log(props.denunciados)

            var intervinientes = []
            var denunciantes = []
            var relaciones = []
            var denunciados = 0

            props.denunciados.forEach(element => {
                element.tipoIdentificacion = element.tipoDocumento//element.tipoDocumento;
                element.numeroIdentificacion = element.nroDocumento;
                element.idPais = 1//element.nacionalidad;
                element.idProvincia = 1//element.provincia;
                element.idBarrio = 1//element.barrio;
                element.tipoPersona = element.tipoPersona;
                element.idLocalidad = 1//element.localidad;
                element.domicilio = element.direccion;
                element.idIntervinienteTipo = 5;
                element.fechaNacimiento = '2023-03-03'//element.fechaNacimiento.toISOString().slice(0, 10);//'2023-03-03';
                element.identidadAutopercibida = element.identidad
                if (element.conoceDenunciado == "Si")
                    denunciados = 1;
                intervinientes.push(element);
            });

            props.denunciantes.forEach(element => {
                element.tipoIdentificacion = element.tipoDocumento;
                element.numeroIdentificacion = element.nroDocumento;
                element.idPais = 1//element.nacionalidad;
                element.idProvincia = 1//element.provincia;
                element.idBarrio = 1//element.barrio;
                element.tipoPersona = "Fisica";
                element.idLocalidad = 1//element.localidad;
                element.domicilio = element.direccion;
                element.fechaNacimiento = '2023-03-03'//element.fechaNacimiento.toISOString().slice(0, 10);
                element.identidadAutopercibida = element.identidad
                if (element.calidad == "Denunciante") {
                    element.idIntervinienteTipo = 2;
                    denunciantes.push(element);
                    var relacion = {}
                    relacion = { conocimientoVictima: element.conoceVictima, vinculoVictima: element.vinculoVictima, detallevinculo: element.vinculoVictimaOtro }
                    relaciones.push(relacion);
                }
                else {
                    if (element.calidad == "Victima") {
                        element.idIntervinienteTipo = 1;
                    }
                    else
                        element.idIntervinienteTipo = 3;
                    intervinientes.push(element);
                }
            });

            props.testigos.forEach(element => {
                element.tipoIdentificacion = element.tipoDocumento;
                element.numeroIdentificacion = element.nroDocumento;
                element.idPais = 1//element.nacionalidad;
                element.idProvincia = 1//element.provincia;
                element.idBarrio = 1//element.barrio;
                element.tipoPersona = element.tipoPersona;
                element.idLocalidad = 1//element.localidad;
                element.domicilio = element.direccion;
                element.idIntervinienteTipo = 9;
                element.fechaNacimiento = '2023-03-03'//element.fechaNacimiento.toISOString().slice(0, 10);
                element.identidadAutopercibida = element.identidad
                intervinientes.push(element);
            })


            denunciaCompleta = {
                denuncia: {
                    descripcionQue: datDen.descripcionQue,
                    descripcionComo: datDen.descripcionComo,

                    certezaFecha: datDen.conoceFecha == 'SI' ? 1 : 0,//certezaFecha,
                    detalleFecha: datDen.detallesFecha,

                    certezaLugar: datDen.conoceLugar == 'SI' ? 1 : 0,
                    calleHecho: datDen.calle,
                    numCalle: datDen.numero,
                    latitudHecho: datDen.latitud,
                    longitudHecho: datDen.longitud,
                    idBarrio: datDen.barrio.id,
                    idLocalidad: 1,//datDen.localidad.id,
                    informacionAdicional: datDen.informacionAdicional,
                    anonimo: anonimo,
                    idTipoDenuncia: props.tipoDenuncia,
                    datosDenunciado: 1,//denunciados,
                    testigo: 1,//TODO
                    datosTestigo: 1 //TODO

                },
                intervinientes: intervinientes,
                denunciantes: denunciantes,
                victimasRelaciones: [],//[
                //     {
                //       fechaNacimiento: '2023-03-03',
                //       tipoPersona: '1',

                //       informacionAdicional: 'text',
                //       concurso: 'text',
                //       autoriaParticipacion: 'text',
                //       grado: 'text',
                //     },
                //   ],
                //}

                // denuncia: {
                //   },
                //   
                //   denunciantes: [
                //     {
                //       nombre: 'mayko',
                //       apellido: 'text',
                //       tipoIdentificacion: 'text',
                //       numeroIdentificacion: 'text',
                //       alias: 'text',
                //       identidadAutopercibida: 'text',
                //       fechaNacimiento: '2023-03-03',
                //       idPais: '1',
                //       domicilio: 'text',
                //       idProvincia: '1',
                //       idBarrio: '1',
                //       idLocalidad: '1',
                //       direccion: 'text',
                //       telefonoFijo: 'text',
                //       telefonoMovil: 'text',
                //       email: 'text',
                //       tipoPersona: '1',
                //       idIntervinienteTipo: '1',
                //       informacionAdicional: 'text',
                //       concurso: 'text',
                //       autoriaParticipacion: 'text',
                //       grado: 'text',
                //     },
                //   ],
                //   victimasRelaciones: [
                //     {
                //       conocimiento_victima: '1',
                //       vinculoVictima: 'Otro',
                //       detalleVinculo: 'sexo',
                //       dependeIngresos: '1',
                //       hijosMenores: '1',
                //       riesgoVida: '1',
                //     },
                //   ],
                denunviaViolenciaGenero: datosViolenciaGenero
            };
            crearDenuncia(denunciaCompleta).then((res) => {
                console.log(res);
                if (props.denunciaIntrafamiliar != null) {//deberia crear la denuncia intrafamiliar 
                    //denunciaIntrafamiliar.idDenuncia = res.data.idDenuncia;
                    //crearDenunciaIntrafamiliar(denunciaIntrafamiliar);
                }
                setResponseDenuncia(res.data)//.idDenuncia;
                setHasId(true);
            });

        }
        else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Complete el Captcha para continuar', life: 3000 });
        }
    }

    const onSubmited = () => {
        const recaptchaValue = recaptchaRef.current.getValue();
        this.props.onSubmit(recaptchaValue);
    }

    const datosDenunciante = () => {
        return (
            <div className='grid'>
                {(props.denunciantes).map((den) => {//props.denunciantes
                    return (
                        <div className='col-12 md:col-6 lg:col-6 xl:col-4 mb-4' key={den.id}>
                            <div className='border-1 h-full'>
                                <div className='mx-3'>
                                    <h3 className='underline'>Datos {den.calidad}</h3>
                                    {/* <p><span className='font-bold'>Calidad: </span>{den.calidad}</p> */}
                                    <div className='grid'>
                                        <div className='col-12 grid'>
                                            <div className='col-12 lg:col-6'>
                                                <span className='font-bold'>numCalle de {den.tipoDocumento}: </span>{den.nroDocumento}
                                            </div>
                                            {den.alias != '' &&
                                                <div className='col-12 lg:col-6'>
                                                    <span className='font-bold'>Alias: </span>{den.alias}
                                                </div>}
                                        </div>
                                        <div className='col-12'>
                                            <span className='font-bold'>Nombre Completo: </span>{den.apellido}, {den.nombre}
                                        </div>
                                        <div className='col-12'>
                                            <span className='font-bold'>Identidad Autopercibida: </span>{den.identidad}
                                        </div>
                                        <div className='col-12'><span className='font-bold'>Fecha de Nacimiento: </span>{den.fechaNacimiento}</div>
                                        <div className='col-12'><span className='font-bold'>Nacionalidad: </span>{den.nacionalidad}</div>
                                        <div className='col-12'><span className='font-bold'><i className="text-2xl bi bi-house-fill"></i> </span>{den.localidad}, {den.barrio}, {den.direccion}</div>
                                        <div className='col-12'></div>
                                    </div>
                                    {/* <div className='w-full'>
                                        <MapView coords={{ lat: den.latitudHecho, lng: den.longitudHecho }}></MapView>
                                    </div> */}
                                    {/* {Array.from(den.fotosDni).map((foto) => {
                                        return (<> <img key={foto.toString()} className='img-fluid' src={foto} alt="" /></>)
                                    })} */}

                                    <h3 className='underline'>Datos de Contacto</h3>
                                    <p><span className='font-bold'><i className="text-2xl bi bi-telephone-fill"></i> </span>{den.telefonoFijo}</p>
                                    <p><span className='font-bold'><i className="text-2xl bi bi-whatsapp"></i> </span>{den.telefonoMovil}</p>
                                    <p><span className='font-bold'><i className="text-2xl bi bi-envelope-at-fill"></i> </span>{den.email}</p>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }

    const datosDenunciados = (array, tipo) => {
        return (
            <div className='grid'>
                {(array).map((den) => {//props.denunciantes
                    return (
                        <div className='col-12 md:col-6 lg:col-6 xl:col-4 mb-4' key={den.id}>
                            <div className='border-1 h-full'>
                                <div className='mx-3'>
                                    <h3 className='underline'>Datos {tipo}</h3>
                                    {/* <p><span className='font-bold'>Calidad: </span>{den.calidad}</p> */}
                                    <div className='grid'>
                                        <div className='col-12 grid'>
                                            <div className='col-12 lg:col-6'>
                                                <span className='font-bold'>numCalle de {den.tipoDocumento}: </span>{den.nroDocumento}
                                            </div>
                                            {den.alias != '' &&
                                                <div className='col-12 lg:col-6'>
                                                    <span className='font-bold'>Alias: </span>{den.alias}
                                                </div>}
                                        </div>
                                        <div className='col-12'>
                                            <span className='font-bold'>Nombre Completo: </span>{den.apellido}, {den.nombre}
                                        </div>
                                        <div className='col-12'>
                                            <span className='font-bold'>Identidad Autopercibida: </span>{den.identidad}
                                        </div>
                                        <div className='col-12'><span className='font-bold'>Fecha de Nacimiento: </span>{den.fechaNacimiento}</div>
                                        <div className='col-12'><span className='font-bold'>Nacionalidad: </span>{den.nacionalidad}</div>
                                        <div className='col-12'><span className='font-bold'><i className="text-2xl bi bi-house-fill"></i> </span>{den.localidad}, {den.barrio}, {den.direccion}</div>
                                        <div className='col-12'></div>
                                    </div>
                                    {/* <div className='w-full'>
                                        <MapView coords={{ lat: den.latitudHecho, lng: den.longitudHecho }}></MapView>
                                    </div> */}
                                    {/* {Array.from(den.fotosDni).map((foto) => {
                                        return (<> <img key={foto.toString()} className='img-fluid' src={foto} alt="" /></>)
                                    })} */}

                                    <h3 className='underline'>Datos de Contacto</h3>
                                    <p><span className='font-bold'><i className="text-2xl bi bi-telephone-fill"></i> </span>{den.telefonoFijo}</p>
                                    <p><span className='font-bold'><i className="text-2xl bi bi-whatsapp"></i> </span>{den.telefonoMovil}</p>
                                    <p><span className='font-bold'><i className="text-2xl bi bi-envelope-at-fill"></i> </span>{den.email}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const datosViolenciaGenero = (datosViolenciaGenero) => {
        console.log(datosViolenciaGenero);
        return (
            <div>
                <h3>Situaciones en las cuales se encuentra la víctima con respecto a su pareja: {!datosViolenciaGenero.situacion ? '----' : (datosViolenciaGenero.situacion.length == 0 && '----')}</h3>
                {!datosViolenciaGenero.situacion ? '' : datosViolenciaGenero.situacion.map((item) => (
                    <p key={item.denuncia}>{item.label}</p>
                ))}
                <h3>Episodios que sufrió la víctima: {!datosViolenciaGenero.tipoViolencia ? '----' : (datosViolenciaGenero.tipoViolencia.length == 0 && '----')}</h3>
                {!datosViolenciaGenero.tipoViolencia ? '' : datosViolenciaGenero.tipoViolencia.map((item) => (
                    <p key={item.denuncia}>{item.label}</p>
                ))}
                <h3>Conductas que posee el agresor: {!datosViolenciaGenero.perfilAgresor ? '----' : (datosViolenciaGenero.perfilAgresor.length == 0 && '----')}</h3>
                {!datosViolenciaGenero.perfilAgresor ? '' : datosViolenciaGenero.perfilAgresor.map((item) => (
                    <p key={item.denuncia}>{item.label}</p>
                ))}
                <h3>Vulnerabilidades que presenta la víctima: {!datosViolenciaGenero.vulnerabilidades ? '----' : (datosViolenciaGenero.vulnerabilidades.length == 0 && '----')}</h3>
                {!datosViolenciaGenero.vulnerabilidades ? '' : datosViolenciaGenero.vulnerabilidades.map((item) => (
                    <p key={item.denuncia}>{item.label}</p>
                ))}
            </div>
        );
    };


    console.log(props.denunciaIntrafamiliar);
    console.log(props.denuncia);
    console.log(props.denuncia.fechaDelhecho);
    console.log(props.denuncia.horaDelhecho);
    return (
        <>
            <div id='container'>
                <Toast ref={toast} />
                <div className='mx-5 mt-3'>

                    <h1>Resumen de la Denuncia</h1>

                    <div className='mb-3'>

                        <div className='flex mb-5'>
                            <div className='px-4 border-1 border-round'>
                                <h2 className='text-blue-500'>Datos Generales</h2>
                            </div>
                        </div>
                        <div className='grid'>
                            <div className='col-12 grid mb-4'>
                                <div className='col-4'><span className='font-bold'>Fecha: {new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}</span></div>
                                <div className='col-4'><span className='font-bold'>Tipo: {props.stringDenuncia}</span></div>
                                {/* TODO: Traer string del tipo de Denuncia */}
                            </div>
                        </div>
                        <div className='flex mb-5'>
                            <div className='px-4 border-1 border-round'>
                                <h2 className='text-blue-500'>Datos del Hecho</h2>
                            </div>
                        </div>
                        <div className='grid'>
                            {/* esta parte falla */}
                            {/* <div className='col-12'><span className='font-bold'>Momento del Hecho:</span> {props.denuncia.fechaDelhechotoLocaleDateString('en-GB')} {props.denuncia.horaDelhecho.toLocaleTimeString()} </div> */}
                            <div className='col-12'><span className='font-bold'>Que Paso?:</span> {props.denuncia.quePaso}</div>
                            <div className='col-12 mb-3'><span className='font-bold'>Como Paso?:</span> {props.denuncia.comoPaso}</div>
                            <div className='col-12 grid'>
                                <div className='col-12'>
                                    <span className='font-bold'>Donde Paso?:</span>
                                    <div className='col'>{props.denuncia.localidad} {(props.denuncia.barrio != '' && props.denuncia.barrio != undefined) && <span>, {props.denuncia.barrio}, {props.denuncia.calle}, {props.denuncia.numero}</span>}</div>
                                    {(props.denuncia.piso != '' && props.denuncia.piso != undefined) && props.denuncia.piso + ", " + props.denuncia.departamento}
                                </div>
                            </div>
                            <div className='col-12'><span className='font-bold'>Informacion Adicional:</span> {props.denuncia.informacionAdicional} </div>
                            <div className='col-12'><span className='font-bold'>Descripcion Adjuntos:</span> {props.denuncia.descripcionAdjuntos} </div>
                        </div>

                    </div>
                    <div className='mb-3'>
                        <div className='flex mb-5'>
                            <div className='px-4 border-1 border-round'>
                                <h2 className='text-blue-500'>Datos intervinientes</h2>
                            </div>
                        </div>
                        {datosDenunciante()}
                    </div>
                    <div className='mb-3'>
                        <div className='flex mb-5'>
                            <div className='px-4 border-1 border-round'>
                                <h2 className='text-blue-500'>Datos Denunciados</h2>
                            </div>
                        </div>
                        {datosDenunciados(props.denunciados, "Denunciados")}
                    </div>
                    <div className='mb-3'>
                        <div className='flex mb-5'>
                            <div className='px-4 border-1 border-round'>
                                <h2 className='text-blue-500'>Datos Testigos</h2>
                            </div>
                        </div>
                        {datosDenunciados(props.testigos, "Testigos")}
                    </div>

                    {props.tipoDenuncia == 5 && (
                        <div className='mb-3'>
                            <div className='flex mb-5'>
                                <div className='px-4 border-1 border-round'>
                                    <h2 className='text-blue-500'>Datos Violencia de Genero</h2>
                                </div>
                            </div>
                            {datosViolenciaGenero(props.anexoViolenciaGenero)}
                        </div>
                    )}

                    <div className='mb-7 border-3 border-round'>
                        <div className='mx-4'>
                            <h1 className='text-center py-3 border-bottom-2 mb-6'>Terminos y condiciones</h1>
                            <p>1. Este sistema no tiene como objetivo la comunicación o informe de urgencias o emergencias, en ese caso debe utilizar como vía de contacto la línea telefónica 911 prevista a tal efecto.</p>
                            <p>2. Si ya han informado el hecho por otro canal formal de denuncia, no debe reportarlo nuevamente utilizando este sistema.</p>
                            <p>3. Esta aplicación te acerca la posibilidad de informar hechos delictivos a la justicia y la misma deberá ser ratificada en la delegación fiscal o fiscalía mas próxima a su ubicación dentro de los 5 (cinco) días hábiles, caso contrario el ayudante fiscal o fiscal interviniente podrá archivarla sin más trámite. Consulte las delegaciones fiscales: https://mpajujuy.gob.ar/listado-delegaciones o las fiscalías en siguiente enlace: https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales</p>
                            <p>4. Si hay que darle tratamiento <span className='font-bold'>URGENTE</span>, por favor dirígete hasta la comisaria, delegación fiscal o fiscalía mas próxima a tu ubicación.</p>
                            <p>5. Para aquellos casos en que se proporcionen datos personales, los mismos deberán poseer la documentación respaldatoria.</p>
                            <p>6. Quien informe delitos lo hará con la responsabilidad que esto amerita y la certeza sobre la ocurrencia del mismo.</p>
                            <p>7. Se adoptarán todas las medidas técnicas de integridad y seguridad de los datos necesarias para garantizar la seguridad y confidencialidad de los datos personales, de modo de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, y que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado.</p>
                            <p>8. La información suministrada no se almacena en el dispositivo móvil una vez que es enviada al servidor.</p>
                            <p>9. Si opta por realizar este proceso de forma anónima no aplicarán los puntos 3 y 5 arriba definidos.</p>
                            <p>10. Acepto ser notificado de la denuncia y todo otro acto vinculado u originado a raíz de la misma al correo electrónico y/o via WhatsApp al número de teléfono proporcionado. </p>
                            <p><span className='font-bold'>Falsa denuncia:</span> Al realizar una denuncia, Usted debe saber que si la realiza falsamente -es decir, miente en lo que nos está informando-, está cometiendo un delito con penas de prisión de dos meses a un año o multa (artículo 245 del Código Penal).</p>

                        </div>
                    </div>
                    {/* {
                        denuncia: datosDenuncia,
                        intervinientes: testigos, denunciado y victima o victimadenunciantes 
                        denunciante: {nombre: datosRelacion:{conocimientoVictima: etc} }

                    } */}
                    <div className='mb-3 border-3 border-round'>
                        <div className='mx-4'>
                            <h1 className='text-center py-3 border-bottom-2 mb-6'>ARTÍCULO 129º.- Derechos de la Víctima</h1>
                            <p><span className='font-bold'>La víctima tendrá los siguientes derechos:</span></p>
                            <p>a) A recibir un trato digno y respetuoso y que se hagan mínimas las molestias derivadas del procedimiento.</p>
                            <p>b) A que se respete su intimidad en la medida que no obstruya la investigación.</p>
                            <p>c) A requerir medidas de protección para su seguridad, la de sus familiares y la de los testigos que declaren en su interés, a través de los órganos competentes y a ser asistida en forma integral y especializada con el objeto de propender a su recuperación psíquica, física y social.</p>
                            <p>d) A intervenir en el procedimiento penal y en el juicio como querellante, conforme a lo establecido por este Código.</p>
                            <p>e) A ser informada del avance y resultados de la investigación y del proceso, salvo razones fundadas en resguardar su eficacia aún cuando no haya intervenido en él.</p>
                            <p>f) A examinar documentos y actuaciones, a ser informada verbalmente sobre el estado del proceso y la situación del imputado.</p>
                            <p>g) A aportar información durante la investigación.</p>
                            <p>h) A ser escuchada antes de cada decisión que implique la extinción o suspensión de la acción penal.</p>
                            <p>i) A requerir la revisión ante el Fiscal General de la Acusación, de la desestimación o archivo dispuesto por el fiscal, aun cuando no haya intervenido en el procedimiento como querellante.</p>
                            <p>j) A requerir el inmediato reintegro de los bienes muebles e inmuebles de los que fue ilegítimamente privado y el cese del estado antijurídico producido por el hecho investigado.</p>
                            <p>k) A reclamar por demora o ineficiencia en la investigación ante el Fiscal General de la Acusación.</p>
                            <p>l) Cuando fuere menor o incapaz, el órgano judicial podrá autorizar que durante los actos procesales en los cuales intervenga, sea acompañado por ascendiente, tutor o guardador, salvo que existieren intereses contrapuestos, en cuyo caso será acompañado por el representante del Ministerio de Menores o Incapaces.</p>
                            <p>ll) A ser oída en las audiencias en donde se decida sobre la revocación de alguna medida de coerción personal que pese sobre el imputado y en las audiencias donde se decida sobre la posibilidad de que el imputado obtenga un beneficio en la ejecución de pena que importe su soltura anticipada.</p>
                            <p>m) En los casos de lesiones dolosas entre convivientes y se presuma la reiteración de hechos, el juez de control podrá disponer a pedido de la víctima o del fiscal la exclusión o prohibición de ingreso al hogar del victimario y/o el alojamiento de la víctima en un lugar adecuado.</p>
                        </div>
                    </div>
                    <form onSubmit={onSubmited} >
                        <div className='grid'>
                            <div className='col-12 md:col-4'>
                                <div className='flex justify-content-center flex-wrap'>
                                    <div className='flex align-items-center justify-content-center'>
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey="6LdjMcgoAAAAAGrDI_rgUpCUlVoesFzWOncHfZVB"
                                            //Secret Key 6LdjMcgoAAAAAKXabqaVeJkM_Eb-tH318sdhxHwz
                                            onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 md:col-8 mt-5'>
                                <Button type='button' icon="pi pi-chevron-right" iconPos='right' label="Finalizar" disabled={response == null} className='w-full' onClick={e => send()}></Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >


            <Dialog draggable={false} blockScroll={true} closable={false} visible={dialogEnviando} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setDialogEnviando(false)}>
                {hasId == false ?
                    <div>
                        <div className='mt-5 mx-5 text-center'>
                            <i className='text-8xl pi pi-spin pi-spinner'></i>
                            <h2>Cargando...</h2>
                            <h4>Por favor, aguarde mientras se envia el formulario</h4>
                        </div>
                    </div>
                    :
                    <div>
                        <div className='flex justify-content-center flex-wrap'>


                            <div className='flex mb-5'>
                                <div className='px-4 border-bottom-1'>
                                    <h1 className='text-blue-500'>Comprobante de Denuncia</h1>
                                </div>
                            </div>
                        </div>
                        <div className='mx-4'>
                            <h2>Denuncia Nroº:{responseDenuncia.idDenuncia}</h2>
                            <p>El alta de denuncia se ha realizado correctamente.</p>
                            <p>Se le envió un correo electrónico a: <span className='text-bold'>{responseDenuncia.message}</span> con el comprobante.</p>
                            <p className='p-error'>Debe apersonarse en los próximos 5 días hábiles a ratificar la denuncia a la delegación fiscal o fiscalía mas próxima</p>
                        </div>
                    </div>
                }
            </Dialog>
        </>
    )
}