import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { SelectButton } from 'primereact/selectbutton';

import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from "primereact/utils";
import { consultarDenuncia } from '../../../api/denuncias.api';
import { Dialog } from 'primereact/dialog';

import { Toast } from 'primereact/toast';
        


export default function ConsultarDenuncia() {
    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
    const tiposDocumentos = ['DNI', 'Pasaporte', 'Cedula', 'Otro'];
    const [result, setResult] = useState({ data: { data: { fecha_denuncia: '', hora_denuncia: '' } } })
    const [show, setShow] = useState(false)
    const toast = useRef(null);

   

    const form = useFormik({
        initialValues: {
            numeroDenuncia: '',
            anonimo: 0,
            tipoIdentificacion: '',
            numeroIdentificacion: '',
        },
        validate: (data) => {
            let errors = {};
            if (!data.numeroDenuncia)
                errors.numeroDenuncia = 'El Numero de la Denuncia es requerido.';
            if (data.anonimo == 0) {
                if (!data.tipoIdentificacion)
                    errors.tipoIdentificacion = 'El Tipo de Identificacion es requerido.';
                if (!data.numeroIdentificacion)
                    errors.numeroIdentificacion = 'El Numero de Identificacion es requerido.';
            }
            return errors;
        },
        onSubmit: async (data) => {
            console.log(data)
            if(data.anonimo == 1) {
                data.tipoIdentificacion = undefined
                data.numeroIdentificacion = undefined
            }
            try {
                var denuncia = await consultarDenuncia(data);
                setResult(denuncia)
                setShow(true)
            }
            catch (e) {
                console.log("cago amigo")
                showError()
                
            }
            

            //Object.assign(denTest, data);
        }
    });

    const isFormFieldInvalid = (name) => !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'La denuncia no ha podido ser encontrada', life: 3000});
    }

    return (
        <>
            <div id='container' className='pt-6 px-6'>
            <Toast ref={toast} />
                <h1 className='text-center text-lightblue-mpa mb-6'>Consultar Denuncia</h1>

                <form onSubmit={form.handleSubmit} className="px-4 mt-4">
                    <div className='formgrid grid'>
                        <div className='field col mb-5'>
                            <label htmlFor="numeroDenuncia" className='text-base'>Numero de la Denuncia</label>
                            <span className="p-input-icon-right w-full">
                                <i className="pi pi-search" />
                                <InputText id="numeroDenuncia" placeholder='Ingrese el numero de la denuncia a Buscar' value={form.values.numeroDenuncia} onChange={(e) => form.setFieldValue('numeroDenuncia', e.target.value)} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('numeroDenuncia') })} />
                            </span>

                            {getFormErrorMessage('numeroDenuncia')}
                        </div>
                    </div>
                    <div className="formgrid grid mb-5">
                        <div className="col">
                            <span className="form-label " htmlFor="anonimo">¿La denuncia fue realizada de forma Anónima?</span>
                            <SelectButton id="anonimo" name="anonimo" value={form.values.anonimo} onChange={(e) => form.setFieldValue('anonimo', e.value)} options={siNo} className='w-full md:w-5 lg:w-3' unselectable={false} optionLabel="name" pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                        </div>
                    </div>
                    {form.values.anonimo == 0 &&
                        <div className="formgrid grid mb-5">
                            <div className='field col'>
                                <label htmlFor="tipoIdentificacion">Tipo de Identificacion</label>
                                <Dropdown inputId="tipoIdentificacion" placeholder='Seleccione el tipo de Identificacion' value={form.values.tipoIdentificacion} onChange={(e) => form.setFieldValue('tipoIdentificacion', e.value)} options={tiposDocumentos} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoIdentificacion') })} />
                                {getFormErrorMessage('tipoIdentificacion')}
                            </div>

                            <div className='field col'>
                                <label htmlFor="numeroIdentificacion">Numero de Identificacion</label>
                                <InputText id="numeroIdentificacion" placeholder='Ingrese el numero de Identificacion' value={form.values.numeroIdentificacion} onChange={(e) => form.setFieldValue('numeroIdentificacion', e.target.value)} className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('numeroIdentificacion') })} />
                                {getFormErrorMessage('numeroIdentificacion')}
                            </div>
                        </div>}
                    <Button label='Buscar' type='submit' className='w-full btn-blue-mpa py-3'></Button>
                </form>

                <Dialog header={form.values.numeroDenuncia} draggable={false} blockScroll={true} visible={show} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={e => setShow(false)} >

                    <p><span className='text-bold'>Fecha Denuncia: </span>{result.data.data.fecha_denuncia}</p>
                    <p><span className='text-bold'>Hora Denuncia: </span>{result.data.data.hora_denuncia}</p>
                    <p><span className='text-bold'>Competencia: </span>{result.data.data.competencia == null ? "-" : result.data.data.competencia}</p>
                    <p><span className='text-bold'>Fecha Ratificacion: </span>{result.data.data.fecha_ratificacion == null ? "-" : result.data.data.fecha_ratificacion}</p>

                </Dialog>
            </div>
        </>
    )
}