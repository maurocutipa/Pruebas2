import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect"
import { useOtrosFormContext } from "../../../../pages/Denuncia/Denuncia";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { useEffect } from "react";

export const MaltratoAnimal = () => {

    const { maltratoAnimal, setMaltratoAnimal, validacion} = useOtrosFormContext();

    const condicionAnimal = [
        {label:'Murió',code:'Murio'},
        {label:'Vive',code:'Vive'}
    ];
    const siNoNoSabe = [
        {label:'Si',code:'Si'},
        {label:'No',code:'No'},
        {label:'No sabe',code:'No Sabe'}
    ];
    const relacionAnimal = [
        {label:'Propietario',code:'Propietario'},
        {label:'Guardían',code:'Guardian'},
        {label:'Medico Veterinario',code:'Medico Veterinario'},
        {label:'Vecino',code:'Vecino'},
        {label:'Otro',code:'Otro'}
    ];
    const tipoAnimal = [
        {label:'Domestico',code:'Domestico'},
        {label:'Exótico',code:'Exotico'},
        {label:'Silvestre',code:'Silvestre'}
    ];
    const tomoConocimiento = [
        {label:'Le contaron',code:'Le Contaron'},
        {label:'Noticias',code:'Noticias'},
        {label:'Redes sociales',code:'Redes Sociales'},
        {label:'Testigo Presencial',code:'Testigo Presencial'}
    ];
    const personasConvivencia = [
        {label:'No se tiene conocimiento',code:'convivenciaIndeterminado'},
        {label:'Adultos mayores (tercera edad)',code:'convivenciaAdultosMayores'},
        {label:'Niños, niñas, adolescentes',code:'convivenciaNinos'},
        {label:'Otra persona',code:'convivenciaOtro'},
        {label:'Personas con algún tipo de discapacidad (Limitación física o mental)',code:'convivenciaDiscapacidad'}
    ]
    const violenciaCometida = [
        {label:'Propietario',code:'Propietario'},
        {label:'Familiar del Propietario',code:'Familiar del Propietario'},
        {label:'Vecino',code:'Vecino'},
        {label:'Guardian',code:'Guardian'},
        {label:'Persona Mayor de Edad',code:'Persona Mayor de Edad'},
        {label:'Otro',code:'Otro'},
    ]

    const form = useFormik({
        initialValues:{
            condicionAnimal: maltratoAnimal.condicionAnimal,
            atencionVeterinaria: maltratoAnimal.atencionVeterinaria,
            relacionAnimal: maltratoAnimal.relacionAnimal,
            tipoAnimal: maltratoAnimal.tipoAnimal,
            tomoConocimiento: maltratoAnimal.tomoConocimiento,
            convivencias: maltratoAnimal.convivencias,
            violenciaCometida: maltratoAnimal.violenciaCometida,
            abusoAnimal: maltratoAnimal.abusoAnimal,
            abusoFuncionario: maltratoAnimal.abusoFuncionario
        }, validate : (data) => {
            let errors = {};
            if(data.convivencias === undefined || data?.convivencias?.length === 0){
                errors.convivencias = 'Este campo es requerido';
            }
            if(data.condicionAnimal === undefined){
                errors.condicionAnimal = 'Este campo es requerido';
            }
            if(data.atencionVeterinaria === undefined){
                errors.atencionVeterinaria = 'Este campo es requerido';
            }
            if(data.relacionAnimal === undefined){
                errors.relacionAnimal = 'Este campo es requerido';
            }
            if(data.tipoAnimal === undefined){
                errors.tipoAnimal = 'Este campo es requerido';
            }
            if(data.tomoConocimiento === undefined){
                errors.tomoConocimiento = 'Este campo es requerido';
            }
            if(data.violenciaCometida === undefined){
                errors.violenciaCometida = 'Este campo es requerido';
            }
            if(data.abusoAnimal === undefined){
                errors.abusoAnimal = 'Este campo es requerido';
            }
            if(data.abusoFuncionario === undefined){
                errors.abusoFuncionario = 'Este campo es requerido';
            }
            return errors;
        }
    })

    const isFormFieldInvalid = (name) => !!(form.touched[name] && form.errors[name]);

    const getFormErrorMessage = (name) => { return isFormFieldInvalid(name) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>; };

    const enviarDatos = (e,campo) => {
        form.setFieldValue(campo,e.value);
        maltratoAnimal[campo] = e.value;
        setMaltratoAnimal(maltratoAnimal);
        form.touched[campo] = true;
    }

    useEffect(() => {
        const allTouched = {};
        form.setValues(maltratoAnimal);
        if(validacion==true){
            Object.keys(form.initialValues).forEach((key) => {
                allTouched[key] = true;
            });
            form.setTouched(allTouched);
        }
      }, [form.values, validacion]);

    return (
        <div className="">
            <div className="formgrid grid">
                <div className="field col-12 lg:col-6">
                    <label htmlFor="condicionAnimal">¿En qué condición se encuentra el animal (ser sintiente)?</label>
                    <Dropdown
                        id="condicionAnimal"
                        value={form.values['condicionAnimal']}
                        options={condicionAnimal}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"condicionAnimal");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('condicionAnimal') })} 
                    />
                    {getFormErrorMessage('condicionAnimal')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="atencionVeterinaria">¿El animal ya fue atendido por un profesional de la medicina veterinaria?</label>
                    <br />
                    <Dropdown
                        id="atencionVeterinaria"
                        value={form.values['atencionVeterinaria']}
                        options={siNoNoSabe}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"atencionVeterinaria");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('atencionVeterinaria') })} 
                    />
                    {getFormErrorMessage('atencionVeterinaria')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="relacionAnimal">Relación con el animal</label>
                    <br />
                    <Dropdown
                        id="relacionAnimal"
                        value={form.values['relacionAnimal']}
                        options={relacionAnimal}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"relacionAnimal");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('relacionAnimal') })} 
                    />
                    {getFormErrorMessage('relacionAnimal')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="tipoAnimal">Tipo de animal (ser sintiente) víctima de maltrato</label>
                    <br />
                    <Dropdown
                        id="tipoAnimal"
                        value={form.values['tipoAnimal']}
                        options={tipoAnimal}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"tipoAnimal");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tipoAnimal') })}
                    />
                    {getFormErrorMessage('tipoAnimal')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="tomoConocimiento">¿Cómo se enteró de la situación de posible maltrato hacia el animal?</label>
                    <br />
                    <Dropdown
                        id="tomoConocimiento"
                        value={form.values['tomoConocimiento']}
                        options={tomoConocimiento}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"tomoConocimiento");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tomoConocimiento') })}
                    />
                    {getFormErrorMessage('tomoConocimiento')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="convivencia">Seleccione las personas con las cuales vive el animal</label>
                    <br />
                    <MultiSelect
                        id="convivencia"
                        panelHeaderTemplate={<></>}
                        value={form.values['convivencias']} 
                        options={personasConvivencia}
                        optionLabel='label'
                        placeholder="Seleccione una o varias"
                        onChange={(e) => enviarDatos(e,'convivencias')} 
                        maxSelectedLabels={2} 
                        selectedItemsLabel={`${form.values.convivencias ? form.values.convivencias.length : ''} Items seleccionados`}
                        showSelectAll={false}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('convivencias') })} 
                    />
                    {getFormErrorMessage('convivencias')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="violenciaCometida">El posible caso de violencia o maltrato hacia el animal (ser sintiente) fue cometido por</label>
                    <br />
                    <Dropdown
                        id="violenciaCometida"
                        value={form.values['violenciaCometida']}
                        options={violenciaCometida}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"violenciaCometida");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('violenciaCometida') })}
                    />
                    {getFormErrorMessage('violenciaCometida')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="abusoAnimal">¿Sabe si el animal (ser sintiente) fue victima de acto o abuso sexual?</label>
                    <br />
                    <Dropdown
                        id="abusoAnimal"
                        value={form.values['abusoAnimal']}
                        options={siNoNoSabe}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"abusoAnimal");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('abusoAnimal') })}
                    />
                    {getFormErrorMessage('abusoAnimal')}
                </div>
                <div className="field col-12 lg:col-6">
                    <label htmlFor="abusoFuncionario">¿Sabe si el maltrato fue cometido por un funcionario público?</label>
                    <br />
                    <Dropdown
                        id="abusoFuncionario"
                        value={form.values['abusoFuncionario']}
                        options={siNoNoSabe}
                        placeholder="Seleccione una opción"
                        onChange={(e)=>{
                            enviarDatos(e,"abusoFuncionario");
                        }}
                        className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('abusoFuncionario') })}
                    />
                    {getFormErrorMessage('abusoFuncionario')}
                </div>
            </div>
        </div>
    )
}
