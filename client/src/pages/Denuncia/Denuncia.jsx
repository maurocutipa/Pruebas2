import React, { useState, useEffect, useContext,memo } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';

import { useAppSelector } from '@/store/hooks';

import '../../components/styles/Denuncias.styles.scss';

import FormularioDenunciante from '../../components/pages/Denuncias/FormularioDenunciante';
import FormularioDenuncia from '../../components/pages/Denuncias/FormularioDenuncia';
import ViolenciaDeGenero from '../../components/pages/Denuncias/DenunciasEspeciales/ViolenciaDeGenero';
import Revision from '../../components/Revision';
import { ViolenciaIntrafamiliar } from '../../components/pages/Denuncias/DenunciasEspeciales/ViolenciaIntrafamiliar';
import { DatosDenuncia } from '../../models/DatosDenuncia';
import { DatosDanos } from '../../models/DatosDanos';
import { DatosAbigeato } from '../../models/DatosAbigeato';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { BusquedaDePersonas } from '../../components/pages/Denuncias/DenunciasEspeciales/BusquedaDePersonas';
import { getBarrios, getDepartamentos, getLocalidades, getNacionalidades, getProvincias } from '../../api/adicional.api';

const tiposDenuncia = [
  { id: 1, tipo: 'Robo / Hurto', ruta: 'robo_hurto.jpeg' },
  { id: 2, tipo: 'Delitos contra las personas', ruta: 'delitos_contra_las_personas.png', descripcion: 'Homicidios / Lesiones / Amenazas / Abuso de armas / etc.' },
  { id: 3, tipo: 'Narcomenudeo', ruta: 'narcomenudeo.png' },
  { id: 4, tipo: 'Incidentes Viales', ruta: 'incidentes_viales.png' },
  { id: 7, tipo: 'Violencia Intrafamiliar', ruta: 'violencia_intrafamiliar.jpeg' },
  { id: 6, tipo: 'Delitos Sexuales', ruta: 'delitos_sexuales.jpg' },
  { id: 5, tipo: 'Violencia de Genero', ruta: 'violencia_de_genero.png' },
  { id: 8, tipo: 'Ciberdelitos', ruta: 'ciberdelitos.png' },
  { id: 9, tipo: 'Corrupción de las Fuerzas de Seguridad', ruta: 'corrupcion_de_las_fuerzas.jpeg' },
  { id: 10, tipo: 'Delitos Economicos y contra la Administracion Publica', ruta: 'delitos_economicos.png', descripcion: 'Ley Provincial N° 5898 / Ley Nacional N° 24769 / etc.' },
  { id: 11, tipo: 'Delitos Patrimoniales', ruta: 'delitos_patrimoniales.png', descripcion: 'Estafas / Defraudaciones / Extorsión / etc.' },
  { id: 12, tipo: 'Denuncia Ambiental', ruta: 'denuncia_ambiental.jpeg' },
  { id: 13, tipo: 'Abigeato / Cuatrerismo', ruta: 'abigeato_cuatrerismo.jpeg' },
  { id: 14, tipo: 'Daños', ruta: 'daños.png' },
  { id: 15, tipo: 'Maltrato Animal', ruta: 'maltrato_animal.jpeg' },
];

const tiposDenunciaInterna = [...tiposDenuncia,
{ id: 17, tipo: 'Actuacion de Oficio' },
{ id: 18, tipo: 'Busqueda de Personas' },
{ id: 16, tipo: 'Otro tipo de Denuncia' }]

const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
// telefonos, automoviles, bicicletas, autopartes, documentos, cheques, tarjetas, otros, optionsRoboHurto,tipo
const RoboHurtoContext = React.createContext([], [], [], [], [], [], [], [], []);
const IncidentesVialesContext = React.createContext([]);
const DelitosContraPersonasContext = React.createContext(0, 0, 0);
const OtrosFormContext = React.createContext([]);
const DenunciaContext = React.createContext(0);

