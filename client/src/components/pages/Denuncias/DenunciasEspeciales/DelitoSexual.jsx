
import { MultiSelect } from "primereact/multiselect"
import { SelectButton } from "primereact/selectbutton";
import { classNames } from "primereact/utils";
import { memo, useEffect } from "react";
import { useOtrosFormContext } from "../../../../pages/Denuncia/Denuncia";
import { useFormik } from "formik";

export const DelitoSexual = memo(() => {
    
    const { delitoSexual, setDelitoSexual, validacion } = useOtrosFormContext();

    const hechosSexual = [
        {label:'Acercamiento del agresor con contenido sexual (sin contacto físico) contra o sin su voluntad',code:'hechoAcercamiento'},
        {label:'Contacto tecnológico por parte de un mayor de edad a un menor de edad con el propósito de cometer un delito contra su integridad sexual',code:'hechoContactoTecnologico'},
        {label:'Beso en la boca',code:'hechoBeso'},
        {label:'Tocamiento de partes íntimas',code:'hechoTocamiento'},
        {label:'Introducción de un objeto o una parte del cuerpo en un orificio de la víctima',code:'hechoIntroduccion'},
    ];

    const accionesAutor = [
        {label:'Emplear violencia o proferir amenazas',code:'accionViolencia'},
        {label:'Aprovecharse de la inexperiencia de la victima',code:'accionInexperiencia'},
        {label:'Utilizar drogas',code:'accionDrogas'},
        {label:'Aprovechar una especial situación de vulnerabilidad o debilidad de la víctima (enfermedad, carencia de razón o estado de inconsciencia)',code:'accionVulnerabilidad'},
        {label:'Utilizar un arma',code:'accionArma'}
    ];

    const form = useFormik({
        initialValues:{
            hechosSexual: delitoSexual.hechosSexual,
            accionesAutor: delitoSexual.accionesAutor,
            denunciasPrevias: delitoSexual.denunciasPrevias,
            solicitudImagenes: delitoSexual.solicitudImagenes,
            menorInvolucrado: delitoSexual.menorInvolucrado,
            mediosElectronicos: delitoSexual.mediosElectronicos,
        },
        validate: (data) => {
            let errors = {};
            if(data.hechosSexual === undefined || data?.hechosSexual?.length == 0){
                errors.hechosSexual = "Este campo es requerido";
            }
            if(data.accionesAutor === undefined || data?.accionesAutor?.length == 0){
                errors.accionesAutor = "Este campo es requerido";
            }
            return errors;
        }
    })

    const siNo = ['Si','No']

    const isFormFieldInvalid = (name) => !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) => { return isFormFieldInvalid(name) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>; };


    const enviarDatos = (e,campo) => {
        if(campo == 'mediosElectronicos') {
            form.setFieldValue('mediosElectronicos',e.value);
            delitoSexual.mediosElectronicos = e.value;
            form.touched['mediosElectronicos'] = true;
        }
        if(campo == 'hechosSexual'){
            form.setFieldValue('hechosSexual',e.value);
            delitoSexual.hechosSexual = e.value;
            form.touched['hechosSexual'] = true;
        }
        if(campo == 'accionesAutor'){
            form.setFieldValue('accionesAutor',e.value);
            delitoSexual.accionesAutor = e.value;
            form.touched['accionesAutor'] = true;
        }
        if(campo == 'denunciasPrevias'){
            form.setFieldValue('denunciasPrevias',e.value);
            delitoSexual.denunciasPrevias = e.value;
            form.touched['denunciasPrevias'] = true;
        } 
        if(campo == 'solicitudImagenes'){
            form.setFieldValue('solicitudImagenes',e.value);
            delitoSexual.solicitudImagenes = e.value;
            form.touched['solicitudImagenes'] = true;
        }
        if(campo == 'menorInvolucrado'){
            form.setFieldValue('menorInvolucrado',e.value);
            delitoSexual.menorInvolucrado = e.value;
            form.touched['menorInvolucrado'] = true;
        }
        setDelitoSexual(delitoSexual);
    }

    useEffect(() => {
        const allTouched = {};
        form.setValues(delitoSexual);
        if(validacion==true){
            Object.keys(form.initialValues).forEach((key) => {
                allTouched[key] = true;
            });
            form.setTouched(allTouched);
        }
      }, [form.values, validacion]);

    return(
        <>
            <div>
                <div className="formgrid grid">
                    <div className="field col-12 lg:col-6">    
                        <label htmlFor="hechoSexual">¿En que consistio el hecho?</label>
                        <br />
                        <MultiSelect
                            id="hechoSexual"
                            panelHeaderTemplate={<></>}
                            value={form.values.hechosSexual} 
                            options={hechosSexual}
                            placeholder="Seleccione una o varias"
                            onChange={(e) => enviarDatos(e,'hechosSexual')} 
                            maxSelectedLabels={2} 
                            selectedItemsLabel={`${form.values.hechosSexual ? form.values.hechosSexual.length : ''} Items seleccionados`}
                            showSelectAll={false}
                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('hechosSexual') })} 
                        />
                        {getFormErrorMessage('hechosSexual')}
                    </div>
                    <div className="field col-12 lg:col-6">
                        <label htmlFor="accionAutor">¿Cuál de las siguientes acciones realizó el autor?</label>
                        <br />
                        <MultiSelect
                            id="accionAutor"
                            panelHeaderTemplate={<></>}
                            value={form.values.accionesAutor} 
                            options={accionesAutor}
                            placeholder="Seleccione una o varias"
                            onChange={(e) => enviarDatos(e,'accionesAutor')} 
                            maxSelectedLabels={2} 
                            selectedItemsLabel={`${form.values.accionesAutor ? form.values.accionesAutor.length : ''} Items seleccionados`}
                            showSelectAll={false}
                            className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('accionesAutor') })} 
                        />
                        {getFormErrorMessage('accionesAutor')}
                    </div>
                    <div className="field col-12 lg:col-6">
                        <span className='form-label'>¿Ha realizado previamente Ia denuncia en una dependencia o Ministerio Público de la Acusación?</span>
                        <SelectButton
                            value={form.values.denunciasPrevias}
                            onChange={(e) => enviarDatos(e,'denunciasPrevias')}
                            options={siNo}
                            unselectable={false} 
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}
                        />
                    </div>
                    <div className="field col-12 lg:col-6">
                        <span className='form-label'>¿El/los autor/es enviaron a la victima imágenes con contenido sexual por medios electrónicos?</span>
                        <SelectButton
                            value={form.values.mediosElectronicos}
                            onChange={(e) => enviarDatos(e,'mediosElectronicos')}
                            options={siNo}
                            unselectable={false} 
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}
                        />
                    </div>
                    <div className="field col-12 lg:col-6">
                        <span className='form-label'>¿El autor solicitó imágenes con contenido sexual?</span>
                        <SelectButton
                            value={form.values.solicitudImagenes}
                            onChange={(e) => enviarDatos(e,'solicitudImagenes')}
                            options={siNo}
                            unselectable={false} 
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}
                        />
                    </div>
                    <div className="field col-12 lg:col-6">
                        <span className='form-label'>¿Se vió involucrado algún menor entre las victimas?</span>
                        <SelectButton
                            value={form.values.menorInvolucrado}
                            onChange={(e) => enviarDatos(e,'menorInvolucrado')}
                            options={siNo}
                            unselectable={false} 
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
})