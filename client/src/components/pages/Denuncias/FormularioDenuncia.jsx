import React, { useState, useEffect, memo } from 'react';
import { useRoboHurtoContext, useDenunciaContext } from '../../../pages/Denuncia/Denuncia.jsx';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import MapTemplate from './templates/MapTemplate';

import { getBarrios, getDepartamentos, getLocalidades, getNacionalidades, getProvincias } from "../../../api/adicional.api";
import { DatosDenuncia } from '../../../models/DatosDenuncia';
import { RoboHurto } from './DenunciasEspeciales/RoboHurto';
import { DelitosContraPersonas } from './DenunciasEspeciales/DelitosContraPersonas';
import { DelitoSexual } from './DenunciasEspeciales/DelitoSexual';
import { IncidentesViales } from './DenunciasEspeciales/IncidentesViales';
import { MaltratoAnimal } from './DenunciasEspeciales/MaltratoAnimal';
import { Danos } from './DenunciasEspeciales/Danos';
import { useOtrosFormContext } from '../../../pages/Denuncia/Denuncia';
import '../../styles/FormularioDenuncia.styles.scss';
import { Abigeato } from './DenunciasEspeciales/Abigeato.jsx';

function FormularioDenuncia({ changePaso, finalizarDatosDenuncia, denuncia,abigeato,setAbigeato,setMaltratoAnimal,setDelitoSexual }) {
  
    const [touchedFiles, setTouchedFiles] = useState(false);
    const [barrios, setBarrios] = useState([]);
    const [localidades, setLocalidades] = useState([]);//localidadesPrueba

    const [archivosSubidos, setArchivosSubidos] = useState([]);

    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
    //const toast = useRef(null);

    const { delitoSexual, setValidacion, maltratoAnimal, danos,setDanos,setValidaDanos } = useOtrosFormContext();

    //context 
    const { telefonos, automoviles, bicicletas, autopartes, documentos, cheques, tarjetas, otros, selectedOptionsRoboHurto, setTelefonos, setAutomoviles, setBicicletas, setAutopartes, setDocumentos, setCheques, setTarjetas, setOtros, setSelectedOptionsRoboHurto } = useRoboHurtoContext();
    const { tipoValue, str } = useDenunciaContext();
    //robo y hurto
    // const [telefonos, settelefonos] = useState([]);
    // const [automoviles, setautomoviles] = useState([]);
    // const [bicicletas, setbicicletas] = useState([]);
    // const [autopartes, setautopartes] = useState([]);
    // const [documentos, setdocumentos] = useState([]);
    // const [cheques, setcheques] = useState([]);
    // const [tarjetas, settarjetas] = useState([]);
    // const [otros, setotros] = useState([]);
    // const [selectedOptionsRoboHurto, setSelectedOptionsRoboHurto] = useState([]);

    const circunstanciasHecho = () => {
        let circunstancias = {
            danoCosas: 0,
            armas: 0,
            violenciaFisica: 0,
            amenaza: 0,
            arrebato: 0,
            otra: 0,
            cantTelefonos: telefonos.length,
            cantAutomoviles: automoviles.length,
            cantBicicletas: bicicletas.length,
            cantAutopartes: autopartes.length,
            cantDocumentos: documentos.length,
            cantTarjetas: tarjetas.length,
            cantCheques: cheques.length,
            cantOtros: otros.length
        }

        if (selectedOptionsRoboHurto.length != 0) {
            selectedOptionsRoboHurto.forEach(element => {
                circunstancias[element.code] = 1;
            });
        }
        return circunstancias;
    }

    useEffect(() => {
        scrollTo({ top: 0, behavior: 'instant' })
        formikDenuncia.setValues(denuncia);

        //para editar roboHurto
        // if (denuncia.propiedades) { //roboHurto
        //     let propiedades = denuncia.propiedades;
        //     settelefonos(propiedades.telefonos);
        //     setautomoviles(propiedades.automoviles);
        //     setbicicletas(propiedades.bicicletas);
        //     setautopartes(propiedades.autopartes);
        //     setdocumentos(propiedades.documentos);
        //     setcheques(propiedades.cheques);
        //     settarjetas(propiedades.tarjetas);
        //     setotros(propiedades.otros);
        //     setSelectedOptionsRoboHurto(propiedades.selectedOptionsRoboHurto);
        // }

        //para editar incidente vial
        // if (denuncia.vehiculosIncidentes) {
        //     let vehiculosIncidentes = denuncia.vehiculosIncidentes;
        //     setautomoviles(vehiculosIncidentes.automoviles);
        // }

        getLocalidades('').then(({ data: { data } }) => {
            setLocalidades(data);
        });
        getBarrios('').then(({ data: { data } }) => {
            setBarrios(data);
        });
    }, []);

    const getDenunciaDelitoSexual = () => {
        let denSexual = delitoSexual;
        let denSexualCompleta = {
            hechoAcercamiento: 0, hechoContactoTecnologico: 0,
            hechoBeso: 0, hechoTocamiento: 0, hechoIntroduccion: 0,
            accionViolencia: 0, accionDrogas: 0, accionVulnerabilidad: 0,
            accionArma: 0, denunciasPrevias: 0, solicitudImagenes: 0, menorInvolucrado: 0,
            mediosElectronicos: 0,
        };
        if (denSexual.accionesAutor) {
            denSexual.accionesAutor.forEach((accion) => {
                denSexualCompleta[accion.code] = 1;
            })
        }
        if (denSexual.hechosSexual) {
            denSexual.hechosSexual.forEach((hecho) => {
                denSexualCompleta[hecho.code] = 1;
            })
        }

        denSexualCompleta.denunciasPrevias = denSexual.denunciasPrevias == 'Si' ? 1 : 0;
        denSexualCompleta.solicitudImagenes = denSexual.solicitudImagenes == 'Si' ? 1 : 0;
        denSexualCompleta.menorInvolucrado = denSexual.menorInvolucrado == 'Si' ? 1 : 0;
        denSexualCompleta.mediosElectronicos = denSexual.mediosElectronicos == 'Si' ? 1 : 0;

        return denSexualCompleta;
    }

    const getDenunciaAbigeato = () => {
        let denAbigeatoCompleta = {
            violenciaFisica: abigeato.violenciaFisica
        };

        let animalesAux=[];
        abigeato.animales.forEach(animal => {
            animalesAux.push({...animal,idDenunciaAbigeatoDetallesEspecies: animal.idDenunciaAbigeatoDetallesEspecies.code});
        });

        denAbigeatoCompleta.abigeatoDetalles=animalesAux;

        return denAbigeatoCompleta;
    }

    const getDenunciaDanos = () => {
        //TODOOOOOOOOOOOOOOOO
        //setDanos(formikDanos.values);
        let datosDanosFormik = danos;
        let datosDanos = {
            danoAnimal: 0,
            danoCosaMaterial: 0,
            danoInmueble: 0,
            danoSistemaInformatico: 0,
            consecuenciaDano: 0,
            consecuenciaDestruccion: 0,
            consecuenciaInutilizacion: 0,
            consecuenciaDesaparicion: 0,
            consecuenciaOtro: 0,
            consecuenciaDetallesOtro: datosDanosFormik.consecuenciaDetallesOtro,
            pertenencia: datosDanosFormik.pertenencia.code
        }
        datosDanosFormik.tipoDano.forEach(tipoDano => {
            datosDanos[tipoDano.code] = 1;
        });
        datosDanosFormik.tipoConsecuencia.forEach(tipoConsecuencia => {
            datosDanos[tipoConsecuencia.code] = 1;
        });
        if (datosDanos.consecuenciaOtro == 0) {
            datosDanos.consecuenciaDetallesOtro = undefined;
        }
        console.log(datosDanos);
        return datosDanos;
    }

    const getDenunciaMaltratoAnimal = () => {
        let denMaltratoAnimal = maltratoAnimal;
        let denMaltratoAnimalCompleta = {
            condicionAnimal: denMaltratoAnimal.condicionAnimal.code,
            atencionVeterinaria: denMaltratoAnimal.atencionVeterinaria.code,
            relacionAnimal: denMaltratoAnimal.relacionAnimal.code,
            tipoAnimal: denMaltratoAnimal.tipoAnimal.code,
            tomoConocimiento: denMaltratoAnimal.tomoConocimiento.code,
            convivenciaIndeterminado: 0, convivenciaAdultosMayores: 0,
            convivenciaNinos: 0, convivenciaOtro: 0, convivenciaDiscapacidad: 0,
            violenciaCometida: denMaltratoAnimal.violenciaCometida.code,
            abusoAnimal: denMaltratoAnimal.abusoAnimal.code,
            abusoFuncionario: denMaltratoAnimal.abusoFuncionario.code
        };

        maltratoAnimal?.convivencias.forEach((e) => {
            denMaltratoAnimalCompleta[e.code] = 1;
        });

        return denMaltratoAnimalCompleta;
    }

    //daños
    const isPressedConsecuenciaOtro = (tipoConsecuencia) => {
        let isOtro = false;
        tipoConsecuencia.forEach(consec => {
          if (consec.code == 'consecuenciaOtro') {
            isOtro = true;
          }
        });
        return isOtro;
      }
    //fin daños

    const getValidacionesDanos = (errors) => {
        if(tipoValue==14){
            if (danos.tipoDano.length == 0) {
                errors.tipoDano = 'Este campo es requerido.';
            }

            if (danos.tipoConsecuencia.length == 0) {
                errors.tipoConsecuencia = 'Este campo es requerido.';
            }

            if (isPressedConsecuenciaOtro(danos.tipoConsecuencia)) {
                if (!danos.consecuenciaDetallesOtro) {
                    errors.consecuenciaDetallesOtro = 'Este campo es requerido.';
                }
            }

            if (!danos.pertenencia) {
                errors.pertenencia = 'Este campo es requerido.';
            }
        }
    }

    const getValidacionesMaltratoAnimal = (data, errors) => {
        if (!maltratoAnimal?.condicionAnimal && tipoValue == 15) {
            errors.condicionAnimal = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.atencionVeterinaria && tipoValue == 15) {
            errors.atencionVeterinaria = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.relacionAnimal && tipoValue == 15) {
            errors.relacionAnimal = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.tipoAnimal && tipoValue == 15) {
            errors.tipoAnimal = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.tomoConocimiento && tipoValue == 15) {
            errors.tomoConocimiento = 'Este campo es requerido.';
        }
        if ((maltratoAnimal?.convivencias?.length == 0 || !maltratoAnimal?.convivencias) && tipoValue == 15) {
            errors.convivencias = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.violenciaCometida && tipoValue == 15) {
            errors.violenciaCometida = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.abusoAnimal && tipoValue == 15) {
            errors.abusoAnimal = 'Este campo es requerido.';
        }
        if (!maltratoAnimal?.abusoFuncionario && tipoValue == 15) {
            errors.abusoFuncionario = 'Este campo es requerido.';
        }
    }

    const getValidacionesDelitoSexual = (data, errors) => {
        if (!data.mediosElectronicos && tipoValue == 6) {
            errors.mediosElectronicos = 'Este campo es requerido.';
        }
        if ((!data.hechosSexual || data.hechosSexual?.length == 0) && tipoValue == 6) {
            errors.hechosSexual = 'Este campo es requerido.';
        }
        if ((!data.accionesAutor || data.accionesAutor?.length == 0) && tipoValue == 6) {
            errors.accionesAutor = 'Este campo es requerido.';
        }
        if (!data.denunciasPrevias && tipoValue == 6) {
            errors.denunciasPrevias = 'Este campo es requerido.';
        }
        if (!data.solicitudImagenes && tipoValue == 6) {
            errors.solicitudImagenes = 'Este campo es requerido.';
        }
        if (!data.menorInvolucrado && tipoValue == 6) {
            errors.abusoAnimal = 'Este campo es requerido.';
        }
    }

    const getValidacionesRoboHurto = (errors) => {
        if(tipoValue==1){
            if(telefonos.length==0&&automoviles.length==0&&bicicletas.length==0&&autopartes.length==0&&documentos.length==0&&tarjetas==0&&cheques.length==0&&otros.length==0){
                errors.emptyRoboHurto='Debe ingresar al menos un objeto';
            }
        }
    };

    const getValidacionesIncidentesViales = (automoviles, errors) => {
        if(tipoValue == 4){
            if(automoviles.length == 0){//si bien no se muestra el mensaje, no permite que se cargue el form
                errors.automovilesIncidenteVial='Debe ingresar al menos un vehículo.';
            }
        }
    }

    const camposDanos = tipoValue == 14 ? {
        tipoDano: [],
        tipoConsecuencia: [],
        consecuenciaDetallesOtro: '',
        pertenencia: ''
    } : null;

    const camposMaltratoAnimal = tipoValue == 15 ? {
        condicionAnimal: maltratoAnimal.condicionAnimal,
        atencionVeterinaria: maltratoAnimal.atencionVeterinaria,
        relacionAnimal: maltratoAnimal.relacionAnimal,
        tipoAnimal: maltratoAnimal.tipoAnimal,
        tomoConocimiento: maltratoAnimal.tomoConocimiento,
        convivencias: maltratoAnimal.convivencias,
        violenciaCometida: maltratoAnimal.violenciaCometida,
        abusoAnimal: maltratoAnimal.abusoAnimal,
        abusoFuncionario: maltratoAnimal.abusoFuncionario
    } : null;

    const camposDelitoSexual = tipoValue == 6 ? {
        mediosElectronicos: '',
        hechosSexual: '',
        accionesAutor: '',
        denunciasPrevias: '',
        solicitudImagenes: '',
        menorInvolucrado: ''
    } : null;

    const camposRoboHurto = tipoValue==1?{
        emptyRoboHurto:''
    }:null

    const camposIncidentesViales = tipoValue == 4 ? {
        automovilesIncidenteVial: ''
    } : null;

    //Formik
    const formikDenuncia = useFormik({
        initialValues: {
            descripcionQue: '',
            descripcionComo: '',
            certezaFecha: 1,
            detalleFecha: '',
            fechaHecho: '',
            horaHecho: '',
            certezaLugar: 1,
            idLocalidad: '',
            idBarrio: '',
            calleHecho: '',
            numCalle: '',
            pisoHecho: '',
            departamentoHecho: '',
            latitudHecho: '',
            longitudHecho: '',
            informacionAdicional: '',
            detalleAdjunto: '',
            detalleLugar: '',
            ...camposRoboHurto,
            ...camposIncidentesViales,
            ...camposDelitoSexual,
            ...camposDanos,
            ...camposMaltratoAnimal,
            //adjuntos: ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.descripcionQue) {
                errors.descripcionQue = 'Este campo es requerido.';
            }
            if (!data.descripcionComo) {
                errors.descripcionComo = 'Este campo es requerido.';
            }
            if (!data.fechaHecho && data.certezaFecha == 1) {
                errors.fechaHecho = 'Este campo es requerido.';
            }

            if (!data.horaHecho && data.certezaFecha == 1) {
                errors.horaHecho = 'Este campo es requerido.';
            }

            if (!data.detalleFecha && data.certezaFecha == 0) {
                errors.detalleFecha = 'Este campo es requerido.';
            }

            if (!data.idLocalidad && data.certezaLugar == 1) {
                errors.idLocalidad = 'Este campo es requerido.';
            }

            if (!data.idBarrio && data.certezaLugar == 1) {
                errors.idBarrio = 'Este campo es requerido.';
            }

            if (!data.calleHecho && data.certezaLugar == 1) {
                errors.calleHecho = 'Este campo es requerido.';
            }

            if (!data.numCalle && data.certezaLugar == 1) {
                errors.numCalle = 'Este campo es requerido.';
            }
            //console.log(formikDenuncia)
            getValidacionesRoboHurto(errors);
            getValidacionesIncidentesViales(automoviles,errors);
            getValidacionesDelitoSexual(delitoSexual,errors);
            getValidacionesDanos(errors);
            getValidacionesMaltratoAnimal(maltratoAnimal,errors);
            
            if (Object.keys(errors).length > 0) {
                errors.faltaCompletar = 'Hay campos obligatorios sin completar';
            }

            return errors;
        },
        onSubmit: (data) => {
            var datosDenuncia = new DatosDenuncia();
            Object.assign(datosDenuncia, data);
            if (datosDenuncia.certezaLugar == 0)
                datosDenuncia.idBarrio = undefined
            let propiedades = { //roboHurto
                telefonos: telefonos,
                automoviles: automoviles,
                bicicletas: bicicletas,
                autopartes: autopartes,
                documentos: documentos,
                cheques: cheques,
                tarjetas: tarjetas,
                otros: otros
            }
            datosDenuncia.danoCosas = 0;
            datosDenuncia.armas = 0;
            datosDenuncia.amenaza = 0;
            datosDenuncia.arrebato = 0;
            datosDenuncia.otra = 0;
            if (selectedOptionsRoboHurto.length != 0) {
                selectedOptionsRoboHurto.forEach(element => {
                    datosDenuncia[element.code] = 1;
                });
            }
            datosDenuncia.cantTelefonos = telefonos.length;
            datosDenuncia.cantAutomoviles = automoviles.length;
            datosDenuncia.cantBicicletas = bicicletas.length;
            datosDenuncia.cantAutopartes = autopartes.length;
            datosDenuncia.cantDocumentos = documentos.length;
            datosDenuncia.cantTarjetas = tarjetas.length;
            datosDenuncia.cantCheques = cheques.length;
            datosDenuncia.cantOtros = otros.length;
            datosDenuncia.violenciaFisica = 0,
            datosDenuncia.propiedades = propiedades;
            //incidente vial
            datosDenuncia.vehiculosIncidentes = automoviles;
            datosDenuncia.cantVehiculos = automoviles.length;

            datosDenuncia.anonimo = denuncia.anonimo
            datosDenuncia.testigo = denuncia.testigo
            datosDenuncia.datosTestigo = denuncia.datosTestigo
            datosDenuncia.datosDenunciado = denuncia.datosDenunciado
            datosDenuncia.idTipoDenuncia = denuncia.idTipoDenuncia

            if (tipoValue == 6) {
                datosDenuncia.delitoSexual = getDenunciaDelitoSexual();
            }

            if (tipoValue == 13) {
                datosDenuncia = { ...datosDenuncia, ...getDenunciaAbigeato() };
                if(datosDenuncia.abigeatoDetalles.length==0){
                    return;
                }
            }

            if (tipoValue == 14) {
                datosDenuncia = { ...datosDenuncia, ...getDenunciaDanos() };
            }


            if (tipoValue == 15) {
                datosDenuncia.maltratoAnimal = getDenunciaMaltratoAnimal();
            }

            // formikDenuncia.resetForm();
            // toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Datos de la denuncia Agregados correctamente' });
            // setDenuncia(datosDenuncia);
            // changePaso(4);
            finalizarDatosDenuncia(datosDenuncia, archivosSubidos);
        }
    });

    const isFormFieldInvalidDenuncia = (name) => !!(formikDenuncia.touched[name] && formikDenuncia.errors[name]);

    const getFormErrorMessageDenuncia = (name) => {
        if(name==='faltaCompletar'){
            if(formikDenuncia.errors[name]){
                return <small className="p-error">{formikDenuncia.errors[name]}</small>;
            }
        }
        if(name==='automovilesIncidenteVial'){
            if(formikDenuncia.errors[name]){
                return <small className="p-error">{formikDenuncia.errors[name]}</small>;
            }
        }
        return isFormFieldInvalidDenuncia(name) ? <small className="p-error">{formikDenuncia.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const recorrerArchivos = () => {
        return (
            <div className='grid'>
                {Array.from(archivosSubidos).map((archivo, index) => {
                    return (<div key={index} className='col-12'>
                        <small>{archivo.name} {(archivo.size / (1024)).toFixed(2)}KB</small>
                        <hr></hr>
                    </div>
                    )
                })}
            </div>);
    }

    const isFormDenunciaInvalid = () => {
        let isValidDenuncia = formikDenuncia.isValid;

        if(tipoValue == 6){
            isValidDenuncia = true;
        }
        if (tipoValue == 14) {
            isValidDenuncia = formikDenuncia.isValid && formikDanos.isValid;
        }
        if(tipoValue == 15){
            isValidDenuncia = true;
        }

        return !isValidDenuncia;
    }


    const changeCoord = (e) => {
        var object = JSON.parse(e)
        formikDenuncia.setFieldValue('latitudHecho', object.lat)
        formikDenuncia.setFieldValue('longitudHecho', object.lng)
    }

    const denunciaPrueba = {
        "descripcionQue": "1231231231",
        "descripcionComo": "321312312",
        "certezaFecha": 1,
        "detalleFecha": "",
        "fechaHecho": new Date("2023-11-08T03:00:00.000Z"),
        "horaHecho": new Date("2023-11-08T15:28:01.187Z"),
        "certezaLugar": 1,
        "idLocalidad": 2,
        "idBarrio": 2,
        "calleHecho": "123123",
        "numCalle": 123123,
        "pisoHecho": "13213123",
        "departamentoHecho": "13213213",
        "latitudHecho": -24.16433254301194,
        "longitudHecho": -65.29760901624938,
        "informacionAdicional": "123123123123",
        "detalleAdjunto": "123123123123",
        "detalleLugar": ""
    }


    const campo = (clase, id, name, placeholder, type, list) => {
        var array = list || [];
        var input = <div></div>
        switch (type) {
            case "Dropdown":
                input = <Dropdown inputId={id} name={id}
                    value={formikDenuncia.values[id]}
                    options={array}
                    placeholder="Selecciona una opcion"
                    onChange={(e) => {
                        formikDenuncia.setFieldValue(id, e.value);
                    }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalidDenuncia(id) })} />
                break;
            case "DropdownValue":
                input = <Dropdown inputId={id} name={id}
                    value={formikDenuncia.values[id]}
                    optionLabel="name"
                    optionValue="value"
                    options={array}
                    onBlur={formikDenuncia.handleBlur}
                    placeholder="Selecciona una opcion"
                    onChange={(e) => {
                        formikDenuncia.setFieldValue(id, e.value);
                    }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalidDenuncia(id) })} />
                break;
            case "InputText":
                input = <InputText id={id} name={id}
                    value={formikDenuncia.values[id]}
                    onChange={(e) => { formikDenuncia.setFieldValue(id, e.target.value); }}
                    onBlur={formikDenuncia.handleBlur}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalidDenuncia(id) })} />
                break;
            case "TextArea":
                input = <InputTextarea
                    id={id} name={id} rows={8} autoResize value={formikDenuncia.values[id]} placeholder={placeholder}
                    onChange={(e) => formikDenuncia.setFieldValue(id, e.target.value)}
                    className={classNames('w-full text-lg', { 'p-invalid': isFormFieldInvalidDenuncia(id) })} />
                break;
            case "TextAreaTitle":
                return (
                    <div>
                        <div className='mb-3'>
                            <h2 className='text-lightblue-mpa text-4xl'>{name}</h2>
                        </div>
                        <div className={clase}>
                            <InputTextarea
                                id={id} name={id} rows={8} autoResize value={formikDenuncia.values[id]} placeholder={placeholder}
                                onChange={(e) => formikDenuncia.setFieldValue(id, e.target.value)} onBlur={formikDenuncia.handleBlur}
                                className={classNames('w-full text-xl', { 'p-invalid': isFormFieldInvalidDenuncia(id) })} />
                            {getFormErrorMessageDenuncia(id)}
                        </div>
                    </div>
                )
                break;
            case "SelectButtonSiNo":
                return (
                    <div className={clase}>
                        <span className='form-label'>{name}</span>
                        <SelectButton value={formikDenuncia.values[id]} className='w-full md:w-4 lg:w-3'
                            onChange={(e) => formikDenuncia.setFieldValue(id, e.target.value)}
                            options={siNo} unselectable={false} optionLabel="name"
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                    </div>
                )
                break;
        }
        return (
            <div className={clase}>
                <label htmlFor={id}>{name}</label>
                {input}
                {getFormErrorMessageDenuncia(id)}
            </div>
        )
    }

    return (
        <>
            <div id='container' className='mt-6 px-6'>
                <div className='mx-5 mt-3'>
                    {/* <Button label='A' onClick={e => { console.log(formikDenuncia.errors); console.log(formikDenuncia.values) }}></Button> */}
                    {/* <Button label='llenar campos' onClick={(e) => formikDenuncia.setValues(denunciaPrueba)}></Button> */}
                    <h1 className='text-center mb-6'>Datos del Hecho</h1>

                    <form onSubmit={formikDenuncia.handleSubmit}>
                        {campo('field', 'descripcionQue', '¿Qué pasó?', 'Escriba aquí...', 'TextAreaTitle', [])}
                        <Divider className="my-6" />
                        {campo('field', 'descripcionComo', '¿Cómo pasó?', 'Escriba aquí...', 'TextAreaTitle', [])}
                        <Divider className="my-6" />

                        <CallForm
                            tipoValue={tipoValue}
                            abigeato={abigeato} setAbigeato={setAbigeato}
                        />

                        <Divider className="my-6" />

                        <div>
                            <div className='mb-4'>
                                <h2 className='text-lightblue-mpa text-4xl'>¿Cuándo pasó?</h2>
                            </div>

                            <div className='formgrid grid'>
                                {/* <div className="field col-12 mb-6">
                                    <span className='form-label'>¿Conoce la fecha en la cual ocurrió el hecho?</span>
                                    <SelectButton value={formikDenuncia.values.certezaFecha} className='w-full md:w-4 lg:w-3' onChange={(e) => formikDenuncia.setFieldValue('certezaFecha', e.target.value)} options={siNo} unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                                </div>
                                //SelectBUttonClass */}
                                {campo('field col-12 mb-6', 'certezaFecha', '¿Conoce la fecha en la cual ocurrió el hecho?', '', 'SelectButtonSiNo', [])}

                                {formikDenuncia.values.certezaFecha == 1 ?
                                    <div className='col-12'>
                                        <div className="formgrid grid">
                                            <div className='field col-12 sm:col-6 md:col-4 lg:col-3'>
                                                <label htmlFor="fechaHecho">Fecha del hecho</label>
                                                <Calendar
                                                    inputId='fechaHecho'
                                                    name="fechaHecho"
                                                    value={formikDenuncia.values.fechaHecho}
                                                    showIcon
                                                    onBlur={formikDenuncia.handleBlur}
                                                    placeholder='Fecha del hecho'
                                                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalidDenuncia('fechaHecho') })}
                                                    onChange={(e) => {
                                                        formikDenuncia.setFieldValue('fechaHecho', e.target.value);
                                                    }}
                                                    pt={{
                                                        dropdownButton: {
                                                            root: { className: 'btn-blue-mpa' }
                                                        }
                                                    }}
                                                />
                                                {getFormErrorMessageDenuncia('fechaHecho')}
                                            </div>
                                            <div className='field col-12 sm:col-6 md:col-4 lg:col-3'>
                                                <label htmlFor="horaHecho">Hora del hecho</label>
                                                <Calendar
                                                    inputId='horaHecho'
                                                    name="horaHecho"
                                                    value={formikDenuncia.values.horaHecho}
                                                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalidDenuncia('horaHecho') })}
                                                    showIcon
                                                    onBlur={formikDenuncia.handleBlur}
                                                    placeholder='Hora del hecho'
                                                    onChange={(e) => {
                                                        formikDenuncia.setFieldValue('horaHecho', e.target.value);
                                                    }}
                                                    pt={{
                                                        dropdownButton: {
                                                            root: { className: 'btn-blue-mpa' }
                                                        }
                                                    }}
                                                    timeOnly
                                                />
                                                {getFormErrorMessageDenuncia('horaHecho')}
                                            </div>
                                        </div>
                                    </div> :
                                    <>
                                        {campo('field col', 'detalleFecha', 'Fecha Aproximada del Hecho', 'Ingrese la fecha Aproximada del hecho', 'TextArea', [])}
                                    </>
                                }
                            </div>
                        </div>

                        <Divider className="my-6" />

                        <div>
                            <div>
                                <h2 className='text-lightblue-mpa text-4xl'>¿Dónde Pasó?</h2>
                            </div>
                            {campo('field mb-6', 'certezaLugar', '¿Conoce el lugar en la cual ocurrió el hecho?', '', 'SelectButtonSiNo', [])}
                            {formikDenuncia.values.certezaLugar == 1 ?
                                <div>
                                    <div className="formgrid grid">
                                        {campo('field col', 'idLocalidad', 'Localidad del Hecho', 'Seleccione una Opcion...', 'DropdownValue', localidades)}
                                        {campo('field col', 'idBarrio', 'Barrio', 'Seleccione una Opcion...', 'DropdownValue', barrios)}
                                    </div>
                                    {campo('field', 'calleHecho', 'Calle del Hecho', 'Escriba la calle del Hecho', 'InputText', [])}
                                    <div className="formgrid grid">
                                        <div className='field col'>
                                            <label htmlFor="numCalle">Numero de la Calle</label>
                                            <InputNumber
                                                inputId="numCalle"
                                                name="numCalle"
                                                value={formikDenuncia.values.numCalle}
                                                onBlur={formikDenuncia.handleBlur}
                                                onValueChange={(e) => { formikDenuncia.setFieldValue('numCalle', e.value); }}
                                                inputClassName={classNames({ 'p-invalid': isFormFieldInvalidDenuncia('numCalle') })}
                                                className='w-full' pt={{ input: { root: { autoComplete: 'off' } } }} />
                                            {getFormErrorMessageDenuncia('numCalle')}
                                        </div>
                                        {campo('field col', 'pisoHecho', 'Piso del Hecho', 'Escriba el piso del Hecho', 'InputText', [])}
                                        {campo('field col', 'departamentoHecho', 'Departamento del Hecho', 'Escriba el departamento del Hecho', 'InputText', [])}
                                    </div>
                                    <div className='field'>
                                        <h3 htmlFor="georeferencia">Georreferencia</h3>
                                        <MapTemplate changeCoord={changeCoord} center={{ lat: -24.186379279111186, lng: -65.29943995917819 }}></MapTemplate>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="formgrid grid">
                                        {campo('field col', 'idLocalidad', 'Localidad del Hecho', 'Seleccione una Opcion...', 'DropdownValue', localidades)}
                                    </div>
                                    {campo('field', 'detalleLugar', 'Detalle del Lugar', 'Informacion adicional para identificar el lugar', 'TextArea', [])}
                                </div>
                            }
                        </div>

                        <Divider className="my-6" />


                        {campo('field', 'informacionAdicional', 'Información Adicional', 'Escriba aqui...', 'TextAreaTitle', [])}


                        <Divider className="my-6" />

                        {campo('field', 'detalleAdjunto', 'Adjuntos / Evidencias', 'Escriba aqui la descripción de la documentación y/o Evidencia Adjuntada', 'TextAreaTitle', [])}

                        {/* <div className="field">
                            <label htmlFor="detalleAdjunto">Descripcion de la documentacion y/o evidencia adjuntada</label>
                            <InputTextarea
                                autoResize value={formikDenuncia.values.detalleAdjunto}
                                onChange={(e) => formikDenuncia.setFieldValue('detalleAdjunto', e.target.value)}
                                rows={8} className='w-full text-lg' placeholder='Descripción de la documentación y/o Evidencia Adjuntada (Filmaciones, Documentación, Fotografías, Grabaciones, etc. )' />
                        </div> */}
                        <div className='field mt-6'>
                            <label htmlFor="adjuntos">Archivos Adjuntos (optativo)</label>
                            <div style={{ position: "relative" }}>
                                <label className={classNames({ 'file-style': archivosSubidos.length > 0 || touchedFiles == false, 'file-style-invalid': touchedFiles == true && archivosSubidos.length == 0 })}>
                                    <i className="pi pi-cloud-upload text-5xl"></i>
                                    <p>Arrastre o Haga click para subir Archivos</p>
                                </label>
                                <input id="file" type='file' multiple onClick={e => setTouchedFiles(true)}
                                    onChange={(e) => { setArchivosSubidos(e.target.files); setTouchedFiles(true) }}></input>
                            </div>
                            <div className='mt-3 mb-5'>
                                {recorrerArchivos()}
                                <small hidden={touchedFiles == false || archivosSubidos.length > 0} className='p-error'>Este campo es requerido.</small>
                            </div>
                        </div>

                        {getFormErrorMessageDenuncia('faltaCompletar')}
                        <Divider className="my-6" />

                        <div className="grid">
                            <div className="col-12 sm:col-5 md:col-4 ">
                                <Button className='text-lightblue-mpa w-full py-4' label='Volver Atrás'
                                    type='button' link onClick={(e) => { changePaso(2) }} />
                            </div>
                            <div className="col-12 sm:col-7 md:col-8 ">
                                 <Button type="submit" className='w-full btn-blue-mpa py-4' icon='pi pi-chevron-right' iconPos='right' label="Siguiente Paso" 
                                    onClick={(e) => {setValidacion(true);setValidaDanos(true)}}
                                 /> {/*disabled={isFormDenunciaInvalid()} */}
                            </div>
                        </div>
                    </form >
                </div >
            </div >
        </>
    )
}


const CallForm = memo(({
    tipoValue,
    abigeato, setAbigeato
}) => {
    switch (tipoValue) {
        case 1:
            return (
                <div>
                    <RoboHurto></RoboHurto>
                </div>
            )
        case 2:
            return(
                <div>
                    <DelitosContraPersonas></DelitosContraPersonas>
                </div>
            )
        case 4:
            return (
                <div>
                    <IncidentesViales />
                </div>
            )
        case 6:
            return (
                <DelitoSexual 
                    //form={form}
                />
            )
        case 13:
            return(
                <Abigeato
                    abigeato={abigeato}
                    setAbigeato={setAbigeato}
                />
            )
        case 14:
            return (
                <Danos/>
            )
        case 15:
            return (
                <MaltratoAnimal

                />
            )
    }
})

export default memo(FormularioDenuncia);