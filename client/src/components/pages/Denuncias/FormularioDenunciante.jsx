import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Card } from 'primereact/card';
import { TableTemplate } from './templates/TableTemplate';
import { FormVictimaDenunciante } from './templates/FormVictimaDenunciante';
import { FormDenunciadoTestigo } from './templates/FormDenunciadoTestigo';
import '../../styles/FormularioDenunciante.style.scss';

import { getBarrios, getDepartamentos, getLocalidades, getNacionalidades, getProvincias } from "../../../api/adicional.api";
import { useDenunciaContext } from '../../../pages/Denuncia/Denuncia';

export default function FormularioDenunciante(props) {

  const [nacionalidades, setNacionalidades] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [barrios, setBarrios] = useState([]);

  const [dialogDenunciante, setDialogDenunciante] = useState(false);
  const [dialogDenunciado, setDialogDenunciado] = useState(false);
  const [dialogTestigo, setDialogTestigo] = useState(false);
  const [dialogDatosPersona, setDialogDatosPersona] = useState(false);
  const [action, setAction] = useState('');
  const [existeTestigo, setExisteTestigo] = useState(1); //form testigo

  const [denunciantes, setDenunciantes] = useState([]);
  const [victimas, setVictimas] = useState([]);
  const [personasDenunciantes, setPersonasDenunciantes] = useState([]);
  const [personasDenunciadas, setPersonasDenunciadas] = useState([]);
  const [personasTestigos, setPersonasTestigos] = useState([]);

  const { tipoDenuncia, str } = useDenunciaContext();
  const [data, setData] = useState({});
  const [tipoPersona, setTipoPersona] = useState('');
  const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
  const siNoSabe = ['Si', 'No / No sabe'];
  const [modificar, setModificar] = useState('no');
  const [idFoto, setIdFoto] = useState(1);
  const [anonimo, setAnonimo] = useState(0);
  const [fotos, setFotos] = useState([]);
  const toast = useRef(null);
  const estructuraVictima = {
    id: '', nombre: '', apellido: '', alias: '', tipoIdentificacion: '', numeroIdentificacion: '',
    identidadAutopercibida: '', fechaNacimiento: '', idPais: '', idProvincia: '', idLocalidad: '', idBarrio: '',
    domicilio: '', latitud: '', longitud: '', telefonoFijo: '', telefonoMovil: '', email: '', idIntervinienteTipo: '',
    tipoPersona: "Fisica", fotosIdentificacion: [], conocimientoVictima: 1, vinculoVictima: '', detalleVinculo: '',
  }

  const estructuraDenTestigo = {
    id: '', nombre: '', apellido: '', alias: '', tipoIdentificacion: '', numeroIdentificacion: '',
    identidadAutopercibida: '', fechaNacimiento: '', idPais: '', idProvincia: '', idLocalidad: '', idBarrio: '',
    domicilio: '', latitud: '', longitud: '', telefonoFijo: '', telefonoMovil: '', email: '', idIntervinienteTipo: 5,
    tipoPersona: "Fisica", conocimientoDatosPersonales: 1, informacionAdicional: '',
  }

  useEffect(() => {
    setPersonasDenunciadas(props.denunciados)
    setPersonasTestigos(props.testigos)

    updateTablaDenunciantes(props.victimas, props.denunciantes)

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

  const ModificarPersonaTemplate = ({ persona }) => {
    const onClickPersona = () => {
      //fechaNacimiento.split()
      //persona.fechaNacimiento = new Date(persona.fechaNacimiento);
      setData(persona)
      console.log(persona);
      switch (persona.idIntervinienteTipo) {
        case 1:
          setDialogDenunciante(true);
          break;
        case 2:
          setDialogDenunciante(true);
          break;
        case 3:
          setDialogDenunciante(true);
          break;
        case 5:
          setDialogDenunciado(true);
          break;
        case 9:
          setDialogTestigo(true);
          break;
      }
    };

    return (
      <Button
        icon='pi pi-pencil'
        rounded
        text
        aria-label='Edit'
        onClick={onClickPersona}
      ></Button>
    );
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const BorrarPersonaTemplate = ({ persona }) => {
    var vict = []
    var den = []
    const deletePersona = () => {
      switch (persona.idIntervinienteTipo) {
        case 1:
          vict = victimas.filter((element) => element.id !== persona.id);
          updateTablaDenunciantes(vict, denunciantes);
          break;
        case 2:
        case 3:
          den = denunciantes.filter((element) => element.id !== persona.id);
          updateTablaDenunciantes(victimas, den);
          break;
        case 5:
          setPersonasDenunciadas(personasDenunciadas.filter((element) => element.id !== persona.id));
          break;
        case 9:
          setPersonasTestigos(personasTestigos.filter((element) => element.id !== persona.id));
          break;
      }
    };

    const onClickConfirmDelete = () => {
      confirmDialog({
        message: '¿Esta seguro de borrar?',
        header: 'Confirmar borrado',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept,
        reject
      });
    };

    const accept = () => {
      toast.current.show({ severity: 'success', summary: 'Confirmado', detail: `Eliminado`, life: 3000 });
      deletePersona();
    };

    const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Se canceló la eliminación', life: 3000 });
    }

    return (
      <>
        <Button icon='pi pi-trash' rounded text aria-label='Delete'
          severity='danger' onClick={onClickConfirmDelete} />
      </>
    );
  };

  const editorTemplate = (persona) => {
    return (
      <div>
        <ModificarPersonaTemplate persona={persona} />
        <BorrarPersonaTemplate persona={persona} />
      </div>
    );
  };

  const verMasTemplate = (rowData) => {
    var tipo = '';
    switch (rowData.idIntervinienteTipo) {
      case 1: tipo = 'Victima';
        break;
      case 2: tipo = 'Denunciante';
        break;
      case 3: tipo = 'Victima/Denunciante';
        break;
      case 5: tipo = 'Denunciado';
        break;
      case 9: tipo = 'Testigo';
        break;
    }

    return (
      <div>
        <Button
          icon='pi pi-info-circle'
          rounded
          text
          aria-label='Ver Mas'
          onClick={(op) => {
            openDatosDialog(rowData);
            setAction(tipo);
          }}
        />
      </div>
    );
  };

  const openDatosDialog = (rowData) => {
    setData(rowData);
    setDialogDatosPersona(true);
  };

  const datosPersona = () => {
    function getCampo(name, id) {
      let dato = data[id];
      if (name == 'Nacionalidad') {
        dato = nacionalidades.find((nacionalidad) => {
          return nacionalidad.value == data[id];
        });
        if (dato) {
          dato = dato.name;
        }
      } else if (name == 'Provincia') {
        dato = provincias.find((provincia) => {
          return provincia.value == data[id];
        });
        if (dato) {
          dato = dato.name;
        }
      } else if (name == 'Localidad') {
        dato = localidades.find((localidad) => {
          return localidad.value == data[id];
        });
        if (dato) {
          dato = dato.name;
        }
      } else if (name == 'Barrio') {
        dato = barrios.find((barrio) => {
          return barrio.value == data[id];
        });
        if (dato) {
          dato = dato.name;
        }
      } else if (name == 'Fecha de Nacimiento') {
        if(dato) dato = new Date(data[id]).toLocaleDateString('en-GB');
      }
      return (<p>
        <span className='font-bold'>{name + ': '}</span>
        {
          dato ?
          dato
          : 
          '----'
        }
      </p>)
    }
    return (
      <div className='px-5'>
        <div>
          {action == 'Denunciado' && getCampo("Tipo de Persona", "tipoPersona")}
          {getCampo("Tipo Identificacion", "tipoIdentificacion")}
          {getCampo("N° Identificacion", "numeroIdentificacion")}
          {getCampo("Nombre", "nombre")}
          {getCampo("Apellido", "apellido")}
          {getCampo("Alias", "alias")}
          {getCampo("Identidad Autopercibida", "identidadAutopercibida")}
          {getCampo("Fecha de Nacimiento", "fechaNacimiento")}
          {getCampo("Nacionalidad", "idPais")}
          {getCampo("Provincia", "idProvincia")}
          {getCampo("Localidad", "idLocalidad")}
          {getCampo("Barrio", "idBarrio")}
          {getCampo("Direccion", "domicilio")}
          <Divider />
          <h3>Datos de Contacto</h3>
          {getCampo("Teléfono Fijo", "telefonoFijo")}
          {getCampo("Teléfono Movil", "telefonoMovil")}
          {getCampo("Correo Electrónico", "email")}
          {(action == 'Denunciado' || action == 'Testigo') && getCampo("Informacion Adicional", "informacionAdicional")}
        </div>
      </div>
    );
  };

  const updateTablaDenunciantes = (victimas, denunciantes) => {
    setVictimas(victimas);
    setDenunciantes(denunciantes)
    var array = denunciantes.concat(victimas);
    setPersonasDenunciantes(array);
    setDialogDenunciante(false);
  }

  const validarFormulario = () => {
    if ((denunciantes.length > 0 || anonimo == 1 || tipoDenuncia == 17)) {// tipo 17 es actuacion de oficio
      if (personasDenunciadas.length > 0) {
        if (personasTestigos.length > 0 || existeTestigo == "No / No sabe") {
          toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Datos de las personas validado', life: 3000 });
          var intervinientes = victimas.concat(personasDenunciadas.concat(personasTestigos))
          var victimasRelaciones = [];
          //TODO: Agregar Relaciones victimas en un arreglo aparte, ya que estan en el de denunciantes
          denunciantes.forEach((element) => {
            if (element.idIntervinienteTipo == 2) {
              var relacion = {
                conocimientoVictima: element.conocimientoVictima,
                vinculoVictima: element.vinculoVictima,
                detalleVinculo: element.detalleVinculo,
                hijosMenores: element.hijosMenores ? element.hijosMenores : undefined,
                riesgoVida: element.riesgoVida ? element.riesgoVida : undefined,
                dependeIngresos: element.dependeIngresos ? element.dependeIngresos : undefined
              }
              victimasRelaciones.push(relacion);
            }
          })
          intervinientes.forEach(element => {
            if (element.idIntervinienteTipo == 1 || element.idIntervinienteTipo == 3) {
              var relacion = {
                conocimientoVictima: element.conocimientoVictima,
                vinculoVictima: element.vinculoVictima,
                detalleVinculo: element.detalleVinculo,
                hijosMenores: element.hijosMenores == 0 ? 0 : element.hijosMenores == 1 ? 1 : undefined,
                riesgoVida: element.riesgoVida == 0 ? 0 : element.riesgoVida == 1 ? 1 : undefined,
                dependeIngresos: element.dependeIngresos == 0 ? 0 : element.dependeIngresos == 1 ? 1 : undefined
              }
              victimasRelaciones.push(relacion);
            }
          });


          props.finalizarDatosDenunciante(intervinientes, denunciantes, victimasRelaciones, anonimo, fotos, victimas, personasDenunciadas, personasTestigos, existeTestigo, props.tipo)
        } else
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se completaron todos los datos solicitados\nFalta agregar testigos o marcar que no hay.', life: 3000 });
      } else
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se completaron todos los datos solicitados\nEs necesario al menos un denunciado.', life: 3000 });
    } else
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se completaron todos los datos solicitados\nEs necesario al menos un denunciante.', life: 3000 });
  }




  return (
    <>
      <div id='container' className='mt-6 px-6'>
        <Toast ref={toast} />
        <ConfirmDialog />
        <div className='mx-5 mt-3'>
          <div className="field" hidden={props.tipo != 3 && props.tipo != 9}>
            <p className='text-2xl font-semibold'>¿Desea realizar una denuncia anónima?</p>
            <SelectButton id="anonimo" name="anonimo" value={anonimo} onChange={(e) => setAnonimo(e.value)} options={siNo} className='w-full md:w-4 lg:w-2' unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
          </div>

          {/* DATOS DENUNCIANTE */}
          {tipoDenuncia != 17 &&
          // tipoDenuncia 17 es Actuacion de Oficio
          <div id='datos-denunciante' className='mt-6'>
            {
              anonimo === 0 ? (
                <>
                  <div>
                    <h2 className='text-lightblue-mpa text-4xl'>Datos del Denunciante</h2>
                    {/* <Button label="check" onClick={e => {cargarVictima()}}></Button> */}
                  </div>

                  <div className='mt-4'>
                    <Button label='Agregar Victima / Denunciante' icon='pi pi-plus' className='w-full md:w-5 lg:w-3 mb-3 py-3 btn-blue-mpa' onClick={e => { setDialogDenunciante(true); setAction("Crear Nuevo"); setModificar('no'); setData(estructuraVictima) }}></Button>
                    {/* denunciantes */}
                    <TableTemplate personas={personasDenunciantes} editorTemplate={editorTemplate} verMasTemplate={verMasTemplate} tipo='denunciante' />
                  </div>

                  <Dialog header={action + ' Denunciante'} draggable={false} blockScroll={true} visible={dialogDenunciante} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setDialogDenunciante(false)}>
                    <FormVictimaDenunciante
                      setIdFoto={setIdFoto}
                      idFoto={idFoto}
                      fotos={fotos}
                      setFotos={setFotos}
                      victimas={victimas}
                      denunciantes={denunciantes}
                      setVictimas={setVictimas}
                      setDenunciantes={setDenunciantes}
                      setPersonasDenunciantes={setPersonasDenunciantes}
                      updateTablaDenunciantes={updateTablaDenunciantes}
                      size={personasDenunciantes.length + 1}
                      rowData={data}
                      nacionalidades={nacionalidades}
                      tipo={props.tipo}
                    ></FormVictimaDenunciante>
                  </Dialog>
                </>
              ) : (
                <div className="text-center">
                  <div>
                    <Card title="Mensaje Importante" className="p-shadow-4 py-4">
                      <div className="text-xl mt-2">
                        No se agregarán <span className='font-bold'>denunciantes </span>para esta denuncia
                      </div>
                    </Card>
                  </div>
                </div>
              )
            }
          </div>
        }
          {
            anonimo === 0 && <Divider className="my-6" />
          }

          {/* DATOS DENUNCIADO */}
          <div id='datos-denunciado' className='mt-6'>
            <div>
              <h2 className='text-lightblue-mpa text-4xl'>Datos del Denunciado</h2>
            </div>

            <Button label='Agregar Denunciado' icon='pi pi-plus' className='w-full md:w-5 lg:w-3 mb-3 py-3 btn-blue-mpa' onClick={e => { setDialogDenunciado(true); setAction("Crear Nuevo"); setModificar('no'); setData(estructuraDenTestigo) }}></Button>

            <TableTemplate personas={personasDenunciadas} editorTemplate={editorTemplate} verMasTemplate={verMasTemplate} tipo='denunciado' />

            <Dialog header={action + ' Denunciado'} draggable={false} blockScroll={true} visible={dialogDenunciado} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setDialogDenunciado(false)}>
              <FormDenunciadoTestigo
                tipo={"Denunciado"}
                array={personasDenunciadas}
                setArray={setPersonasDenunciadas}
                setDialog={setDialogDenunciado}
                rowData={data}
                nacionalidades={nacionalidades}
                provincias={provincias}
                localidades={localidades}
                barrios={barrios}
              />
            </Dialog>
          </div>


          <Divider className="my-6" />

          <div className="mb-6">
            <p className='text-left text-2xl font-semibold'>¿Existen testigos del hecho que va a denunciar?</p>
            <SelectButton
              value={existeTestigo}
              onChange={(e) => {
                console.log("Nuevo valor de existeTestigo:", e.value);
                setExisteTestigo(e.value);
              }}
              options={siNoSabe}
              className='w-full md:w-4 lg:w-3'
              unselectable={false}
              pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}
            />
          </div>

          {/* DATOS TESTIGO */}
          <div id="datos-testigo">
            {existeTestigo === 'Si' ? (
              <>
                <div> <h2 className='text-lightblue-mpa text-4xl'>Datos del Testigo</h2></div>
                <div id='datosTestigo' className='mt-4'>
                  <Button label='Agregar Testigo' severity='success' icon='pi pi-plus' className='w-full md:w-5 lg:w-3 mb-3 py-3 btn-blue-mpa' onClick={e => { setDialogTestigo(true); setAction("Crear Nuevo"); setModificar('no'); setData(estructuraDenTestigo) }}></Button>
                  <TableTemplate personas={personasTestigos} editorTemplate={editorTemplate} verMasTemplate={verMasTemplate} tipo='testigo' />
                </div>
                <Dialog header={action + ' Testigo'} draggable={false} blockScroll={true} visible={dialogTestigo} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setDialogTestigo(false)}>
                  {/* <FormTemplate {...formularioTestigo} /> */}
                  <FormDenunciadoTestigo
                    tipo={"Testigo"}
                    array={personasTestigos}
                    setArray={setPersonasTestigos}
                    setDialog={setDialogTestigo}
                    rowData={data}
                    nacionalidades={nacionalidades}
                    provincias={provincias}
                    localidades={localidades}
                    barrios={barrios}
                  ></FormDenunciadoTestigo>
                </Dialog>
              </>
            ) : (
              <div className="text-center">
                <div>
                  <Card title="Mensaje Importante" className="p-shadow-4 py-4">
                    <div className="text-xl mt-2">
                      No se agregarán <span className='font-bold'>testigos</span> para esta denuncia.
                    </div>
                  </Card>
                </div>
              </div>
            )}

            <Dialog header={'Datos ' + action} draggable={false} blockScroll={true} visible={dialogDatosPersona} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setDialogDatosPersona(false)}>
              {datosPersona()}
            </Dialog>
          </div>

          <Divider className="my-6" />
          <div className="grid">
            <div className="col-12 sm:col-5 md:col-4 ">
              <Button
                className='text-lightblue-mpa w-full py-4'
                label='Volver Atrás'
                link
                type='button'
                onClick={() => { props.changePaso(1) }}
              />
            </div>
            <div className="col-12 sm:col-7 md:col-8 ">
              <Button label='Siguiente Paso' icon='pi pi-chevron-right' iconPos='right' className='w-full mb-3 btn-blue-mpa py-4' onClick={e => { validarFormulario() }}></Button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}