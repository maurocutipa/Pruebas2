import { Badge } from "primereact/badge";
import { MultiSelect } from "primereact/multiselect";
import { SelectButton } from "primereact/selectbutton";
import { useEffect, useState } from "react";

export const AnexoViolenciaIntrafamiliar = ({ datosViolenciaIntrafamiliar }) => {
    useEffect(() => {
        actualizarSeleccion(tiposViolencia, 1, setSelectedTiposViolencia);
        actualizarSeleccion(conductasAgresor, 1, setselectedConductasAgresor);
        actualizarSeleccion(victimas, 1, setSelectedVictimas);
        actualizarSeleccion(caracteristicasVictima, 1, setSelectedCaracteristicasVictima);
    }, []);

    const siNo = ['Si','No'];
    const tiposViolencia = [
        {label: 'Existió o existe violencia física susceptible de causar lesiones',code:'tipoviolencia1', valor: datosViolenciaIntrafamiliar?.tipoViolencia1},
        {label: 'Aumentó la frecuencia y/o la gravedad de los incidentes violentos en el último mes',code:'tipoviolencia2', valor: datosViolenciaIntrafamiliar?.tipoViolencia2},
        {label: 'Hay o hubieron amenazas graves o de muerte en el último mes',code:'tipoviolencia3', valor: datosViolenciaIntrafamiliar?.tipoViolencia3},
        {label: 'Hay o hubieron amenazas con objetos peligrosos o con armas de cualquier tipo',code:'tipoviolencia4', valor: datosViolenciaIntrafamiliar?.tipoViolencia4},
        {label: 'Se produjeron daños/vandalismo a objetos o a la propiedad',code:'tipoviolencia5', valor: datosViolenciaIntrafamiliar?.tipoViolencia5},
        {label: 'Se produjeron daños o amenazas de daño a las mascotas',code:'tipoviolencia6', valor: datosViolenciaIntrafamiliar?.tipoViolencia6}
    ];
    const conductasAgresor = [
        {label:'Tiene o tuvo conductas violentas con otras personas (amigos, vecinos, compañeros de trabajo, pareja, etc.)',code:'perfilagresor1', valor: datosViolenciaIntrafamiliar?.perfilAgresor1},
        {label:'Tiene un consumo abusivo de alcohol',code:'perfilagresor2', valor: datosViolenciaIntrafamiliar?.perfilAgresor2},
        {label:'Tiene un consumo abusivo de droga',code:'perfilagresor3', valor: datosViolenciaIntrafamiliar?.perfilAgresor3},
        {label:'Tiene antecedentes de enfermedad mental',code:'perfilagresor4', valor: datosViolenciaIntrafamiliar?.perfilAgresor4},
        {label:'Está o estuvo en tratamiento psicológico/psiquiatra',code:'perfilagresor5', valor: datosViolenciaIntrafamiliar?.perfilAgresor5},
        {label:'Posee antecedentes de intentos de suicidio',code:'perfilagresor6', valor: datosViolenciaIntrafamiliar?.perfilAgresor6},
    ];
    const victimas = [
        {label:'Niño / Adolescente',code:'victima1', valor: datosViolenciaIntrafamiliar?.victima1},
        {label:'Tercera edad',code:'victima2', valor: datosViolenciaIntrafamiliar?.victima2},
        {label:'Mujer',code:'victima3', valor: datosViolenciaIntrafamiliar?.victima3},
        {label:'Hombre',code:'victima4', valor: datosViolenciaIntrafamiliar?.victima4},
        {label:'Persona que pertenece a la comunidad LGTBIQ+',code:'victima5', valor: datosViolenciaIntrafamiliar?.victima5},
        {label:'Persona en condición de discapacidad',code:'victima6', valor: datosViolenciaIntrafamiliar?.victima6},
        {label:'Persona gestante',code:'victima7', valor: datosViolenciaIntrafamiliar?.victima7},
    ]
    const caracteristicasVictima = [
        {label:'Tiene alguna enfermedad mental',code:'caracteristica1', valor: datosViolenciaIntrafamiliar?.caracteristicas1},
        {label:'Presenta patologías físicas crónicas o agudas',code:'caracteristica2', valor: datosViolenciaIntrafamiliar?.caracteristicas2},
        {label:'Está o estuvo en tratamiento psicológico o psiquiátrico',code:'caracteristica3', valor: datosViolenciaIntrafamiliar?.caracteristicas3},
        {label:'Posee vulnerabilidad habitacional/falta de acceso a vivienda',code:'caracteristica4', valor: datosViolenciaIntrafamiliar?.caracteristicas4},
        {label:'Posee alguna vulnerabilidad económica/laboral',code:'caracteristica5', valor: datosViolenciaIntrafamiliar?.caracteristicas5},
        {label:'Forma parte de un grupo social/familiar de apoyo',code:'caracteristica6', valor: datosViolenciaIntrafamiliar?.caracteristicas6},
    ]

    /* Multiselects */
    const [selectedTiposViolencia, setSelectedTiposViolencia] = useState([]);
    const [selectedConductasAgresor, setselectedConductasAgresor] = useState([]);
    const [selectedVictimas, setSelectedVictimas] = useState([]);
    const [selectedCaracteristicasVictima, setSelectedCaracteristicasVictima] = useState([]);

    /*Select Buttons (situacion)*/

    const actualizarSeleccion = (opciones, valorActual, setter) => {
        const opcionesSeleccionadas = opciones.filter(opcion => opcion.valor === valorActual);
        setter(opcionesSeleccionadas);
    };

    const actualizarSeleccionSelectButton = (setter, datos) => {
        setter(datos === 1 ? 'Si' : 'No');
    };

    return (
        <>
            <h2>Anexo Violencia Intrafamiliar</h2>
            <div className="border-1 border-400 p-4">
                <div>
                    <div>
                        <h2 className='text-lightblue-mpa'>Situacion familiar</h2>
                    </div>
                    <div>
                        <h3 className='text-lightblue-mpa'>Tipo de violencia</h3>
                        <MultiSelect
                        placeholder="Seleccione una o varias"
                        options={tiposViolencia}
                        onChange={(e) => {
                          setSelectedTiposViolencia(e.value);
                        }}
                        value={selectedTiposViolencia}
                        className="w-8"
                        />
                    </div>
                    <div>
                        <h3 className='text-lightblue-mpa'>Perfil del agresor</h3>
                        <MultiSelect
                            placeholder="Seleccione una o varias"
                            options={conductasAgresor}
                            onChange={(e) => {
                            setselectedConductasAgresor(e.value);
                            }}
                            value={selectedConductasAgresor}
                            className="w-8"
                        />
                    </div>
                    <div>
                        <h3 className='text-lightblue-mpa'>Vulnerabilidad de la víctima</h3>
                        <MultiSelect
                            placeholder="Seleccione una o varias"
                            options={victimas}
                            onChange={(e) => {
                            setSelectedVictimas(e.value);
                            }}
                            value={selectedVictimas}
                            className="w-8"
                        />
                        <MultiSelect
                            placeholder="Seleccione una o varias"
                            options={caracteristicasVictima}
                            onChange={(e) => {
                            setSelectedCaracteristicasVictima(e.value);
                            }}
                            value={selectedCaracteristicasVictima}
                            className="w-8"
                        />   
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}