export default function Denuncia() {
  const { data } = useAppSelector(state => state.data);

  const [tosValue, setTosValue] = useState(false);
  const [flagrancia, setFlagrancia] = useState(0);
  const [victimasRelaciones, setVictimasRelaciones] = useState([]);

  const [intervinientes, setIntervinientes] = useState([]); //Denunciado, Testigo y Victima
  const [denunciantes, setDenunciantes] = useState([]); //VictimaDenunciante, Denunciante
  const [seccionales, setSeccionales] = useState([]);
  const [seccional, setSeccional] = useState(0);

  //Modificar Primer formulario
  const [victimas, setVictimas] = useState([]);
  const [existeTestigoStr, setExisteTestigoStr] = useState('Si');

  const [denunciados, setDenunciados] = useState([]);
  const [testigos, setTestigos] = useState([]);
  const [funcionGrado, setFuncionGrado] = useState('');

  const [denuncia, setDenuncia] = useState({
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
    detalleLugar: ''
  });
  const [anexoViolenciaGenero, setAnexoViolenciaGenero] = useState({});
  const [anexoViolenciaIntrafamiliar, setAnexoViolenciaIntrafamiliar] = useState({});
  const [delitoSexual, setDelitoSexual] = useState({});
  const [validacion, setValidacion] = useState({});
  const [validaDanos, setValidaDanos] = useState(false);
  const [maltratoAnimal, setMaltratoAnimal] = useState({});
  const [danos, setDanos] = useState(new DatosDanos());
  const [abigeato, setAbigeato] = useState(new DatosAbigeato())

  //Paso 1
  const [fotosDni, setFotosDni] = useState([]);
  const [adjuntos, setAdjuntos] = useState([]);
  const [tipoValue, setTipoValue] = useState(0); //antes iba 9 //cambiar 0
  const [paso, setPaso] = useState(1); //Cambiar 1
  const [str, setStr] = useState('Delitos Sexuales');

  //robo y hurto
  const [telefonos, setTelefonos] = useState([]);
  const [automoviles, setAutomoviles] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [autopartes, setAutopartes] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [otros, setOtros] = useState([]);
  const [selectedOptionsRoboHurto, setSelectedOptionsRoboHurto] = useState([]);
  //Delitos contra Personas
  const [lesiones, setLesiones] = useState(0);
  const [homicidio, setHomicidio] = useState(0);
  const [femicidio, setFemicidio] = useState(0);
  //Ubicacion
  const [nacionalidades, setNacionalidades] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [barrios, setBarrios] = useState([]);

  const event1 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-primary' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const event2 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-primary' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const event3 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-primary' },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const event4 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-primary' },
  ];

  //events violencia de genero
  // const eventViolenciaGenero1 = [
  //   { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'orange' },
  //   { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'black' },
  //   { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'black' },
  //   { status: 'Anexo Violencia de Género', icon: 'pi pi-users', color: 'black' },
  //   { status: 'Confirmacion', icon: 'pi pi-check', color: 'black' },
  // ];

  const eventViolenciaGenero2 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-primary' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia de Género',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaGenero3 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-primary' },
    {
      status: 'Anexo Violencia de Género',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaGenero4 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia de Género',
      icon: 'pi pi-users',
      color: 'bg-primary',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaGenero5 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia de Género',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-primary' },
  ];
  //fin events violencia de genero

  //events violencia intrafamiliar
  const eventViolenciaIntrafamiliar1 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-primary' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia Intrafamiliar',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaIntrafamiliar2 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-primary' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia Intrafamiliar',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaIntrafamiliar3 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-primary' },
    {
      status: 'Anexo Violencia Intrafamiliar',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaIntrafamiliar4 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia Intrafamiliar',
      icon: 'pi pi-users',
      color: 'bg-primary',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-black' },
  ];

  const eventViolenciaIntrafamiliar5 = [
    { status: 'Tipo Denuncia', icon: 'pi pi-list', color: 'bg-black' },
    { status: 'Datos Denunciante', icon: 'pi pi-user', color: 'bg-black' },
    { status: 'Datos del Hecho', icon: 'pi pi-file-edit', color: 'bg-black' },
    {
      status: 'Anexo Violencia Intrafamiliar',
      icon: 'pi pi-users',
      color: 'bg-black',
    },
    { status: 'Confirmacion', icon: 'pi pi-check', color: 'bg-primary' },
  ];
  //fin events violencia intrafamiliar

  useEffect(() => {
    // setSeccionales(await getSeccionales())
    scrollTo({ top: 0, behavior: 'instant' })

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

  const customizedMarker = (item) => {
    return (
      <span
        className={`flex align-items-center justify-content-center text-white border-circle z-1 shadow-1 ${item.color} px-4 mx-2`}
        style={{ height: '60px' }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };

  const gridTiposDenuncia = () => {
    return (
      <>
        <div className='grid px-6'>
          {tiposDenuncia.map((el) => (
            <div className='col-12 md:col-6 lg:col-4' key={el.id}>
              <label>
                <input
                  type='button'
                  className='botonImagenes'
                  onClick={(e) => {
                    setTipoValue(el.id);
                    setStr(el.tipo);
                    changePaso(2);
                  }}
                />{' '}
                {/*cambiar a paso 2*/}
                <div className='text-center pb-3'>
                  <img
                    className='w-full'
                    style={{ height: '250px' }}
                    src={'/src/assets/img/' + el.ruta}
                    alt={el.ruta}
                  />{' '}
                  {/* 350 en pantalla grande */}
                  <p className='text-xl font-bold'>{el.tipo}</p>
                  <p className='text-lg'>{el.descripcion}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </>
    );
  };

  const changePaso = (paso) => {
    setPaso(paso);
    window.scrollTo(0, 0);
  };

  const finalizarDatosDenunciante = (
    tablaIntervinientes,
    tablaDenunciantes,
    tablaVictimasRelaciones,
    anonimo,
    fotos,
    victimas, denunciados, testigos, existeTestigo, tipo
  ) => {
    var conoceDenunciado = 0, conoceTestigos = 0;
    tablaIntervinientes.forEach(element => {
      if (element.idIntervinienteTipo == 9 && element.conocimientoDatosPersonales == 1)//testigo
        conoceTestigos = 1;
      else if (element.idIntervinienteTipo == 5 && element.conocimientoDatosPersonales == 1)//denunciado
        conoceDenunciado = 1;
    });
    setIntervinientes(tablaIntervinientes);
    if (anonimo == 1) {
      setDenunciantes([]);
    } else {
      setDenunciantes(tablaDenunciantes);
    }
    setVictimasRelaciones(tablaVictimasRelaciones);
    setFotosDni(fotos);
    var den = new DatosDenuncia();
    den.anonimo = anonimo;
    den.datosTestigo = conoceTestigos;
    den.datosDenunciado = conoceDenunciado;
    setExisteTestigoStr(existeTestigo);
    if (existeTestigo == 'Si')
      den.testigo = 1;
    else
      den.testigo = 0;
    den.idTipoDenuncia = tipo
    den.certezaFecha = denuncia.certezaFecha;
    den.certezaLugar = denuncia.certezaLugar;
    setDenuncia(den);
    setDenunciados(denunciados);
    setVictimas(victimas)
    setTestigos(testigos);
    changePaso(3);

    console.log(denuncia);
  };

  const finalizarDatosDenuncia = (den, adjuntos) => {
    var denunc = new DatosDenuncia();
    Object.assign(denunc, den);
    denunc.anonimo = denuncia.anonimo;
    console.log(denunc);
    setDenuncia(denunc);
    setAdjuntos(adjuntos)
    changePaso(4);
  }

  const devolverPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div id='paso1'>
            <div id='tos' className='mx-3 mb-5 px-6 mt-6'>
              <h1 className='text-center'>Términos y condiciones</h1>
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
                delictivos al MPA. Dentro de los 5 (cinco) días hábiles de efectuada una denuncia, 
                el denunciante deberá apersonarse con su documento nacional de identidad en la delegación fiscal 
                o fiscalía competente mas próxima a su ubicación o domicilio a efectos de validar su identidad y 
                suscribir la misma (conforme art. 332 del CPP), caso contrario el ayudante fiscal
                o fiscal interviniente podrá archivarla.
                Consulte las delegaciones fiscales:&nbsp;
                <a href="https://mpajujuy.gob.ar/listado-delegaciones" target='_blank'>https://mpajujuy.gob.ar/listado-delegaciones</a> o las fiscalías en
                siguiente enlace:&nbsp;
                <a href="https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales" target='_blank'>https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales</a>
              </p>
              <p>
                4. Si hay que darle tratamiento <span style={{ fontWeight: 'bold' }}>URGENTE</span>, por favor
                dirígete hasta la comisaria, delegación fiscal o fiscalía mas próxima a tu ubicación.
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
                <span style={{ fontWeight: 'bolder' }}>Falsa denuncia:</span> Al
                realizar una denuncia, Usted debe saber que si la realiza
                falsamente -es decir, miente en lo que nos está informando-,
                está cometiendo un delito con penas de prisión de dos meses a un
                año o multa (artículo 245 del Código Penal).
              </p>

              <div className='flex align-items-center'>
                <Checkbox
                  inputId='tosValue'
                  onChange={(e) => {
                    setTosValue(e.checked); setTimeout(
                      //function () { window.scroll({ top: window.scrollY + 1000, behavior: 'smooth' }) }.bind(this)
                      function () {
                        const element = document.getElementById("tipoDenunciaTitle");
                        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                      }, 100);
                  }}
                  checked={tosValue}
                />
                <label htmlFor='tosValue' className='ml-2' style={{ fontWeight: 'bolder' }}>
                  Acepto los terminos y Condiciones
                </label>
              </div>
            </div>

            <div id='tipoDenuncia' className='mx-3 fadeIn mb-5' hidden={tosValue == false}>
              <div className='hidden md:block mx-7'>
                <Timeline
                  value={event1}
                  layout='horizontal'
                  align='bottom'
                  marker={customizedMarker}
                  content={(item) => item.status}
                />
              </div>
              <h1 className='text-center' id='tipoDenunciaTitle'>Seleccione el Tipo de Denuncia</h1>
              {gridTiposDenuncia()}
              <Divider className='mb-5' />

              <div className='grid px-6'>
                <div className='col-12 col-offset-0 md:col-offset-4 md:col-4'>
                  <label>
                    <input
                      type='button'
                      className='botonImagenes'
                      onClick={(e) => {
                        setTipoValue(17);
                        setStr("Otro tipo de Denuncia");
                        setPaso(2);
                      }}
                    />
                    <div className='text-center pb-3 p-5'>
                      <img className='w-full' style={{ height: '200px' }}
                        src={'/src/assets/img/otro_tipo_de_denuncia.png'}
                        alt={"otro_tipo_de_denuncia.png"}
                      />
                      <p className='text-xl font-bold'>Otro tipo de Denuncia</p>

                    </div>
                  </label>
                </div>

              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div id='paso2'>
            <div id='form' className='mx-3 mb-5 mt-3'>
              <Button
                icon='pi pi-angle-left'
                className='text-lightblue-mpa'
                label='Regresar al Paso Anterior'
                link
                onClick={(e) => setPaso(paso - 1)}
              />
              <div className='hidden md:block mx-7'>
                <Timeline
                  value={
                    tipoValue == 5
                      ? eventViolenciaGenero2
                      : tipoValue == 7
                        ? eventViolenciaIntrafamiliar2
                        : event2
                  }
                  layout='horizontal'
                  align='bottom'
                  marker={customizedMarker}
                  content={(item) => item.status}
                />
              </div>
              <FormularioDenunciante
                tipo={tipoValue}
                finalizarDatosDenunciante={finalizarDatosDenunciante}
                changePaso={changePaso}
                victimas={victimas}
                denunciantes={denunciantes}
                denunciados={denunciados}
                testigos={testigos}
                existeTestigo={denuncia.existeTestigo}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div id='paso3'>
            <div id='form' className='mx-3 mb-5 mt-3'>
              <Button
                icon='pi pi-angle-left'
                label='Regresar al Paso Anterior'
                className='text-lightblue-mpa'
                link
                onClick={(e) => setPaso(paso - 1)}
              />
              <div className='hidden md:block mx-7'>
                <Timeline
                  value={
                    tipoValue == 5
                      ? eventViolenciaGenero3
                      : tipoValue == 7
                        ? eventViolenciaIntrafamiliar3
                        : event3
                  }
                  layout='horizontal'
                  align='bottom'
                  marker={customizedMarker}
                  content={(item) => item.status}
                />
              </div>
              <FormularioDenuncia
                finalizarDatosDenuncia={finalizarDatosDenuncia}
                changePaso={changePaso}
                denuncia={denuncia}
                delitoSexual={delitoSexual}
                setDelitoSexual={setDelitoSexual}
                maltratoAnimal={maltratoAnimal}
                setMaltratoAnimal={setMaltratoAnimal}
                abigeato={abigeato}
                setAbigeato={setAbigeato}
              />
            </div>
          </div>
        );
      case 4:
        if (tipoValue == 5) {
          //el tipo de denuncia es Violencia De Género
          return (
            <div id='paso4ViolenciaDeGenero'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block mx-7'>
                  <Timeline
                    value={eventViolenciaGenero4}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <ViolenciaDeGenero
                  changePaso={changePaso}
                  anexoViolenciaGenero={anexoViolenciaGenero}
                  setAnexoViolenciaGenero={setAnexoViolenciaGenero}
                />
              </div>
            </div>
          );
        } else if (tipoValue == 7) {
          //violencia intrafamiliar
          return (
            <div id='paso4ViolenciaIntrafamiliar'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block mx-7'>
                  <Timeline
                    value={eventViolenciaIntrafamiliar4}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <ViolenciaIntrafamiliar
                  changePaso={changePaso}
                  paso={paso}
                  anexoViolenciaIntrafamiliar={anexoViolenciaIntrafamiliar}
                  setAnexoViolenciaIntrafamiliar={
                    setAnexoViolenciaIntrafamiliar
                  }
                />
              </div>
            </div>
          );
        } else {
          //no es violencia de genero ni intrafamiliar (muestra revision)
          return (
            <div id='paso4Revision'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block md:mx-7'>
                  <Timeline
                    value={event4}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <Revision
                  //anonimo={anonimo} 
                  strDenuncia={str}
                  tipoDenuncia={tipoValue}
                  denuncia={denuncia} //anonimo se envia dentro de denuncia
                  intervinientes={intervinientes}
                  denunciantes={denunciantes}
                  victimasRelaciones={victimasRelaciones}
                  fotosDni={fotosDni}
                  paso={paso}
                  changePaso={changePaso}
                  adjuntos={adjuntos}
                />
              </div>
            </div>
          );
        }
      case 5:
        if (tipoValue == 5) {
          return (
            <div id='paso5Revision'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block md:mx-7'>
                  <Timeline
                    value={eventViolenciaGenero5}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <Revision
                  //anonimo={null}
                  strDenuncia={str}
                  tipoDenuncia={tipoValue}
                  denuncia={denuncia} //anonimo se envia dentro de denuncia
                  intervinientes={intervinientes}
                  denunciantes={denunciantes}
                  victimasRelaciones={victimasRelaciones}
                  fotosDni={fotosDni}
                  anexoViolenciaGenero={anexoViolenciaGenero}
                  paso={paso}
                  changePaso={changePaso}
                  adjuntos={adjuntos}
                />
              </div>
            </div>
          );
        } else if (tipoValue == 7) {
          return (
            <div id='paso5Revision'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block md:mx-7'>
                  <Timeline
                    value={eventViolenciaIntrafamiliar5}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <Revision
                  //anonimo={anonimo}
                  strDenuncia={str}
                  tipoDenuncia={tipoValue}
                  denuncia={denuncia} //anonimo se envia dentro de denuncia
                  intervinientes={intervinientes}
                  denunciantes={denunciantes}
                  victimasRelaciones={victimasRelaciones}
                  fotosDni={fotosDni}
                  denunciaIntrafamiliar={anexoViolenciaIntrafamiliar}
                  paso={paso}
                  changePaso={changePaso}
                  adjuntos={adjuntos}
                />
              </div>
            </div>
          );
        } else {
          return <div>Error</div>;
        }

      default:
        return <div>Error</div>;
    }

  };

  const isFormInvalid = () => {
    if (tipoValue != 0 && funcionGrado != '' && seccional != '')
      return false
    else
      return true;
  }

  const checkForm = () => {
    if (!isFormInvalid())
      changePaso(2);
  }

  const devolverDenunciaInterna = () => {
    switch (paso) {
      case 1:
        return (
          <div id='paso1'>
            <div id='tos' className='mx-3 mb-5 px-6 mt-6'>
              <h1 className='text-center'>Términos y condiciones</h1>
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
                delictivos al MPA. Dentro de los 5 (cinco) días hábiles de efectuada una denuncia, 
                el denunciante deberá apersonarse con su documento nacional de identidad en la delegación fiscal 
                o fiscalía competente mas próxima a su ubicación o domicilio a efectos de validar su identidad y 
                suscribir la misma (conforme art. 332 del CPP), caso contrario el ayudante fiscal
                o fiscal interviniente podrá archivarla.
                Consulte las delegaciones fiscales:&nbsp;
                <a href="https://mpajujuy.gob.ar/listado-delegaciones" target='_blank'>https://mpajujuy.gob.ar/listado-delegaciones</a> o las fiscalías en
                siguiente enlace:&nbsp;
                <a href="https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales" target='_blank'>https://mpajujuy.gob.ar/fiscalia/fiscalias-y-unidades-fiscales</a>
              </p>
              <p>
                4. Si hay que darle tratamiento <span style={{ fontWeight: 'bold' }}>URGENTE</span>, por favor
                dirígete hasta la comisaria, delegación fiscal o fiscalía mas próxima a tu ubicación.
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
                <span style={{ fontWeight: 'bolder' }}>Falsa denuncia:</span> Al
                realizar una denuncia, Usted debe saber que si la realiza
                falsamente -es decir, miente en lo que nos está informando-,
                está cometiendo un delito con penas de prisión de dos meses a un
                año o multa (artículo 245 del Código Penal).
              </p>

              <div className='flex align-items-center'>
                <Checkbox
                  inputId='tosValue'
                  onChange={(e) => {
                    setTosValue(e.checked); setTimeout(
                      function () {
                        const element = document.getElementById("tipoDenunciaTitle");
                        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                      }, 100);
                  }}
                  checked={tosValue}
                />
                <label htmlFor='tosValue' className='ml-2' style={{ fontWeight: 'bolder' }}>
                  Acepto los terminos y Condiciones
                </label>
              </div>
            </div>
            <div id='tipoDenuncia' className='mx-3 fadeIn mb-5' hidden={tosValue == false}>
              <div className='hidden md:block mx-7'>
                <Timeline value={event1} layout='horizontal' align='bottom'
                  marker={customizedMarker} content={(item) => item.status} />
              </div>
              <h1 className='text-center' id='tipoDenunciaTitle'>Seleccione el Tipo de Denuncia</h1>
              <div className='mx-5 mt-3'>
                <div className='formgrid grid'>
                  <div className='field col'>
                    <label className='form-label'>Tipo de Denuncia</label>
                    <Dropdown className='w-full' placeholder='Seleccione un Tipo' options={tiposDenunciaInterna} optionLabel='tipo' optionValue='id' value={tipoValue} onChange={e => { setTipoValue(e.target.value); setStr(tiposDenunciaInterna.find(item => item.id == e.target.value).tipo) }}></Dropdown>
                  </div>
                  <div className='field col'>
                    <span className='form-label'>Flagrancia</span>
                    <SelectButton id="flagrancia" name="flagrancia" value={flagrancia} onChange={(e) => {setFlagrancia(e.value)}} options={siNo} className='w-full md:w-10' unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                  </div>
                  <div className="field col-12">
                    <label className='form-label'>Seccional</label>
                    {/* <Dropdown className='w-full' placeholder='Seleccione una Seccional' options={seccionales} optionLabel='name' optionValue='value' value={seccional} onChange={e => setSeccional(e.target.value)}></Dropdown> */}
                    <Dropdown className='w-full' placeholder='Seleccione una Seccional' filter options={data.seccionales} optionLabel='seccional' optionValue='idSeccional' value={seccional} onChange={e => {setSeccional(e.target.value)}}></Dropdown>
                  </div>
                  <div className="field col-12">
                    <label className='form-label'>Funcion y Grado</label>
                    <InputText id="funcionGrado" name="funcionGrado" value={funcionGrado}
                      onChange={(e) => setFuncionGrado(e.target.value)} className='w-full' />
                  </div>
                </div>
                <Button className='mt-3' label='Siguiente Paso' icon='pi pi-chevron-right'
                  iconPos='right' onClick={e => checkForm()} disabled={isFormInvalid()}></Button>
              </div>
            </div>
          </div>
        )
      case 2:
        //18 busqueda de persona
        if (tipoValue != 18) {
          return (
            <div id='paso2'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  className='text-lightblue-mpa'
                  label='Regresar al Paso Anterior'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block mx-7'>
                  <Timeline
                    value={
                      tipoValue == 5
                        ? eventViolenciaGenero2
                        : tipoValue == 7
                          ? eventViolenciaIntrafamiliar2
                          : event2
                    }
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <FormularioDenunciante
                  tipo={tipoValue}
                  finalizarDatosDenunciante={finalizarDatosDenunciante}
                  changePaso={changePaso}
                  victimas={victimas}
                  denunciantes={denunciantes}
                  denunciados={denunciados}
                  testigos={testigos}
                  existeTestigoStr={existeTestigoStr}
                  setExisteTestigoStr={setExisteTestigoStr}
                />
              </div>
            </div>
          );
        } else {
          // Formulario Busqueda de Personas
          return (<div><TraerForm /></div>)
        }
      case 3:
        return (
          <div id='paso3'>
            <div id='form' className='mx-3 mb-5 mt-3'>
              <Button
                icon='pi pi-angle-left'
                label='Regresar al Paso Anterior'
                className='text-lightblue-mpa'
                link
                onClick={(e) => setPaso(paso - 1)}
              />
              <div className='hidden md:block mx-7'>
                <Timeline
                  value={
                    tipoValue == 5
                      ? eventViolenciaGenero3
                      : tipoValue == 7
                        ? eventViolenciaIntrafamiliar3
                        : event3
                  }
                  layout='horizontal'
                  align='bottom'
                  marker={customizedMarker}
                  content={(item) => item.status}
                />
              </div>
              <FormularioDenuncia
                finalizarDatosDenuncia={finalizarDatosDenuncia}
                changePaso={changePaso}
                denuncia={denuncia}
                delitoSexual={delitoSexual}
                setDelitoSexual={setDelitoSexual}
                maltratoAnimal={maltratoAnimal}
                setMaltratoAnimal={setMaltratoAnimal}
                abigeato={abigeato}
                setAbigeato={setAbigeato}
              />
            </div>
          </div>
        );
      case 4:
        if (tipoValue == 5) {
          //el tipo de denuncia es Violencia De Género
          return (
            <div id='paso4ViolenciaDeGenero'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block mx-7'>
                  <Timeline
                    value={eventViolenciaGenero4}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <ViolenciaDeGenero
                  changePaso={changePaso}
                  anexoViolenciaGenero={anexoViolenciaGenero}
                  setAnexoViolenciaGenero={setAnexoViolenciaGenero}
                />
              </div>
            </div>
          );
        } else if (tipoValue == 7) {
          //violencia intrafamiliar
          return (
            <div id='paso4ViolenciaIntrafamiliar'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block mx-7'>
                  <Timeline
                    value={eventViolenciaIntrafamiliar4}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <ViolenciaIntrafamiliar
                  changePaso={changePaso}
                  paso={paso}
                  anexoViolenciaIntrafamiliar={anexoViolenciaIntrafamiliar}
                  setAnexoViolenciaIntrafamiliar={
                    setAnexoViolenciaIntrafamiliar
                  }
                />
              </div>
            </div>
          );
        } else {
          //no es violencia de genero ni intrafamiliar (muestra revision)
          return (
            <div id='paso4Revision'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block md:mx-7'>
                  <Timeline
                    value={event4}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <Revision
                  //anonimo={anonimo} 
                  strDenuncia={str}
                  tipoDenuncia={tipoValue}
                  denuncia={denuncia} //anonimo se envia dentro de denuncia
                  intervinientes={intervinientes}
                  denunciantes={denunciantes}
                  victimasRelaciones={victimasRelaciones}
                  fotosDni={fotosDni}
                  paso={paso}
                  changePaso={changePaso}
                  adjuntos={adjuntos}

                  flagrancia={flagrancia}
                  seccional={seccional}
                  funcionGrado={funcionGrado}
                />
              </div>
            </div>
          );
        }
      case 5:
        if (tipoValue == 5) {
          return (
            <div id='paso5Revision'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  className='text-lightblue-mpa'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block md:mx-7'>
                  <Timeline
                    value={eventViolenciaGenero5}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <Revision
                  //anonimo={null}
                  strDenuncia={str}
                  tipoDenuncia={tipoValue}
                  denuncia={denuncia} //anonimo se envia dentro de denuncia
                  intervinientes={intervinientes}
                  denunciantes={denunciantes}
                  victimasRelaciones={victimasRelaciones}
                  fotosDni={fotosDni}
                  anexoViolenciaGenero={anexoViolenciaGenero}
                  paso={paso}
                  changePaso={changePaso}
                  adjuntos={adjuntos}

                  flagrancia={flagrancia}
                  seccional={seccional}
                  funcionGrado={funcionGrado}
                />
              </div>
            </div>
          );
        } else if (tipoValue == 7) {
          return (
            <div id='paso5Revision'>
              <div id='form' className='mx-3 mb-5 mt-3'>
                <Button
                  icon='pi pi-angle-left'
                  label='Regresar al Paso Anterior'
                  link
                  onClick={(e) => setPaso(paso - 1)}
                />
                <div className='hidden md:block md:mx-7'>
                  <Timeline
                    value={eventViolenciaIntrafamiliar5}
                    layout='horizontal'
                    align='bottom'
                    marker={customizedMarker}
                    content={(item) => item.status}
                  />
                </div>
                <Revision
                  //anonimo={anonimo}
                  strDenuncia={str}
                  tipoDenuncia={tipoValue}
                  denuncia={denuncia} //anonimo se envia dentro de denuncia
                  intervinientes={intervinientes}
                  denunciantes={denunciantes}
                  victimasRelaciones={victimasRelaciones}
                  fotosDni={fotosDni}
                  denunciaIntrafamiliar={anexoViolenciaIntrafamiliar}
                  paso={paso}
                  changePaso={changePaso}
                  adjuntos={adjuntos}

                  flagrancia={flagrancia}
                  seccional={seccional}
                  funcionGrado={funcionGrado}
                />
              </div>
            </div>
          );
        } else {
          return <div>Error</div>;
        }

      default:
        return <div>Error</div>;
    }
  }

  const TraerForm = memo(() => {
    return (<BusquedaDePersonas></BusquedaDePersonas>)
  })

  return (
    <>
      <DenunciaContext.Provider value={{ tipoValue, str, nacionalidades, provincias, departamentos, localidades, barrios }}>
        <RoboHurtoContext.Provider value={{ telefonos, automoviles, bicicletas, autopartes, documentos, cheques, tarjetas, otros, selectedOptionsRoboHurto, setTelefonos, setAutomoviles, setBicicletas, setAutopartes, setDocumentos, setCheques, setTarjetas, setOtros, setSelectedOptionsRoboHurto }}>
          <IncidentesVialesContext.Provider value={{ automoviles, setAutomoviles }}>
            <DelitosContraPersonasContext.Provider value={{ lesiones, homicidio, femicidio, setLesiones, setHomicidio, setFemicidio }}>
              <OtrosFormContext.Provider value={{ delitoSexual, setDelitoSexual, validacion, setValidacion, maltratoAnimal, setMaltratoAnimal, danos, setDanos, validaDanos, setValidaDanos }}>
                {/* <div id='container'>{devolverPaso()}</div> */}
                <div id='container'>{devolverDenunciaInterna()}</div>
              </OtrosFormContext.Provider>
            </DelitosContraPersonasContext.Provider>
          </IncidentesVialesContext.Provider>
        </RoboHurtoContext.Provider>
      </DenunciaContext.Provider>
    </>
  );
}

export function useRoboHurtoContext() {
  return useContext(RoboHurtoContext);
}

export function useDelitosContraPersonasContext() {
  return useContext(DelitosContraPersonasContext);
}

export function useDenunciaContext() {
  return useContext(DenunciaContext);
}

export function useIncidentesVialesContext() {
  return useContext(IncidentesVialesContext);
}

export function useOtrosFormContext() {
  return useContext(OtrosFormContext);
}