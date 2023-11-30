import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
import { classNames } from "primereact/utils";
import { DatosViolenciaIntrafamiliar } from "../../../../models/DatosViolenciaIntrafamiliar";

export const ViolenciaIntrafamiliar = ({anexoViolenciaIntrafamiliar, setAnexoViolenciaIntrafamiliar, changePaso,paso}) =>{
    const siNo = ['Si','No'];
    const tiposViolencia = [
        {label: 'Existió o existe violencia física susceptible de causar lesiones',code:'tipoviolencia1'},
        {label: 'Aumentó la frecuencia y/o la gravedad de los incidentes violentos en el último mes',code:'tipoviolencia2'},
        {label: 'Hay o hubieron amenazas graves o de muerte en el último mes',code:'tipoviolencia3'},
        {label: 'Hay o hubieron amenazas con objetos peligrosos o con armas de cualquier tipo',code:'tipoviolencia4'},
        {label: 'Se produjeron daños/vandalismo a objetos o a la propiedad',code:'tipoviolencia5'},
        {label: 'Se produjeron daños o amenazas de daño a las mascotas',code:'tipoviolencia6'}
    ];
    const conductasAgresor = [
        {label:'Tiene o tuvo conductas violentas con otras personas (amigos, vecinos, compañeros de trabajo, pareja, etc.)',code:'perfilagresor1'},
        {label:'Tiene un consumo abusivo de alcohol',code:'perfilagresor2'},
        {label:'Tiene un consumo abusivo de droga',code:'perfilagresor3'},
        {label:'Tiene antecedentes de enfermedad mental',code:'perfilagresor4'},
        {label:'Está o estuvo en tratamiento psicológico/psiquiatra',code:'perfilagresor5'},
        {label:'Posee antecedentes de intentos de suicidio',code:'perfilagresor6'},
    ];
    const victimas = [
        {label:'Niño / Adolescente',code:'victima1'},
        {label:'Tercera edad',code:'victima2'},
        {label:'Mujer',code:'victima3'},
        {label:'Hombre',code:'victima4'},
        {label:'Persona que pertenece a la comunidad LGTBIQ+',code:'victima5'},
        {label:'Persona en condición de discapacidad',code:'victima6'},
        {label:'Persona gestante',code:'victima7'},
    ]
    const caracteristicasVictima = [
        {label:'Tiene alguna enfermedad mental',code:'caracteristica1'},
        {label:'Presenta patologías físicas crónicas o agudas',code:'caracteristica2'},
        {label:'Está o estuvo en tratamiento psicológico o psiquiátrico',code:'caracteristica3'},
        {label:'Posee vulnerabilidad habitacional/falta de acceso a vivienda',code:'caracteristica4'},
        {label:'Posee alguna vulnerabilidad económica/laboral',code:'caracteristica5'},
        {label:'Forma parte de un grupo social/familiar de apoyo',code:'caracteristica6'},
    ]
    const formikViolenciaFamiliar = useFormik({
        initialValues: {
            viveConAgresor: !anexoViolenciaIntrafamiliar.viveConAgresor ? 'Si' : anexoViolenciaIntrafamiliar.viveConAgresor,
            medidasRestriccion: !anexoViolenciaIntrafamiliar.medidasRestriccion ? 'Si': anexoViolenciaIntrafamiliar.medidasRestriccion,
            tituloPropiedad: !anexoViolenciaIntrafamiliar.tituloPropiedad ? 'Si' : anexoViolenciaIntrafamiliar.tituloPropiedad,
            situacionHacinamiento: !anexoViolenciaIntrafamiliar.situacionHacinamiento ? 'Si' : anexoViolenciaIntrafamiliar.situacionHacinamiento,
            tiposViolencia: anexoViolenciaIntrafamiliar.tiposViolencia,
            perfilAgresor: anexoViolenciaIntrafamiliar.perfilAgresor,
            victima: anexoViolenciaIntrafamiliar.victima,
            caracteristicasVictima: anexoViolenciaIntrafamiliar.caracteristicasVictima
        },
        validate: (data) => {
            let errors = {};
            if (!data.tiposViolencia || data.tiposViolencia.length==0) {
                errors.tiposViolencia = 'Este campo es requerido.';
            }
            if (!data.perfilAgresor || data.perfilAgresor.length==0) {
                errors.perfilAgresor = 'Este campo es requerido.';
            }
            if (!data.victima || data.victima.length==0) {
                errors.victima = 'Este campo es requerido.';
            }
            if (!data.caracteristicasVictima || data.caracteristicasVictima.length==0) {
                errors.caracteristicasVictima = 'Este campo es requerido.';
            }
            return errors;
        },
        onSubmit: (data) => {
            var datosViolenciaIntrafamiliar = new DatosViolenciaIntrafamiliar();
            Object.assign(datosViolenciaIntrafamiliar, data);
            
            formikViolenciaFamiliar.resetForm();

            setAnexoViolenciaIntrafamiliar(datosViolenciaIntrafamiliar);
            changePaso(5);
        }
    });

    const isFormFieldInvalid = (name) => !!(formikViolenciaFamiliar.touched[name] && formikViolenciaFamiliar.errors[name]);

    const getFormErrorMessage = (name) => { return isFormFieldInvalid(name) ? <small className="p-error">{formikViolenciaFamiliar.errors[name]}</small> : <small className="p-error">&nbsp;</small>; };

    return(
        <>
            <div className='mt-6 px-6'>
                <div className='mx-5 mt-3'>
                    <div>
                        <h1 className='text-lightblue-mpa text-center'>Anexo de violencia intrafamiliar</h1>
                    </div>

                    <form onSubmit={formikViolenciaFamiliar.handleSubmit}>
                        <div>
                            <h2 className='text-lightblue-mpa'>Situacion familiar</h2>
                        </div>

                        <div className="formgrid grid mb-2">
                            <div className="field col-12 lg:col-6">
                                <span className='form-label'>¿La víctima convive con el agresor?</span>
                                <SelectButton value={formikViolenciaFamiliar.values.viveConAgresor} onChange={(e) => formikViolenciaFamiliar.setFieldValue('viveConAgresor', e.target.value)} options={siNo} unselectable={false} pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}/>
                            </div>
                            <div className="field col-12 lg:col-6">
                                <span className='form-label'>¿Hubieron medidas de restricción previas o denuncias contra el agresor?</span>
                                <SelectButton value={formikViolenciaFamiliar.values.medidasRestriccion} onChange={(e) => formikViolenciaFamiliar.setFieldValue('medidasRestriccion', e.target.value)} options={siNo} unselectable={false} pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }}/>
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <div className="field col-12 lg:col-6">
                                <span className='form-label'>¿El agresor posee título de propiedad de la vivienda en la que vive la víctima?</span>
                                <SelectButton value={formikViolenciaFamiliar.values.tituloPropiedad} onChange={(e) => formikViolenciaFamiliar.setFieldValue('tituloPropiedad', e.target.value)} options={siNo} unselectable={false} pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                            </div>
                            <div className="field col-12 lg:col-6">
                                <span className='form-label'>¿La víctima vive en situación de hacinamiento?</span>
                                <SelectButton value={formikViolenciaFamiliar.values.situacionHacinamiento} onChange={(e) => formikViolenciaFamiliar.setFieldValue('situacionHacinamiento', e.target.value)} options={siNo} unselectable={false} pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                            </div>
                        </div>

                        <Divider className="my-6"/>

                        <div>
                            <h2 className='text-lightblue-mpa'>Tipo de violencia</h2>
                        </div>

                        <div className='field col-12 md:col-8 lg:col-6'>
                            <div className="font-bold mb-2">
                                (Marque lo que corresponda)
                            </div>
                            <label htmlFor="tipoViolencia">Seleccione si ha sufrido alguno o algunos de estos hechos</label>
                            <MultiSelect
                                panelHeaderTemplate={<></>}
                                value={formikViolenciaFamiliar.values.tiposViolencia} 
                                options={tiposViolencia}
                                placeholder="Seleccione una o varias"
                                onChange={(e) => formikViolenciaFamiliar.setFieldValue('tiposViolencia',e.value)} 
                                maxSelectedLabels={2} 
                                showSelectAll={false}
                                className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('tiposViolencia') })} />
                            {getFormErrorMessage('tiposViolencia')}
                        </div>

                        <Divider className="my-6"/>

                        <div>
                            <h2 className='text-lightblue-mpa'>Perfil del agresor</h2>
                        </div>

                        <div className='field col-12 md:col-8 lg:col-6'>
                            <div className="font-bold mb-2">
                                (Marque lo que corresponda)
                            </div>
                            <label htmlFor="tipoViolencia">Seleccione las conductas que posee el agresor:</label>
                            <MultiSelect
                                panelHeaderTemplate={<></>}
                                value={formikViolenciaFamiliar.values.perfilAgresor} 
                                options={conductasAgresor}
                                placeholder="Seleccione una o varias"
                                onChange={(e) => formikViolenciaFamiliar.setFieldValue('perfilAgresor',e.value)} 
                                maxSelectedLabels={2} 
                                showSelectAll={false}
                                className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('perfilAgresor') })} />
                            {getFormErrorMessage('perfilAgresor')}
                        </div>

                        <Divider className="my-6"/>

                        <div>
                            <h2 className='text-lightblue-mpa'>Vulnerabilidad de la víctima</h2>
                        </div>

                        <div className='field col-12 md:col-8 lg:col-6'>
                            <div className="font-bold mb-2">
                                (Marque lo que corresponda)
                            </div>
                            <label htmlFor="victima">La víctima es: </label>
                            <MultiSelect
                                panelHeaderTemplate={<></>}
                                showSelectAll={false}
                                value={formikViolenciaFamiliar.values.victima} 
                                options={victimas}
                                placeholder="Seleccione una o varias"
                                onChange={(e) => formikViolenciaFamiliar.setFieldValue('victima',e.value)} 
                                maxSelectedLabels={victimas.length} 
                                className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('victima') })}  />
                            {getFormErrorMessage('victima')}
                        </div>
                        
                        <div className='field col-12 md:col-8 lg:col-6'>
                            <label htmlFor="caracteristicaVictima">Seleccione, si corresponde, otras características que posea la víctima</label>
                            <MultiSelect
                                showSelectAll={false}
                                value={formikViolenciaFamiliar.values.caracteristicasVictima} 
                                options={caracteristicasVictima}
                                placeholder="Seleccione una o varias"
                                onChange={(e) => formikViolenciaFamiliar.setFieldValue('caracteristicasVictima',e.value)} 
                                maxSelectedLabels={2} 
                                panelHeaderTemplate={<></>}
                                className={classNames('w-full', { 'p-invalid': isFormFieldInvalid('caracteristicasVictima') })} 
                                />
                            {getFormErrorMessage('caracteristicasVictima')}
                        </div>

                        <Divider className="my-6"/>

                        <div className="grid">
                            <div className="col-12 sm:col-5 md:col-4 ">
                                <Button
                                className='text-lightblue-mpa w-full py-4'
                                label='Volver Atrás'
                                link
                                type="button"
                                onClick={e=>{changePaso(paso-1)}}
                                />
                            </div>
                            <div className="col-12 sm:col-7 md:col-8 ">
                                <Button type="submit" className='btn-blue-mpa py-4 w-full' icon='pi pi-chevron-right' iconPos='right' label="Siguiente Paso"/>    
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}