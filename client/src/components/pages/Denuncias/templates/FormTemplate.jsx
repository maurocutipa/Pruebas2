import { useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import MapTemplate from "./MapTemplate";

import { useEffect } from "react";
import { getBarrios, getDepartamentos, getLocalidades, getNacionalidades, getProvincias } from "../../../../api/adicional.api";

const provinciasPrueba = ['Jujuy', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'];
const barriosPrueba = ['Centro', 'Alto Gorriti', 'Bajo Gorriti', 'Ciudad de Nieva', 'Veinticinco de Mayo', 'Veintitrés de Agosto', 'Villa San Martín', 'Villa Belgrano', 'Los Naranjos', 'El Chingo', 'Punta Diamante', 'Sargento Cabral', 'Éxodo Jujeño', 'El Balcón del Comedero', 'Aeroparque', 'Bicentenario'];
const departamentosPrueba = ['Cochinoca','Dr. Manuel Belgrano','El Carmen','Humahuaca','Ledesma','Palpalá','Rinconada','San Antonio','San Pedro','Santa Bárbara','Santa Catalina','Susques','Tilcara','Tumbaya','Valle Grande','Yavi','Abra Pampa','La Quiaca','Perico','Purmamarca'];
const localidadesPrueba = ['Abra Pampa', 'Aguas Calientes', 'Caimancito', 'Casabindo', 'El Carmen', 'Hornillos', 'Huacalera', 'Huichaira', 'Humahuaca', 'La Quiaca', 'Libertador San Martin', 'Lozano', 'Maimara', 'Palpalá', 'Perico', 'Purmamarca', 'San Francisco', 'San Pedro de Jujuy', 'San Salvador de Jujuy', 'Santa Catalina', 'SusquesTilcara', 'Tumbaya', 'Uquia', 'Valle Grande', 'Villa Jardín de Reyes', 'Villamonte', 'Volcan', 'Yala', 'Yavi'];
const nacionalidadesPrueba = ['Afgano/a', 'Argentino/a', 'Chileno/a', 'etc'];//Agregar todas o usar una api

export const FormTemplate = ({ form, tipo, isFormFieldInvalid, getFormErrorMessage, conoceDenunciado, setConoceDenunciado, existeTestigo, setExisteTestigo, conoceTestigo, setConoceTestigo }) => {


    const [esJujuy, setEsJujuy] = useState('Si');

    const [coords, setCoords] = useState({lat:0, lng:0});

    const [nacionalidades, setNacionalidades] = useState([]);
    // const [nacionalidades, setNacionalidades] = useState(nacionalidadesPrueba);

    const [provincias, setProvincias] = useState([]);
    //const [provincias, setProvincias] = useState(provinciasPrueba);

    const [departamentos, setDepartamentos] = useState([]);
    // const [departamentos, setDepartamentos] = useState(departamentosPrueba);

    const [localidades, setLocalidades] = useState([]);
    // const [localidades, setLocalidades] = useState(localidadesPrueba);

    const [barrios, setBarrios] = useState([]);
    // const [barrios, setBarrios] = useState(barriosPrueba);

    
    
    const siNo = ['Si', 'No'];
    const siNoSabe = ['Si', 'No', 'No sabe'];
    const calidades = ['Victima', 'Denunciante', 'Victima / Denunciante'];
    const tiposDocumentos = ['DNI', 'Pasaporte', 'Cedula', 'Otro'];
    const identidades = ['MUJER', 'HOMBRE', 'MUJER TRANS', 'VARON TRANS', 'PERSONA NO BINARIA', 'OTRO'];
    const tiposPersona = ['Fisica', 'Juridica'];
    const vinculos = ["PADRE", "MADRE", "HIJO/A", "HERMANO/A", "PAREJA", "EX PAREJA", "FAMILIA", "OTRO"]

    const [archivosSubidos, setArchivosSubidos] = useState([]);
    const [touchedFiles, setTouchedFiles] = useState(false);
    /* console.log(modificar)
console.log(tipo) */
    //console.log(form)

    useEffect(() => {
        getProvincias().then(({data:{data}}) => {
            setProvincias(data);
        });

        getNacionalidades().then(({data:{data}}) => {
            setNacionalidades(data);
        });

        getDepartamentos().then(({data:{data}}) => {
            setDepartamentos(data);
        });

        // getLocalidades()
        
    }, []);

    const recorrerArchivos = () => {
        return  (
            <>
                {getFormErrorMessage('fotosDni')}
                <div className='grid'>
                    {form.values.fotosDni.map((archivo, index) => {
                        let size = archivo.size / 1024;
                        return (<div key={index} className='col-12' style={{ paddingTop: 0, paddingBottom: 0 }}>
                            <small>{archivo.name} {size > 1024 ? (size / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB'}.</small>
                            {getFormErrorMessage('fotosDni[' + index + '].size')}
                            {getFormErrorMessage('fotosDni[' + index + '].extension')}
                            <hr></hr>
                        </div>
                        );
                    })}
                </div>
            </>
        );
    }

    const borrarCambiosProvincia = (value) => {
        if (value === 'Jujuy') {
            setEsJujuy('Si');
        } else {
            setEsJujuy('No');
            form.setFieldValue('localidad', '');
            form.setFieldValue('barrio', '');
        }
    }

    const changeCoord = (e) => {
        var object = JSON.parse(e)
        form.setFieldValue('latitud', object.lat)
        form.setFieldValue('longitud', object.lng)
    }

    return (
        <>
            <form onSubmit={form.handleSubmit}>
                {
                    tipo == "denunciante" &&
                    <>
                        <h2>Datos de las Victimas / Denunciantes</h2>
                        <div className="formgrid grid">
                            <div className="field col-12">
                                <label htmlFor="calidad">Calidad</label>
                                <Dropdown inputId="calidad" name='calidad'
                                    value={form.values.calidad}
                                    options={calidades}
                                    placeholder="Selecciona una opcion"
                                    onChange={(e) => {
                                        form.setFieldValue('calidad', e.value);
                                    }}
                                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('calidad') })} />
                                {getFormErrorMessage('calidad')}
                            </div>
                            {form.values.calidad == 'Denunciante' &&
                                <div className="col-12">
                                    <div className="grid">
                                        <div className="field col">
                                            <span className="form-label" htmlFor="conoceVictima">Conoce A la Victima?</span>
                                            <SelectButton className="w-full" value={form.values.conoceVictima} onChange={(e) => form.setFieldValue('conoceVictima', e.value)} options={siNo} unselectable={false} />
                                        </div>
                                        {form.values.conoceVictima == "Si" &&
                                            <div className="col">
                                                <div className="grid">
                                                    <div className="field col">
                                                        <label htmlFor="vinculo">Vinculo con la Victima</label>
                                                        <Dropdown inputId="vinculo" name='vinculo'
                                                            value={form.values.vinculo}
                                                            options={vinculos}
                                                            placeholder="Selecciona una opcion"
                                                            onChange={(e) => {
                                                                form.setFieldValue('vinculo', e.value);
                                                            }}
                                                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('vinculo') })} />
                                                        {getFormErrorMessage('vinculo')}
                                                    </div>
                                                    {form.values.vinculo == 'OTRO' &&
                                                        <div className="field col">
                                                            <label htmlFor="vinculoOtro">Especifique el Vinculo</label>
                                                            <InputText id="vinculoOtro" name='vinculoOtro'
                                                                value={form.values.vinculoOtro}
                                                                onChange={(e) => { form.setFieldValue('vinculoOtro', e.target.value); }}
                                                                className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('vinculoOtro') })} />
                                                            {getFormErrorMessage('vinculoOtro')}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </>
                }
                {
                    tipo == "denunciado" &&
                    <>
                        <h2>Datos del Denunciado</h2>
                        <div className="field">
                            <span className="form-label" htmlFor="conoceDenunciado">Conoce al denunciado?</span>
                            {/* <Dropdown id="anonimo" value={anonimo} onChange={(e) => setAnonimo(e.value)} options={siNo}
                            placeholder="Selecciona una opcion" className="w-full" /> */}
                            <SelectButton value={form.values.conoceDenunciado} onChange={(e) => form.setFieldValue('conoceDenunciado', e.value)} options={siNo} unselectable={false} />
                        </div>
                    </>
                }
                {
                    tipo == "testigo" &&
                    <>
                        <h2>Datos del Testigo</h2>
                        <div className="field">
                            <label htmlFor="conoceTestigo">¿Conoce los datos personales del testigo?</label>
                            <SelectButton value={conoceTestigo} onChange={(e) => setConoceTestigo(e.value)} options={siNo} unselectable={false} />
                        </div>
                    </>
                }
                {
                    (tipo == "denunciante") || (tipo == "denunciado" && form.values.conoceDenunciado == "Si") || (tipo == "testigo" && existeTestigo == "Si" && conoceTestigo == 'Si') ?
                        <div>
                            {
                                tipo == "denunciado" &&
                                <div className="formgrid grid">
                                    <div className="field col-11">
                                        <label htmlFor="tipoPersona">Tipo de Persona</label>
                                        <Dropdown inputId="tipoPersona" name='tipoPersona'
                                            value={form.values.tipoPersona}
                                            options={tiposPersona}
                                            placeholder="Selecciona una opcion"
                                            onChange={(e) => {
                                                form.setFieldValue('tipoPersona', e.value);
                                            }}
                                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoPersona') })} />
                                        {getFormErrorMessage('tipoPersona')}
                                    </div>
                                    <div className="mt-5 col-1">
                                        <Tooltip target=".informacion" />
                                        <i className="informacion pi pi-question-circle p-text-secondary p-overlay-badge"
                                            data-pr-tooltip="Persona Fisica: Persona humana, individuo.
                                        
                                        Persona Juridica: Empresa, cooperativa, etc."
                                            data-pr-position="right"
                                            data-pr-at="right+5 top"
                                            data-pr-my="left center-2"
                                            style={{ fontSize: '2rem', cursor: 'pointer' }}>
                                            {/* <Badge severity="danger"></Badge> */}
                                        </i>
                                    </div>
                                </div>
                            }
                            <div className="formgrid grid">
                                <div className="field col-12 md:col">
                                    <label htmlFor="tipoDocumento">Tipo Documento</label>
                                    <Dropdown inputId="tipoDocumento" name='tipoDocumento'
                                        value={form.values.tipoDocumento}
                                        options={tiposDocumentos}
                                        placeholder="Selecciona una opcion"
                                        onChange={(e) => {
                                            form.setFieldValue('tipoDocumento', e.value);
                                        }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoDocumento') })} />
                                    {getFormErrorMessage('tipoDocumento')}
                                </div>
                                {
                                    form.values.tipoDocumento == "Otro" &&
                                    <div className="field col-12 md:col">
                                        <label htmlFor="tipoDocumentoOtro">Especifique el tipo de documento</label>
                                        <InputText id="tipoDocumentoOtro" name='tipoDocumentoOtro'
                                            value={form.values.tipoDocumentoOtro}
                                            onChange={(e) => { form.setFieldValue('tipoDocumentoOtro', e.target.value); }}
                                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoDocumentoOtro') })} />
                                        {getFormErrorMessage('tipoDocumentoOtro')}
                                    </div>
                                }
                                <div className="field col-12 lg:col">
                                    <label htmlFor="nroDocumento">Nº Documento</label>
                                    <InputText id="nroDocumento" name='nroDocumento' value={form.values.nroDocumento}
                                        onChange={(e) => { form.setFieldValue('nroDocumento', e.target.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('nroDocumento') })} />
                                    {getFormErrorMessage('nroDocumento')}
                                </div>
                            </div>
                            <div className="formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="nombre">Nombre</label>
                                    <InputText id="nombre" name='nombre' value={form.values.nombre}
                                        onChange={(e) => { form.setFieldValue('nombre', e.target.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('nombre') })} />
                                    {getFormErrorMessage('nombre')}
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="apellido">Apellido</label>
                                    <InputText id="apellido" name='apellido' value={form.values.apellido}
                                        onChange={(e) => { form.setFieldValue('apellido', e.target.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('apellido') })} />
                                    {getFormErrorMessage('apellido')}
                                </div>
                            </div>
                            <div className="formgrid grid">
                                <div className="field col-12 md:col">
                                    <label htmlFor="alias">Alias</label>
                                    <InputText id="alias" name='alias' value={form.values.alias}
                                        onChange={(e) => { form.setFieldValue('alias', e.target.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('alias') })} />
                                    {getFormErrorMessage('alias')}
                                </div>
                                <div className="field col-12 md:col">
                                    <label htmlFor="identidad">Identidad Autopercibida</label>
                                    <Dropdown inputId="identidad" name='identidad'
                                        value={form.values.identidad}
                                        options={identidades}
                                        placeholder="Selecciona una opcion"
                                        onChange={(e) => {
                                            form.setFieldValue('identidad', e.value);
                                        }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('identidad') })} />
                                    {getFormErrorMessage('identidad')}
                                </div>
                            </div>
                            <div className="formgrid grid">
                              <div className="field col-12 lg:col">
                                  <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                  <Calendar inputId="fechaNacimiento" name="fechaNacimiento" dateFormat="dd/mm/yy"
                                      value={form.values.fechaNacimiento} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('fechaNacimiento') })}
                                      onChange={(e) => { form.setFieldValue('fechaNacimiento', e.target.value); }} />
                                  {getFormErrorMessage('fechaNacimiento')}
                              </div>
                              <div className="field col-12 lg:col">
                                  <label htmlFor="nacionalidad">Nacionalidad</label>
                                  <Dropdown inputId="nacionalidad" name='nacionalidad'
                                      value={form.values.nacionalidad}
                                      options={nacionalidades}
                                      optionLabel="nacionalidad"
                                      optionValue="id"
                                      placeholder="Selecciona una opcion"
                                      onChange={(e) => {
                                          form.setFieldValue('nacionalidad', e.value);
                                      }}
                                      className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('nacionalidad') })} />
                                  {getFormErrorMessage('nacionalidad')}
                              </div>
                            </div>
                        <div className="formgrid grid">
                            <div className="field col-12 lg:col">
                                <label htmlFor="provincia">Provincia</label>
                                <Dropdown inputId="provincia" name='provincia'
                                    value={form.values.provincia}
                                    options={provincias}
                                    optionLabel="provincia"
                                    optionValue="id"
                                    placeholder="Selecciona una opcion"
                                    onChange={(e) => {
                                        var prov = provincias.find((prov)=>{ return prov.id==e.value;});
                                        borrarCambiosProvincia(prov.provincia);
                                        getLocalidades(1).then(({data:{data}}) => {
                                            console.log(data)
                                            setLocalidades(data);
                                        });
                                        form.setFieldValue('provincia', e.value);
                                    }}
                                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('provincia') })} />
                                {getFormErrorMessage('provincia')}
                            </div>
                            {
                                esJujuy == 'Si' &&
                                <div className="field col-12 lg:col">
                                    <label htmlFor="departamento">Departamento</label>
                                    <Dropdown inputId="departamento" name='departamento'
                                        value={form.values.departamento}
                                        options={departamentos}
                                        optionLabel="departamento"
                                        optionValue="id"
                                        placeholder="Selecciona una opcion"
                                        onChange={(e) => {
                                            getLocalidades(e.value).then(({data:{data}}) => {
                                                setLocalidades(data);
                                            });
                                            getBarrios(e.value).then(({data:{data}}) => {
                                                setBarrios(data);
                                            });
                                            form.setFieldValue('departamento', e.value);
                                        }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('departamento') })} />
                                    {getFormErrorMessage('departamento')}
                                </div>
                            }
                        </div>
                        <div className="formgrid grid">
                        {
                            esJujuy == 'Si' &&
                            <div className='field col-12 lg:col'>
                                <label htmlFor="localidad">Localidad</label>
                                <Dropdown inputId="localidad" name='localidad'
                                    value={form.values.localidad}
                                    options={localidades}
                                    optionLabel="localidad"
                                    optionValue="id"
                                    placeholder="Selecciona una opcion"
                                    onChange={(e) => {
                                        var coords;
                                        var localidad = localidades.find((localidad)=>{ return localidad.id==e.value;});
                                        coords = {lat: Number(localidad.latitud) , lng: Number(localidad.longitud)};
                                        setCoords(coords);
                                        form.setFieldValue('localidad', e.value);
                                    }}
                                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('localidad') })} />
                                {getFormErrorMessage('localidad')}
                            </div>
                        }
                        </div>
                        <div className="formgrid grid">
                            {
                                esJujuy == 'Si' &&
                                <div className="field col-12 lg:col">
                                    <label htmlFor="barrio">Barrio</label>
                                    <Dropdown inputId="barrio" name='barrio'
                                        value={form.values.barrio}
                                        options={barrios}
                                        optionLabel="barrio"
                                        optionValue="id"
                                        placeholder="Selecciona una opcion"
                                        onChange={(e) => { form.setFieldValue('barrio', e.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('barrio') })} />
                                    {getFormErrorMessage('barrio')}
                                </div>
                            }

                                <div className="field col-12 lg:col">
                                    <label htmlFor="direccion">Dirección</label>
                                    <InputText id="direccion" name='direccion' value={form.values.direccion}
                                        onChange={(e) => { form.setFieldValue('direccion', e.target.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('direccion') })} />
                                    {getFormErrorMessage('direccion')}
                                </div>
                                <div className='field col-12'>
                                    <h3 htmlFor="georeferencia">Georreferencia</h3>
                                    <MapTemplate changeCoord={changeCoord} center={coords}></MapTemplate>
                                </div>
                        </div>
                            
                            {tipo == "denunciante" &&
                                <div className="field">
                                    <span className="form-label">Fotos DNI</span>
                                    <div style={{ position: "relative" }} >
                                        <label htmlFor="file" className={classNames({ 'file-style': form.values.fotosDni.length > 0 || touchedFiles == false, 'file-style-invalid': touchedFiles == true && form.values.fotosDni.length == 0 })}>
                                            <i className="pi pi-cloud-upload text-5xl"></i>
                                            <p>Arrastre o Haga click para subir Archivos</p>
                                        </label>
                                        <input id="file" type='file' multiple onClick={e => setTouchedFiles(true)}
                                            onChange={(e) => { form.setFieldValue('fotosDni', Array.from(e.target.files)); setTouchedFiles(true) }}></input>
                                    </div>
                                    <div className='mt-3 mb-5'>
                                        {recorrerArchivos()}
                                    </div>
                                </div>
                            }
                            <h2>Datos de Contacto</h2>
                            <div className="formgrid grid">
                                <div className="field col-12 lg:col">
                                    <label htmlFor="telefonoFijo">Telefono Fijo</label>
                                    <InputText id="telefonoFijo" name="telefonoFijo" value={form.values.telefonoFijo}
                                        onChange={(e) => { form.setFieldValue('telefonoFijo', e.target.value); }}
                                        placeholder="(388)-9999999" className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('telefonoFijo') })} />
                                    {getFormErrorMessage('telefonoFijo')}
                                </div>
                                <div className="field col-12 lg:col">
                                    <label htmlFor="telefonoMovil">Telefono Movil {tipo == 'denunciante' && "(válido para notificaciones)"}</label>
                                    <InputText id="telefonoMovil" name="telefonoMovil" value={form.values.telefonoMovil}
                                        onChange={(e) => { form.setFieldValue('telefonoMovil', e.target.value); }}
                                        placeholder="(388)-9999999" className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('telefonoMovil') })} />
                                    {getFormErrorMessage('telefonoMovil')}
                                </div>
                                <div className="field col-12 lg:col">
                                    <label htmlFor="email">Correo Electronico {tipo == 'denunciante' && "(válido para notificaciones)"}</label>
                                    <InputText id="email" name='email' value={form.values.email} onChange={(e) => { form.setFieldValue('email', e.target.value); }}
                                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('email') })} />
                                    {getFormErrorMessage('email')}
                                </div>
                            </div>
                            {
                                (tipo == "denunciado" || tipo == 'testigo') &&
                                <div className="field">
                                    <label htmlFor="infoAdicional">Informacion Adicional</label>
                                    <InputTextarea
                                        id="infoAdicional" name='infoAdicional'
                                        rows={4} cols={30} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoDocumento') })}
                                        value={form.values.infoAdicional}
                                        onChange={(e) => { form.setFieldValue('infoAdicional', e.target.value); }}
                                        placeholder='Informacion adicional para identificar a la persona' />
                                    {/* {getFormErrorMessage('infoAdicional')} */}
                                </div>
                            }
                            {getFormErrorMessage('formVacio')}
                        </div>
                        :
                        <div className="field">
                            <label htmlFor="infoAdicional">Informacion Adicional</label>
                            <InputTextarea
                                id="infoAdicional" name='infoAdicional'
                                rows={4} cols={30} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoDocumento') })}
                                value={form.values.infoAdicional}
                                onChange={(e) => { form.setFieldValue('infoAdicional', e.target.value); }}
                                placeholder='Informacion adicional para identificar a la persona' />
                            {getFormErrorMessage('infoAdicional')}
                        </div>
                }
                <Button type="submit" className='w-full' icon='pi pi-upload' label="Confirmar" />
            </form>
        </>
    )
}