import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import React, { useState, useEffect } from 'react';
import { useDenunciaContext } from '../../../../pages/Denuncia/Denuncia';
import { SelectButton } from 'primereact/selectbutton';
import { Checkbox } from 'primereact/checkbox';
export default function BusquedaDePersonas(props) {
    const [paso, setPaso] = useState(1);
    const [dialog, setDialog] = useState(false);
    const tiposDocumentos = ['DNI', 'Pasaporte', 'Cedula', 'Otro'];
    const identidades = ['MUJER', 'HOMBRE', 'MUJER TRANS', 'VARON TRANS', 'PERSONA NO BINARIA', 'OTRO'];
    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
    const { tipoValue, str, nacionalidades, provincias, departamentos, localidades, barrios } = useDenunciaContext();

    const form = useFormik({
        initialValues: {
            //Datos Persona Buscada
            id: '',
            idIntervinienteTipo: 4,//Id Persona Buscada
            tipoIdentificacion: '',
            numeroIdentificacion: '',
            exhibeIdentificacion: 1,
            nombre: '',
            apellido: '',
            alias: '',
            identidadAutopercibida: '',
            fechaNacimiento: '',
            idPais: '',//nacionalidad
            domicilio: '',//coordenadas

            //Informacion General
            nombreConyugue: '',
            datosContactoConyugue: '',
            domicilioConyugue: '',
            telefonoLineaConyugue: '',
            celularConyugue: '',
            emailConyugue: '',

            nombrePadre: '',
            dniPadre: '',
            datosContactoPadre: '',
            domicilioPadre: '',
            telefonoLineaPadre: '',
            celularPadre: '',
            emailPadre: '',

            nombreMadre: '',
            dniMadre: '',
            datosContactoMadre: '',
            domicilioMadre: '',
            telefonoLineaMadre: '',
            celularMadre: '',
            emailMadre: '',

            lugarTrabajo: '',
            direccionTrabajo: '',
            funcionTrabajo: '',
            datosCompañerosTrabajo: '',
            lugarEstudio: '',
            direccionEstudio: '',
            datosCompañerosEstudio: '',

            //Tipo de Denuncia
            fugaHogar: '',
            trataPersonas: '',
            fugaInstitucion: '',
            averiguacionParadero: '',
            desaparicion: '',
            violenciaInstitucional: '',
            otro: '',
            otroDetalle: '',

            //Datos del Hecho
            fechaDesaparicion: '',
            lugarDesaparicion: '',
            latitudBusqueda: '',
            longitudBusqueda: '',
            contextoDesaparicion: '',
            relatoHecho: '',
            vestimentaDesaparicion: '',
            efectosPersonales: '',
            cambiosRecientes: '',
            personaInteres: '',
            busquedaTrabajo: '',

            //Caracteristicas Fisicas
            caracteristicasGenerales: '',
            altura: '',
            enfermedades: '',
            fracturas: '',
            rasgosOdontologicos: '',
            observaciones: '',

            fichasDentales: '',
            fichasDactiloscopicas: '',
            fotoCaracteristicas: '',
        },
        validate: (data) => {
            let errors = {};
            if (!data.tipoIdentificacion)
                errors.tipoIdentificacion = 'El tipo de Identificacion es requerido.';
            if (!data.numeroIdentificacion)
                errors.numeroIdentificacion = 'El numero de Identificacion es requerido.';
            if (!data.exhibeIdentificacion)
                errors.exhibeIdentificacion = 'Exhibe Identificacion es requerido.';
            if (!data.nombre)
                errors.nombre = 'El Nombre es requerido.';
            if (!data.apellido)
                errors.apellido = 'El Apellido es requerido.';
            // if (!data.alias)
            //     errors.alias = 'El alias es requerido.';
            if (!data.identidadAutopercibida)
                errors.identidadAutopercibida = 'La Identidad autopercibida es requerida.';
            if (!data.fechaNacimiento)
                errors.fechaNacimiento = 'La Fecha de Nacimiento es requerida.';
            if (!data.idPais)
                errors.idPais = 'La Nacionalidad es requerida.';
            if (!data.domicilio)
                errors.domicilio = 'El domicilio es requerido.';
            return errors;
        },
        onSubmit: (data) => {
            data.fechaNacimiento = new Date(data.fechaNacimiento).toLocaleDateString('en-GB');
            var datosDenuncia = new { ...data }

            datosDenuncia.id = props.denunciasBusqueda.lenght + 1;
            props.setDenunciasBusqueda([...props.denunciasBusqueda, datosDenuncia]);
            form.resetForm();
            setDialog(false);
        }
    });

    const isFormFieldInvalid = (name) => !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const campo = (clase, id, name, placeholder, type, list) => {
        var array = list || [];
        var input = <div></div>
        switch (type) {
            case "Dropdown":
                input = <Dropdown inputId={id} name={id}
                    value={form.values[id]}
                    options={array}
                    placeholder={placeholder}
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
                    placeholder={placeholder}
                    onChange={(e) => {
                        form.setFieldValue(id, e.value);
                    }}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "InputText":
                input = <InputText id={id} name={id}
                    value={form.values[id]}
                    onChange={(e) => { form.setFieldValue(id, e.target.value); }} placeholder={placeholder}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "TextArea":
                input = <InputTextarea
                    id={id} name={id} rows={4} cols={30} value={form.values[id]}
                    onChange={(e) => { form.setFieldValue(id, e.target.value); }}
                    onBlur={form.handleBlur}
                    placeholder={placeholder}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })} />
                break;
            case "Calendar":
                input = <Calendar inputId={id} name={id} value={form.values[id]}
                    className={classNames('w-full', { 'p-invalid': isFormFieldInvalid(id) })}
                    onChange={(e) => { form.setFieldValue(id, e.target.value); }} showIcon
                    pt={{ dropdownButton: { root: { className: 'btn-blue-mpa' } } }} />
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

    const campoSelect = (clase, id, name) => {
        return (<div className={clase}>
            <div className='w-full'>
                <span className='form-label'>{name}</span>
                <SelectButton value={form.values[id]} className='w-full w-10'
                    onChange={(e) => form.setFieldValue(id, e.target.value)}
                    options={siNo} unselectable={false} optionLabel="name"
                    pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
            </div>
        </div>)
    }

    const campoCheck = (id, name) => {
        return (
            <div className="col-12 md:col-6">
                <div className='border-solid border-round-lg border-3 py-4 mx-3 mb-1'>
                    <div className='ml-5'>
                        <Checkbox inputId={id} value={id} onChange={e => form.setFieldValue(id, e.target.checked)} checked={form.values[id]} />
                        <label htmlFor={id} className="ml-2">{name}</label>
                    </div>
                </div>
            </div>
        )
    }


    return (
        //Busqueda de Personas
        <div className='mx-4'>
            <h2>Datos Personales de las persona Buscada</h2>
            <Button label='Mostrar form' onClick={e => setDialog(true)}></Button>
            <Dialog visible={dialog} header="Datos Persona desaparecida" draggable={false} blockScroll={true} breakpoints={{ '641px': '100vw', '960px': '95vw' }} onHide={() => setDialog(false)}>
                <form onSubmit={form.submit}>
                    <div id="datosPersonales">
                        <h2>Datos Personales de la Persona Buscada</h2>
                        <div className="formgrid grid">
                            {campo('field col-12 md:col-4', 'tipoIdentificacion', 'Tipo de Identificacion', 'Seleccione una Opcion...', 'Dropdown', tiposDocumentos)}
                            {campo('field col-12 md:col-4', 'numeroIdentificacion', 'Numero de Identificacion', 'Ingrese el numero de la Identificacion', 'InputText', [])}
                            {/* Exhibe Identificacion field col-12 md:col-4*/}

                            {campoSelect('field', 'exhibeIdentificacion', 'Exhibe Identificacion?')}

                            {campo('field col-12 md:col-6', 'nombre', 'Nombre', 'Ingrese el Nombre', 'InputText', [])}
                            {campo('field col-12 md:col-6', 'apellido', 'Apellido', 'Ingrese el Apellido', 'InputText', [])}
                            {campo('field col-12 md:col-7', 'alias', 'Alias', 'Ingrese el Alias', 'InputText', [])}
                            {campo('field col-12 md:col-3', 'identidadAutopercibida', 'Identidad Autopercibida', 'Seleccione una Opcion...', 'Dropdown', identidades)}
                            {campo('field col-12 md:col-4', 'fechaNacimiento', 'Fecha de Nacimiento', 'Ingrese una Fecha', 'Calendar', [])}
                            {campo('field col-12 md:col-4', 'idPais', 'Nacionalidad', 'Seleccione una Nacionalidad...', 'DropdownValue', nacionalidades)}
                            {campo('field col-12 md:col-4', 'domicilio', 'Domicilio', 'Ingrese un Domicilio', 'InputText', [])}
                        </div>
                    </div>
                    <div id="informacionGeneral">
                        <div id="informacionPareja">
                            <h2 className='underline'>*En caso de estar en pareja</h2>
                            <div className="formgrid grid">
                                {campo('field col-12 md:col-6', 'nombreConyugue', 'Nombre del Conyugue', 'Ingrese el Nombre', 'InputText', [])}
                                {campo('field col-12 md:col-6', 'datosContactoConyugue', 'Datos de Contacto del Conyugue', 'Ingrese Los Datos de Contacto', 'InputText', [])}
                                {campo('field col-12 md:col-6', 'domicilioConyugue', 'Domicilio del Conyugue', 'Ingrese el Domicilio', 'InputText', [])}
                                {campo('field col-12 md:col-6', 'telefonoLineaConyugue', 'Telefono de Linea del Conyugue', 'Ingrese el Telefono de Linea', 'InputText', [])}
                                {campo('field col-12 md:col-6', 'celularConyugue', 'Celular del Conyugue', 'Ingrese el Celular', 'InputText', [])}
                                {campo('field col-12 md:col-6', 'emailConyugue', 'E-mail del Conyugue', 'Ingrese el E-mail', 'InputText', [])}
                            </div>
                        </div>
                        <div id="informacionPadres">
                            <h2 className='underline'>*En caso de corresponder datos de los/as hijos/as</h2>
                            <div id="informacionPadre">
                                <h3>Datos del Padre</h3>
                                <div className="formgrid grid">
                                    {campo('field col-12 md:col-6', 'nombrePadre', 'Nombre del Padre', 'Ingrese el Nombre', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'dniPadre', 'DNI del Padre', 'Ingrese el DNI del Padre', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'datosContactoPadre', 'Datos de Contacto del Padre', 'Ingrese Los Datos de Contacto', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'domicilioPadre', 'Domicilio del Padre', 'Ingrese el Domicilio', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'telefonoLineaPadre', 'Telefono de Linea del Padre', 'Ingrese el Telefono de Linea', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'celularPadre', 'Celular del Padre', 'Ingrese el Celular', 'InputText', [])}
                                    {campo('field col-12', 'emailPadre', 'E-mail del Padre', 'Ingrese el E-mail', 'InputText', [])}
                                </div>
                            </div>
                            <div id="informacionMadre">
                                <h3>Datos de la Madre</h3>
                                <div className="formgrid grid">
                                    {campo('field col-12 md:col-6', 'nombreMadre', 'Nombre del Madre', 'Ingrese el Nombre', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'dniMadre', 'DNI del Madre', 'Ingrese el DNI del Madre', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'datosContactoMadre', 'Datos de Contacto del Madre', 'Ingrese Los Datos de Contacto', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'domicilioMadre', 'Domicilio del Madre', 'Ingrese el Domicilio', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'telefonoLineaMadre', 'Telefono de Linea del Madre', 'Ingrese el Telefono de Linea', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'celularMadre', 'Celular del Madre', 'Ingrese el Celular', 'InputText', [])}
                                    {campo('field col-12', 'emailMadre', 'E-mail del Madre', 'Ingrese el E-mail', 'InputText', [])}
                                </div>
                            </div>
                        </div>
                        <div id="informacionActividades">
                            <div id="informacionTrabajo">
                                <h3>¿La persona buscada, Trabajaba?</h3>
                                <div className="formgrid grid">
                                    {campo('field col-12 md:col-6', 'lugarTrabajo', 'Lugar de Trabajo', 'Ingrese el Lugar de Trabajo', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'direccionTrabajo', 'Direccion de Trabajo', 'Ingrese la direccion de Trabajo', 'InputText', [])}
                                    {campo('field col-12', 'funcionTrabajo', 'Funcion de Trabajo', 'Ingrese la funcion de Trabajo', 'InputText', [])}
                                    {campo('field col-12', 'datosCompañerosTrabajo', 'Datos de Trabajo', 'Ingrese Los Datos Compañeros de Trabajo', 'TextArea', [])}
                                </div>

                            </div>
                            <div id="informacionEstudio">
                                <h3>¿La persona buscada, Estudiaba?</h3>
                                <div className="formgrid grid">
                                    {campo('field col-12 md:col-6', 'lugarEstudio', 'Lugar de Estudio', 'Ingrese el Lugar de Estudio', 'InputText', [])}
                                    {campo('field col-12 md:col-6', 'direccionEstudio', 'Direccion de Estudio', 'Ingrese la direccion de Estudio', 'InputText', [])}
                                    {campo('field col-12', 'datosCompañerosEstudio', 'Datos de Estudio', 'Ingrese Los Datos Compañeros de Estudio', 'TextArea', [])}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='tipoDenuncia'>
                        <h2 className='underline'>Tipo de Denuncia</h2>
                        <div className="form-grid grid">
                            {campoCheck('fugaHogar', 'Fuga del Hogar')}
                            {campoCheck('trataPersonas', 'Trata de Personas')}
                            {campoCheck('fugaInstitucion', 'Fuga de Institucion')}
                            {campoCheck('averiguacionParadero', 'Averiguacion del Paradero')}
                            {campoCheck('desaparicion', 'Desaparicion')}
                            {campoCheck('violenciaInstitucional', 'Violencia Institucional')}
                            {campoCheck('otro', 'Otro')}
                            {campo('col-12 md:col', 'otroDetalle', 'Detalles', 'Ingrese el Detalle', 'InputText', [])}
                        </div>
                    </div>
                    <div id='datosHecho'>
                        <h2 className='underline'>Datos del Hecho</h2>
                        <div className="form-grid grid">
                            {campo('field col-12 md:col-6', 'fechaDesaparicion', 'Fecha de Desaparicion', 'Ingrese una Fecha', 'Calendar', [])}
                            {campo('field col-12 md:col-6', 'lugarDesaparicion', 'Lugar de Desaparicion', 'Ingrese el Lugar de Desaparicion', 'InputText', [])}
                            {/* Map */}
                            {campo('field col-12', 'contextoDesaparicion', 'Contexto de Desaparicion', 'Ingrese el Contexto de Desaparicion', 'TextArea', [])}
                            {campo('field col-12', 'relatoHecho', 'Relato del Hecho', 'Ingrese el Relato del Hecho', 'TextArea', [])}
                            {campo('field col-12', 'vestimentaDesaparicion', 'Vestimenta de Desaparicion', 'Ingrese la Vestimenta de Desaparicion', 'TextArea', [])}
                            {campo('field col-12', 'efectosPersonales', 'Efectos Personales', 'Ingrese los Efectos Personales', 'TextArea', [])}
                            {campo('field col-12', 'cambiosRecientes', 'Cambios Recientes', 'Ingrese los cambios Recientes', 'TextArea', [])}
                            {campo('field col-12', 'personaInteres', 'Personas de Interes', 'Ingrese datos de las personas de Interes', 'TextArea', [])}
                            {campo('field col-12', 'busquedaTrabajo', '¿Estaba Buscando Trabajo?', '¿La persona estaba buscando trabajo?', 'TextArea', [])}
                        </div>
                    </div>
                    <div id="caracteristicasFisicas">

                        <h2 className='underline'>Caracteristicas Fisicas</h2>
                        <div className="form">
                            {campo('field col-12', 'caracteristicasGenerales', 'Caracteristicas Generales', 'Preguntar Color de pelo, color de Ojos, tez, tatuajes, etc', 'TextArea', [])}
                            {campo('field col-12', 'altura', 'Altura', 'Ingresar la Altura', 'InputText', [])}
                            {campo('field col-12', 'enfermedades', 'Enfermedades Congénitas/Patologias', 'Agregar Enfermedades Congénitas/Patologias', 'TextArea', [])}
                            {campo('field col-12', 'fracturas', 'Fracturas', 'Preguntar cuando las sufrio, hueso o zona afectada', 'TextArea', [])}
                            {campo('field col-12', 'rasgosOdontologicos', 'Rasgos Odontologicos', 'Preguntar extracciones, uso de protesis, aparatos, implantes, etc', 'TextArea', [])}
                            {campo('field col-12', 'observaciones', 'Observaciones', 'Agregar Observaciones o comentarios', 'TextArea', [])}
                            {/*
                                Archivos:
                                
                                fichasDentales: '',
                                fichasDactiloscopicas: '',
                                fotoCaracteristicas: '',
                            */}

                        </div>
                    </div>
                </form>
            </Dialog>
        </div>


    )
}