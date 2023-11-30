import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import MapView from './pages/Denuncias/templates/MapView';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { crearDenuncia } from '../api/denuncias.api';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import {
  getBarrios,
  getDepartamentos,
  getLocalidades,
  getNacionalidades,
  getProvincias,
} from '../api/adicional.api';
import { useDelitosContraPersonasContext } from '../pages/Denuncia/Denuncia';
import { captcha } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

export default function FormularioDenunciante(props) {
  const navigate = useNavigate();

  const [dialogEnviando, setDialogEnviando] = useState(false);
  const [hasId, setHasId] = useState(false);
  const [responseDenuncia, setResponseDenuncia] = useState({
    nroDenuncia: 0,
    email: '',
  });
  const [response, setResponse] = useState(null);
  const recaptchaRef = React.createRef();
  const toast = useRef(null);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const {
    lesiones,
    homicidio,
    femicidio,
    setLesiones,
    setHomicidio,
    setFemicidio,
  } = useDelitosContraPersonasContext();

  const [denunciaCreada, setDenunciaCreada] = useState(false);

  //https://www.google.com/recaptcha/api/siteverify
  useEffect(() => {
    scrollTo({ top: 0, behavior: 'instant' });

    getProvincias().then(({ data: { data } }) => {
      setProvincias(data);
    });

    getNacionalidades().then(({ data: { data } }) => {
      setNacionalidades(data);
    });

    getDepartamentos().then(({ data: { data } }) => {
      setDepartamentos(data);
    });

    getLocalidades('').then(({ data: { data } }) => {
      setLocalidades(data);
    });

    getBarrios('').then(({ data: { data } }) => {
      setBarrios(data);
    });
  }, []);

  const check = () => {
    console.log(props.denuncia);
  };

  function onChange(value) {
    setResponse(value);
    console.log(response);
    console.log(value);
  }

  const onSubmited = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    console.log('Submit' + recaptchaValue);
    this.props.onSubmit(recaptchaValue);
  };

  const buscarValorIntrafamiliar = (lista, valor) => {
    return lista.find((e) => e.code == valor);
  };

  const getDenunciaIntrafamiliar = () => {
    let denunciaIntrafamiliar = props.denunciaIntrafamiliar;
    let denunciaIntrafamiliarCompleta = {
      situacion1: denunciaIntrafamiliar.situacionHacinamiento == 'Si' ? 1 : 0,
      situacion2: denunciaIntrafamiliar.tituloPropiedad == 'Si' ? 1 : 0,
      situacion3: denunciaIntrafamiliar.viveConAgresor == 'Si' ? 1 : 0,
      situacion4: denunciaIntrafamiliar.medidasRestriccion == 'Si' ? 1 : 0,
      tipoViolencia1: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.tiposViolencia,
        'tipoviolencia1'
      )
        ? 1
        : 0,
      tipoViolencia2: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.tiposViolencia,
        'tipoviolencia2'
      )
        ? 1
        : 0,
      tipoViolencia3: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.tiposViolencia,
        'tipoviolencia3'
      )
        ? 1
        : 0,
      tipoViolencia4: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.tiposViolencia,
        'tipoviolencia4'
      )
        ? 1
        : 0,
      tipoViolencia5: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.tiposViolencia,
        'tipoviolencia5'
      )
        ? 1
        : 0,
      tipoViolencia6: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.tiposViolencia,
        'tipoviolencia6'
      )
        ? 1
        : 0,
      perfilAgresor1: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.perfilAgresor,
        'perfilagresor1'
      )
        ? 1
        : 0,
      perfilAgresor2: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.perfilAgresor,
        'perfilagresor2'
      )
        ? 1
        : 0,
      perfilAgresor3: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.perfilAgresor,
        'perfilagresor3'
      )
        ? 1
        : 0,
      perfilAgresor4: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.perfilAgresor,
        'perfilagresor4'
      )
        ? 1
        : 0,
      perfilAgresor5: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.perfilAgresor,
        'perfilagresor5'
      )
        ? 1
        : 0,
      perfilAgresor6: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.perfilAgresor,
        'perfilagresor6'
      )
        ? 1
        : 0,
      victima1: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima1'
      )
        ? 1
        : 0,
      victima2: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima2'
      )
        ? 1
        : 0,
      victima3: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima3'
      )
        ? 1
        : 0,
      victima4: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima4'
      )
        ? 1
        : 0,
      victima5: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima5'
      )
        ? 1
        : 0,
      victima6: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima6'
      )
        ? 1
        : 0,
      victima7: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.victima,
        'victima7'
      )
        ? 1
        : 0,
      caracteristica1: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.caracteristicasVictima,
        'caracteristica1'
      )
        ? 1
        : 0,
      caracteristica2: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.caracteristicasVictima,
        'caracteristica2'
      )
        ? 1
        : 0,
      caracteristica3: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.caracteristicasVictima,
        'caracteristica3'
      )
        ? 1
        : 0,
      caracteristica4: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.caracteristicasVictima,
        'caracteristica4'
      )
        ? 1
        : 0,
      caracteristica5: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.caracteristicasVictima,
        'caracteristica5'
      )
        ? 1
        : 0,
      caracteristica6: buscarValorIntrafamiliar(
        denunciaIntrafamiliar.caracteristicasVictima,
        'caracteristica6'
      )
        ? 1
        : 0,
    };
    return denunciaIntrafamiliarCompleta;
  };

  const getDenunciaViolenciaGenero = () => {
    let denunciaViolenciaGenero = props.anexoViolenciaGenero;
    let denunciaViolenciaGeneroCompleta = {
      situacion1: 0,
      situacion2: 0,
      tipoViolencia1: 0,
      tipoViolencia2: 0,
      tipoViolencia3: 0,
      tipoViolencia4: 0,
      tipoViolencia5: 0,
      tipoViolencia6: 0,
      tipoViolencia7: 0,
      perfilAgresor1: 0,
      perfilAgresor2: 0,
      perfilAgresor3: 0,
      perfilAgresor4: 0,
      perfilAgresor5: 0,
      perfilAgresor6: 0,
      perfilAgresor7: 0,
      vulnerabilidades1: 0,
      vulnerabilidades2: 0,
      vulnerabilidades3: 0,
      vulnerabilidades4: 0,
    };

    if (denunciaViolenciaGenero.situacion) {
      denunciaViolenciaGenero.situacion.forEach((situacion) => {
        denunciaViolenciaGeneroCompleta[situacion.denuncia] = 1;
      });
    }

    if (denunciaViolenciaGenero.tipoViolencia) {
      denunciaViolenciaGenero.tipoViolencia.forEach((tipoViolencia) => {
        denunciaViolenciaGeneroCompleta[tipoViolencia.denuncia] = 1;
      });
    }

    if (denunciaViolenciaGenero.perfilAgresor) {
      denunciaViolenciaGenero.perfilAgresor.forEach((perfilAgresor) => {
        denunciaViolenciaGeneroCompleta[perfilAgresor.denuncia] = 1;
      });
    }

    if (denunciaViolenciaGenero.vulnerabilidades) {
      denunciaViolenciaGenero.vulnerabilidades.forEach((vulnerabilidades) => {
        denunciaViolenciaGeneroCompleta[vulnerabilidades.denuncia] = 1;
      });
    }

    return denunciaViolenciaGeneroCompleta;
  };

  // const getDenunciaPropiedad  = () =>{
  //     const circunstancias = props;
  //     console.log(cis)
  // }
  async function getIP() {
    const res = await axios.get('https://api.ipify.org/?format=json');
    return res;
  }

  async function getCaptcha(body) {
    const res = await captcha(body);
    return await res;
  }

  const send = async () => {
    if (response != null) {
      console.log('Pido IP');
      const res = getIP().then((data) => {
        let cuerpo;
        cuerpo = { response: response, remoteIp: data.ip };
        console.log('pido catpcha');
        getCaptcha(cuerpo).then((e) => {
          console.log('Catpcha');
          console.log(e);
          if (e.data.data.success == true) {
            console.log('Success');
            //setDialogEnviando(true);
            var denunciaCompleta = {};

            let datosViolenciaGenero;
            if (props.anexoViolenciaGenero != null) {
              datosViolenciaGenero = getDenunciaViolenciaGenero();
            }

            let datosDenunciaIntrafamiliar;
            if (props.denunciaIntrafamiliar != null) {
              datosDenunciaIntrafamiliar = getDenunciaIntrafamiliar();
            }

            let datosDelitosContraPersonas;
            if (props.tipoDenuncia == 2) {
              datosDelitosContraPersonas = {
                lesiones: lesiones,
                homicidio: homicidio,
                femicidio: femicidio,
              };
            }

            var datDen = {
              ...datosDelitosContraPersonas,
              ...datosDenunciaIntrafamiliar,
              ...datosViolenciaGenero,
              ...props.denuncia,
              ...props.denuncia?.delitoSexual,
              ...props.denuncia?.maltratoAnimal,
              idTipoDenuncia: props.strDenuncia,
            };
            denunciaCompleta = {
              denuncia: datDen,
              intervinientes: props.intervinientes,
              denunciantes: props.denunciantes,
              victimasRelaciones: props.victimasRelaciones,
              fotosDni: props.fotosDni,
              //denunviaViolenciaGenero: datosViolenciaGenero
            };

            //formateo de fechas a mm/dd/aaaa
            if (denunciaCompleta.intervinientes) {
              denunciaCompleta.intervinientes.forEach(
                (interviniente, index) => {
                  if (interviniente.fechaNacimiento) {
                    //opcional
                    denunciaCompleta.intervinientes[index].fechaNacimiento =
                      new Date(
                        interviniente.fechaNacimiento
                      ).toLocaleDateString('en-GB');
                  }
                }
              );
            }
            if (denunciaCompleta.denunciantes) {
              denunciaCompleta.denunciantes.forEach((denunciante, index) => {
                denunciaCompleta.denunciantes[index].fechaNacimiento = new Date(
                  denunciante.fechaNacimiento
                ).toLocaleDateString('en-GB');
              });
            }
            //fin formateo de fechas
            if (denunciaCompleta.denuncia.certezaFecha == 0) {
              //no conoce la fecha y hora
              denunciaCompleta.denuncia.fechaHecho = undefined;
              denunciaCompleta.denuncia.horaHecho = undefined;
            }

            //prueba
            //denunciaCompleta.intervinientes[0].nombre = '';

            console.log(denunciaCompleta);
            console.log(datDen);

            const dataPost = new FormData();
            const dataString = JSON.stringify({ ...denunciaCompleta });
            dataPost.append('data', dataString);

            props.fotosDni.forEach((foto) => {
              const myNewFile = new File([foto], foto.id + '_' + foto.name, {
                type: foto.type,
              });
              dataPost.append('filedni', myNewFile);
            });
            console.log(props.adjuntos);

            Array.from(props.adjuntos).forEach((archivo) => {
              dataPost.append('file', archivo);
            });

            // const response = await api.0<
            axios
              .post('http://192.200.0.53:3000/api/denuncias/create', dataPost, {
                headers: { 'Content-Type': 'multipart/form-data' },
              })
              .then((res) => {
                if (props.denunciaIntrafamiliar != null) {
                  //deberia crear la denuncia intrafamiliar
                  //denunciaIntrafamiliar.idDenuncia = res.data.idDenuncia;
                  //crearDenunciaIntrafamiliar(denunciaIntrafamiliar);
                }
                console.log(res);
                setResponseDenuncia(res.data); //.idDenuncia;
                setHasId(true);
                setDenunciaCreada(true);
              });

            /*  crearDenuncia(denunciaCompleta).then((res) => {
                              console.log(res);
                              if (props.denunciaIntrafamiliar != null) {//deberia crear la denuncia intrafamiliar 
                                  //denunciaIntrafamiliar.idDenuncia = res.data.idDenuncia;
                                  //crearDenunciaIntrafamiliar(denunciaIntrafamiliar);
                              }
                              setResponseDenuncia(res.data)//.idDenuncia;
                              setHasId(true);
                          });*/
          } else console.log('Captcha Invalido');
        });
      });
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete el Captcha para continuar',
        life: 3000,
      });
    }
  };

  const datosArray = (array) => {
    return (
      <div className='grid'>
        {array.map((den, index) => {
          //props.denunciantes
          return (
            <div className='col-12 md:col-6 lg:col-6 xl:col-4 mb-4' key={index}>
              <div className='border-1 h-full'>
                <div className='mx-3'>
                  <h3 className='underline'>
                    Datos{' '}
                    {den.idIntervinienteTipo === 1
                      ? 'Victima'
                      : den.idIntervinienteTipo === 5
                      ? 'Denunciado'
                      : den.idIntervinienteTipo === 9 && 'Testigo'}
                  </h3>
                  {/* <p><span className='font-bold'>Calidad: </span>{den.calidad}</p> */}
                  <div className='grid'>
                    <div className='col-12 grid'>
                      <div className='col-12 lg:col-6'>
                        <span className='font-bold'>
                          Numero de {den.tipoIdentificacion}:{' '}
                        </span>
                        {den.numeroIdentificacion}
                      </div>
                      {den.alias != '' && (
                        <div className='col-12 lg:col-6'>
                          <span className='font-bold'>Alias: </span>
                          {den.alias}
                        </div>
                      )}
                    </div>
                    <div className='col-12'>
                      <span className='font-bold'>Nombre Completo: </span>
                      {den.apellido}, {den.nombre}
                    </div>
                    <div className='col-12'>
                      <span className='font-bold'>
                        Identidad Autopercibida:{' '}
                      </span>
                      {den.identidadAutopercibida}
                    </div>
                    <div className='col-12'>
                      <span className='font-bold'>Fecha de Nacimiento: </span>
                      {new Date(den.fechaNacimiento).toLocaleDateString(
                        'en-GB'
                      )}
                    </div>
                    <div className='col-12'>
                      <span className='font-bold'>Nacionalidad: </span>
                      {nacionalidades.filter((e) => e.value == den.idPais).name}
                    </div>
                    {/* TODO: Revisar si las nacionalidades se muestran corectamente al tenre el back encendido */}
                    <div className='col-12'>
                      <span className='font-bold'>
                        <i className='text-2xl bi bi-house-fill'></i>{' '}
                      </span>
                      {den.localidad}, {den.barrio}, {den.direccion}
                    </div>
                    <div className='col-12'></div>
                  </div>
                  {/* <div className='w-full'>
                                        <MapView coords={{ lat: den.latitud, lng: den.longitud }}></MapView>
                                    </div> */}
                  {/* {Array.from(den.fotosDni).map((foto) => {
                                        return (<> <img key={foto.toString()} className='img-fluid' src={foto} alt="" /></>)
                                    })} */}
                  {den.informacionAdicional != undefined &&
                    den.informacionAdicional != null &&
                    den.informacionAdicional != '' && (
                      <div className='col-12'>
                        <span className='font-bold'>
                          Informacion Adicional:{' '}
                        </span>
                        {den.informacionAdicional}
                      </div>
                    )}
                  <h3 className='underline'>Datos de Contacto</h3>
                  <p>
                    <span className='font-bold'>
                      <i className='text-2xl bi bi-telephone-fill'></i>{' '}
                    </span>
                    {den.telefonoFijo}
                  </p>
                  <p>
                    <span className='font-bold'>
                      <i className='text-2xl bi bi-whatsapp'></i>{' '}
                    </span>
                    {den.telefonoMovil}
                  </p>
                  <p>
                    <span className='font-bold'>
                      <i className='text-2xl bi bi-envelope-at-fill'></i>{' '}
                    </span>
                    {den.email}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const datosViolenciaGenero = (datosViolenciaGenero) => {
    return (
      <div>
        <h3>
          Situaciones en las cuales se encuentra la víctima con respecto a su
          pareja:{' '}
          {!datosViolenciaGenero.situacion
            ? '----'
            : datosViolenciaGenero.situacion.length == 0 && '----'}
        </h3>
        {!datosViolenciaGenero.situacion
          ? ''
          : datosViolenciaGenero.situacion.map((item) => (
              <p key={item.denuncia}>{item.label}</p>
            ))}
        <h3>
          Episodios que sufrió la víctima:{' '}
          {!datosViolenciaGenero.tipoViolencia
            ? '----'
            : datosViolenciaGenero.tipoViolencia.length == 0 && '----'}
        </h3>
        {!datosViolenciaGenero.tipoViolencia
          ? ''
          : datosViolenciaGenero.tipoViolencia.map((item) => (
              <p key={item.denuncia}>{item.label}</p>
            ))}
        <h3>
          Conductas que posee el agresor:{' '}
          {!datosViolenciaGenero.perfilAgresor
            ? '----'
            : datosViolenciaGenero.perfilAgresor.length == 0 && '----'}
        </h3>
        {!datosViolenciaGenero.perfilAgresor
          ? ''
          : datosViolenciaGenero.perfilAgresor.map((item) => (
              <p key={item.denuncia}>{item.label}</p>
            ))}
        <h3>
          Vulnerabilidades que presenta la víctima:{' '}
          {!datosViolenciaGenero.vulnerabilidades
            ? '----'
            : datosViolenciaGenero.vulnerabilidades.length == 0 && '----'}
        </h3>
        {!datosViolenciaGenero.vulnerabilidades
          ? ''
          : datosViolenciaGenero.vulnerabilidades.map((item) => (
              <p key={item.denuncia}>{item.label}</p>
            ))}
      </div>
    );
  };

  const datosViolenciaIntrafamiliar = (datosViolenciaIntrafamiliar) => {
    return (
      <div className='mb-5 border-1 border-round pl-3'>
        <div>
          <h4>
            Situaciones familiares{' '}
            {!datosViolenciaIntrafamiliar.viveConAgresor ||
            !datosViolenciaIntrafamiliar.medidasRestriccion ||
            !datosViolenciaIntrafamiliar.tituloPropiedad ||
            !datosViolenciaIntrafamiliar.situacionHacinamiento
              ? ': ----'
              : null}
          </h4>
          {datosViolenciaIntrafamiliar.viveConAgresor ||
          datosViolenciaIntrafamiliar.medidasRestriccion ||
          datosViolenciaIntrafamiliar.tituloPropiedad ||
          datosViolenciaIntrafamiliar.situacionHacinamiento ? (
            <ul>
              <li>
                ¿La víctima convive con el agresor?:{' '}
                <span className='font-bold'>
                  {datosViolenciaIntrafamiliar.viveConAgresor}
                </span>{' '}
              </li>
              <li>
                ¿Hubieron medidas de restricción previas o denuncias contra el
                agresor?:{' '}
                <span className='font-bold'>
                  {datosViolenciaIntrafamiliar.medidasRestriccion}
                </span>{' '}
              </li>
              <li>
                ¿El agresor posee título de propiedad de la vivienda en la que
                vive la víctima?:{' '}
                <span className='font-bold'>
                  {datosViolenciaIntrafamiliar.tituloPropiedad}
                </span>{' '}
              </li>
              <li>
                ¿La víctima vive en situación de hacinamiento?:{' '}
                <span className='font-bold'>
                  {datosViolenciaIntrafamiliar.situacionHacinamiento}
                </span>{' '}
              </li>
            </ul>
          ) : null}
        </div>
        <div>
          <h4>
            Tipos de violencias{' '}
            {!datosViolenciaIntrafamiliar.tiposViolencia
              ? ': ----'
              : datosViolenciaIntrafamiliar.tiposViolencia.length == 0 &&
                '----'}
          </h4>
          <ul>
            {!datosViolenciaIntrafamiliar.tiposViolencia
              ? ''
              : datosViolenciaIntrafamiliar.tiposViolencia.map((item) => (
                  <li key={item.code}>{item.label}</li>
                ))}
          </ul>
        </div>
        <div>
          <h4>
            Conductas que posee el agresor{' '}
            {!datosViolenciaIntrafamiliar.perfilAgresor
              ? ': ----'
              : datosViolenciaIntrafamiliar.perfilAgresor.length == 0 && '----'}
          </h4>
          <ul>
            {!datosViolenciaIntrafamiliar.perfilAgresor
              ? ''
              : datosViolenciaIntrafamiliar.perfilAgresor.map((item) => (
                  <li key={item.code}>{item.label}</li>
                ))}
          </ul>
        </div>
        <div>
          <h4>
            Víctima{' '}
            {!datosViolenciaIntrafamiliar.victima
              ? ': ----'
              : datosViolenciaIntrafamiliar.victima.length == 0 && '----'}{' '}
          </h4>
          <ul>
            {!datosViolenciaIntrafamiliar.victima
              ? ''
              : datosViolenciaIntrafamiliar.victima.map((item) => (
                  <li key={item.code}>{item.label}</li>
                ))}
          </ul>
        </div>
        <div>
          <h4>
            Vulnerabilidades que presenta la víctima{' '}
            {!datosViolenciaIntrafamiliar.caracteristicasVictima
              ? ': ----'
              : datosViolenciaIntrafamiliar.caracteristicasVictima.length ==
                  0 && '----'}
          </h4>
          <ul>
            {!datosViolenciaIntrafamiliar.caracteristicasVictima
              ? ''
              : datosViolenciaIntrafamiliar.caracteristicasVictima.map(
                  (item) => <li key={item.code}>{item.label}</li>
                )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id='container' className='mt-6 px-4 md:px-6'>
        <Toast ref={toast} />
        <div className='mx-2 md:mx-5 mt-3'>
          {/* <Button type='button' label='checkValue' onClick={check}></Button> */}
          <h1 className='text-center'>Resumen de la Denuncia</h1>

          <div className='mb-3'>
            <div className=''>
              <h2 className='text-lightblue-mpa text-3xl'>Datos Generales</h2>
            </div>

            <div className='mb-4'>
              <div className='flex justify-content-center flex-wrap'>
                <div className='flex align-items-center justify-content-center text-lg w-full md:w-6 mb-2 md:mb-0'>
                  <span className='font-bold'>Fecha:&nbsp;</span>
                  {new Date().toLocaleDateString() +
                    ' ' +
                    new Date().toLocaleTimeString()}
                </div>
                <div className='flex align-items-center justify-content-center text-lg w-full md:w-6'>
                  <span className='font-bold'>Tipo:&nbsp;</span>
                  {props.strDenuncia}
                </div>
              </div>
            </div>

            <div className=''>
              <h2 className='text-lightblue-mpa text-3xl'>Datos del Hecho</h2>
            </div>
            <div className='grid text-lg'>
              {/* esta parte falla */}
              {/* <div className='col-12'><span className='font-bold'>Momento del Hecho:</span> {props.denuncia.fechaDelhechotoLocaleDateString('en-GB')} {props.denuncia.horaDelhecho.toLocaleTimeString()} </div> */}
              <div className='col-12'>
                <span className='font-bold'>¿Qué Paso?:</span>{' '}
                {props.denuncia.descripcionQue}
              </div>
              <div className='col-12 mb-3'>
                <span className='font-bold'>¿Cómo Paso?:</span>{' '}
                {props.denuncia.descripcionComo}
              </div>
              <div className='col-12'>
                <span className='font-bold'>¿Dónde Paso?:</span>
                {props.denuncia.certezaLugar == 1 ? (
                  <>
                    <span>
                      &nbsp;
                      {
                        localidades.find(
                          (loc) => loc.value == props.denuncia.idLocalidad
                        )?.name
                      }{' '}
                    </span>
                    {props.denuncia.idBarrio && (
                      <span>
                        ,{' '}
                        {
                          barrios.find(
                            (bar) => bar.value == props.denuncia.idBarrio
                          )?.name
                        }
                        , {props.denuncia.calleHecho}, {props.denuncia.numCalle}
                      </span>
                    )}
                    <div>
                      {props.denuncia.pisoHecho &&
                        props.denuncia.pisoHecho +
                          ', ' +
                          props.denuncia.departamentoHecho}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className='col-12'>
                <span className='font-bold'>Informacion Adicional:</span>{' '}
                {props.denuncia.informacionAdicional}{' '}
              </div>
              <div className='col-12'>
                <span className='font-bold'>Descripcion Adjuntos:</span>{' '}
                {props.denuncia.detalleAdjunto}{' '}
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <div className=''>
              <h2 className='text-lightblue-mpa text-3xl'>
                Datos Denunciantes
              </h2>
            </div>
            {/* {datosDenunciante()} */}
            {datosArray(props.denunciantes)}
          </div>
          <div className='mb-3'>
            <div className=''>
              <h2 className='text-lightblue-mpa text-3xl'>
                Datos Intervinientes
              </h2>
            </div>
            {/* {datosDenunciados(props.intervinientes)} */}
            {datosArray(props.intervinientes)}
          </div>
          {/* <div className='mb-3'>
                        <div className='flex mb-5'>
                            <div className='px-4 border-1 border-round'>
                                <h2 className='text-blue-500'>Datos Testigos</h2>
                            </div>
                        </div>
                        {datosDenunciados(props.testigos, "Testigos")}
                    </div> */}

          {props.tipoDenuncia == 5 && (
            <div className='mb-3'>
              <div className=''>
                <h2 className='text-lightblue-mpa text-3xl'>
                  Datos Violencia de Genero
                </h2>
              </div>
              {datosViolenciaGenero(props.anexoViolenciaGenero)}
            </div>
          )}

          {props.tipoDenuncia == 7 && (
            <div className='mb-3'>
              <div className=''>
                <h2 className='text-lightblue-mpa text-3xl'>
                  Datos Violencia Intrafamiliar
                </h2>
              </div>
              {datosViolenciaIntrafamiliar(props.denunciaIntrafamiliar)}
            </div>
          )}

          <div className='mb-7 border-3 border-round mt-8'>
            <div className='mx-4 px-4 py-4'>
              <h1 className='text-center py-3 border-bottom-2 mb-6'>
                Términos y condiciones
              </h1>
              <p>
                1. Este sistema no tiene como objetivo la comunicación o informe
                de urgencias o emergencias, en ese caso debe utilizar como vía
                de contacto la línea telefónica 911 prevista a tal efecto.
              </p>
              <p>
                2. Si ya han informado el hecho por otro canal formal de
                denuncia, no debe reportarlo nuevamente utilizando este sistema.
              </p>
              <p>
                3. Esta aplicación te acerca la posibilidad de informar hechos
                delictivos a la justicia y la misma deberá ser ratificada en la
                delegación fiscal o fiscalía mas próxima a su ubicación dentro
                de los 5 (cinco) días hábiles con tu DNI físico, caso contrario
                el ayudante fiscal o fiscal interviniente podrá archivarla sin
                más trámite. Consulte las delegaciones fiscales:&nbsp;
                <a
                  href='https://mpajujuy.gob.ar/listado-delegaciones'
                  target='_blank'
                >
                  https://mpajujuy.gob.ar/listado-delegaciones
                </a>{' '}
                o las fiscalías en siguiente enlace:&nbsp;
                <a
                  href='https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales'
                  target='_blank'
                >
                  https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales
                </a>
              </p>
              <p>
                4. Si hay que darle tratamiento{' '}
                <span className='font-bold'>URGENTE</span>, por favor dirígete
                hasta la comisaria, delegación fiscal o fiscalía mas próxima a
                tu ubicación.
              </p>
              <p>
                5. Para aquellos casos en que se proporcionen datos personales,
                los mismos deberán poseer la documentación respaldatoria.
              </p>
              <p>
                6. Quien informe delitos lo hará con la responsabilidad que esto
                amerita y la certeza sobre la ocurrencia del mismo.
              </p>
              <p>
                7. Se adoptarán todas las medidas técnicas de integridad y
                seguridad de los datos necesarias para garantizar la seguridad y
                confidencialidad de los datos personales, de modo de evitar su
                adulteración, pérdida, consulta o tratamiento no autorizado, y
                que permitan detectar desviaciones, intencionales o no, de
                información, ya sea que los riesgos provengan de la acción
                humana o del medio técnico utilizado.
              </p>
              <p>
                8. La información suministrada no se almacena en el dispositivo
                móvil una vez que es enviada al servidor.
              </p>
              <p>
                9. Si opta por realizar este proceso de forma anónima no
                aplicarán los puntos 3 y 5 arriba definidos.
              </p>
              <p>
                10. Acepto ser notificado de la denuncia y todo otro acto
                vinculado u originado a raíz de la misma al correo electrónico
                y/o via WhatsApp al número de teléfono proporcionado.{' '}
              </p>
              <p>
                <span className='font-bold'>Falsa denuncia:</span> Al realizar
                una denuncia, Usted debe saber que si la realiza falsamente -es
                decir, miente en lo que nos está informando-, está cometiendo un
                delito con penas de prisión de dos meses a un año o multa
                (artículo 245 del Código Penal).
              </p>
            </div>
          </div>
          {/* {
                        denuncia: datosDenuncia,
                        intervinientes: testigos, denunciado y victima o victimadenunciantes 
                        denunciante: {nombre: datosRelacion:{conocimientoVictima: etc} }

                    } */}
          <div className='mb-3 border-3 border-round'>
            <div className='mx-4 p-4'>
              <h1 className='text-center py-3 border-bottom-2 mb-6'>
                ARTÍCULO 129º.- Derechos de la Víctima
              </h1>
              <p>
                <span className='font-bold'>
                  La víctima tendrá los siguientes derechos:
                </span>
              </p>
              <p>
                a) A recibir un trato digno y respetuoso y que se hagan mínimas
                las molestias derivadas del procedimiento.
              </p>
              <p>
                b) A que se respete su intimidad en la medida que no obstruya la
                investigación.
              </p>
              <p>
                c) A requerir medidas de protección para su seguridad, la de sus
                familiares y la de los testigos que declaren en su interés, a
                través de los órganos competentes y a ser asistida en forma
                integral y especializada con el objeto de propender a su
                recuperación psíquica, física y social.
              </p>
              <p>
                d) A intervenir en el procedimiento penal y en el juicio como
                querellante, conforme a lo establecido por este Código.
              </p>
              <p>
                e) A ser informada del avance y resultados de la investigación y
                del proceso, salvo razones fundadas en resguardar su eficacia
                aún cuando no haya intervenido en él.
              </p>
              <p>
                f) A examinar documentos y actuaciones, a ser informada
                verbalmente sobre el estado del proceso y la situación del
                imputado.
              </p>
              <p>g) A aportar información durante la investigación.</p>
              <p>
                h) A ser escuchada antes de cada decisión que implique la
                extinción o suspensión de la acción penal.
              </p>
              <p>
                i) A requerir la revisión ante el Fiscal General de la
                Acusación, de la desestimación o archivo dispuesto por el
                fiscal, aun cuando no haya intervenido en el procedimiento como
                querellante.
              </p>
              <p>
                j) A requerir el inmediato reintegro de los bienes muebles e
                inmuebles de los que fue ilegítimamente privado y el cese del
                estado antijurídico producido por el hecho investigado.
              </p>
              <p>
                k) A reclamar por demora o ineficiencia en la investigación ante
                el Fiscal General de la Acusación.
              </p>
              <p>
                l) Cuando fuere menor o incapaz, el órgano judicial podrá
                autorizar que durante los actos procesales en los cuales
                intervenga, sea acompañado por ascendiente, tutor o guardador,
                salvo que existieren intereses contrapuestos, en cuyo caso será
                acompañado por el representante del Ministerio de Menores o
                Incapaces.
              </p>
              <p>
                ll) A ser oída en las audiencias en donde se decida sobre la
                revocación de alguna medida de coerción personal que pese sobre
                el imputado y en las audiencias donde se decida sobre la
                posibilidad de que el imputado obtenga un beneficio en la
                ejecución de pena que importe su soltura anticipada.
              </p>
              <p>
                m) En los casos de lesiones dolosas entre convivientes y se
                presuma la reiteración de hechos, el juez de control podrá
                disponer a pedido de la víctima o del fiscal la exclusión o
                prohibición de ingreso al hogar del victimario y/o el
                alojamiento de la víctima en un lugar adecuado.
              </p>
            </div>
          </div>

          <Divider className='my-6' />
          <form onSubmit={onSubmited} className='my-6'>
            <div className='grid mb-6'>
              <div className='col-12'>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey='6LdjMcgoAAAAAGrDI_rgUpCUlVoesFzWOncHfZVB'
                  //Secret Key 6LdjMcgoAAAAAKXabqaVeJkM_Eb-tH318sdhxHwz
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='grid'>
              <div className='col-12 sm:col-5 md:col-4 '>
                <Button
                  className='text-lightblue-mpa w-full py-4'
                  label='Volver Atrás'
                  link
                  type='button'
                  onClick={(e) => {
                    props.changePaso(props.paso - 1);
                  }}
                  hidden={denunciaCreada}
                />
              </div>
              <div className='col-12 sm:col-7 md:col-8 '>
                <Button
                  id='btn-finalizar'
                  type='button'
                  icon='pi pi-chevron-right'
                  iconPos='right'
                  label='Finalizar Denuncia'
                  className='w-full btn-blue-mpa py-4'
                  onClick={(e) => send()}
                ></Button>{' '}
                {/* disabled={response == null || denunciaCreada} */}
              </div>
            </div>
          </form>
        </div>
      </div>

      <Dialog
        draggable={false}
        blockScroll={true}
        closable={false}
        visible={dialogEnviando}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        onHide={() => setDialogEnviando(false)}
      >
        {hasId == false ? (
          <div>
            <div className='mt-5 mx-5 text-center'>
              <i className='text-8xl pi pi-spin pi-spinner'></i>
              <h2>Cargando...</h2>
              <h4>Por favor, aguarde mientras se envia el formulario</h4>
            </div>
          </div>
        ) : (
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
              <p>
                Se le envió un correo electrónico a:{' '}
                <span className='text-bold'>{responseDenuncia.email}</span> con
                el comprobante.
              </p>
              <p className='p-error'>
                Debe apersonarse en los próximos 5 días hábiles a ratificar la
                denuncia a la delegación fiscal o fiscalía mas próxima
              </p>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
