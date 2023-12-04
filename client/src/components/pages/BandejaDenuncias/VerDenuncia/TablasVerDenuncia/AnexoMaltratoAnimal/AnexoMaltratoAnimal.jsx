import { MultiSelect } from "primereact/multiselect"
import { Dropdown } from "primereact/dropdown"
import { useState, useEffect } from "react";

export const AnexoMaltratoAnimal = ({ datosDenunciaMaltratoAnimal }) => {
    const [selectedCondicionAnimal, setSelectedCondicionAnimal] = useState([]);
    const [selectedAtencionVeterinaria, setSelectedAtencionVeretinaria] = useState([]); 
    const [selectedRelacionAnimal, setSelectedRelacionAnimal] = useState([]);
    const [selectedTipoAnimal, setSelectedTipoAnimal] = useState([]); 
    const [selectedTomoConocimiento, setSelectedTomoConocimiento] = useState([]); 
    const [selectedPersonasConvivencia, setSelectedPersonasConvivencia] = useState([]); 
    const [selectedViolenciaCometida, setSelectedviolenciaCometida] = useState([]); 
    const [selectedAbusoFuncionario, setSelectedAbusoFuncionario] = useState([]); 
    const [selectedAbusoAnimal, setSelectedAbusoAnimal] = useState([]); 

    useEffect(() => {
        actualizarDropdown(setSelectedCondicionAnimal,datosDenunciaMaltratoAnimal.condicionAnimal);
        actualizarDropdown(setSelectedAtencionVeretinaria,datosDenunciaMaltratoAnimal.atencionVeterinaria);
        actualizarDropdown(setSelectedRelacionAnimal,datosDenunciaMaltratoAnimal.relacionAnimal);
        actualizarDropdown(setSelectedTipoAnimal,datosDenunciaMaltratoAnimal.tipoAnimal);
        actualizarDropdown(setSelectedTomoConocimiento,datosDenunciaMaltratoAnimal.tomoConocimiento);
        actualizarDropdown(setSelectedviolenciaCometida,datosDenunciaMaltratoAnimal.violenciaCometida);
        actualizarDropdown(setSelectedAbusoAnimal, datosDenunciaMaltratoAnimal.abusoAnimal); 
        actualizarDropdown(setSelectedAbusoFuncionario, datosDenunciaMaltratoAnimal.abusoFuncionario);
        actualizarMultiselect(personasConvivencia, 1, setSelectedPersonasConvivencia) 
    }, []);

    const actualizarDropdown = (setter, datos) => {
        setter(datos);
    };

    const actualizarMultiselect = (opciones, valorActual, setter) => {
        const opcionesSeleccionadas = opciones.filter(opcion => opcion.valor === valorActual);
        setter(opcionesSeleccionadas);
    };
    
    const condicionAnimal = [
        { label: 'Murió', code: 'Murio' },
        { label: 'Vive', code: 'Vive' }
    ];
    const siNoNoSabe = [
        { label: 'Si', code: 'Si' },
        { label: 'No', code: 'No' },
        { label: 'No sabe', code: 'No Sabe' }
    ];
    const relacionAnimal = [
        { label: 'Propietario', code: 'Propietario' },
        { label: 'Guardían', code: 'Guardian' },
        { label: 'Medico Veterinario', code: 'Medico Veterinario' },
        { label: 'Vecino', code: 'Vecino' },
        { label: 'Otro', code: 'Otro' }
    ];
    const tipoAnimal = [
        { label: 'Domestico', code: 'Domestico' },
        { label: 'Exótico', code: 'Exotico' },
        { label: 'Silvestre', code: 'Silvestre' }
    ];
    const tomoConocimiento = [
        { label: 'Le contaron', code: 'Le Contaron' },
        { label: 'Noticias', code: 'Noticias' },
        { label: 'Redes sociales', code: 'Redes Sociales' },
        { label: 'Testigo Presencial', code: 'Testigo Presencial' }
    ];
    const personasConvivencia = [
        { label: 'No se tiene conocimiento', code: 'convivenciaIndeterminado', valor: datosDenunciaMaltratoAnimal.convivenciaIndeterminado },
        { label: 'Adultos mayores (tercera edad)', code: 'convivenciaAdultosMayores', valor: datosDenunciaMaltratoAnimal.convivenciaAdultosMayores },
        { label: 'Niños, niñas, adolescentes', code: 'convivenciaNinos', valor: datosDenunciaMaltratoAnimal.convivenciaNinos },
        { label: 'Otra persona', code: 'convivenciaOtro', valor: datosDenunciaMaltratoAnimal.convivenciaOtro },
        { label: 'Personas con algún tipo de discapacidad (Limitación física o mental)', code: 'convivenciaDiscapacidad', valor: datosDenunciaMaltratoAnimal.convivenciaDiscapacidad }
    ];
    const violenciaCometida = [
        { label: 'Propietario', code: 'Propietario' },
        { label: 'Familiar del Propietario', code: 'Familiar del Propietario' },
        { label: 'Vecino', code: 'Vecino' },
        { label: 'Guardian', code: 'Guardian' },
        { label: 'Persona Mayor de Edad', code: 'Persona Mayor de Edad' },
        { label: 'Otro', code: 'Otro' },
    ];

    return (
        <>
            <h2>Anexo Maltrato Animal</h2>
            <div className="border-1 border-400 p-4">
                <p>¿En qué condición se encuentra el animal (ser sintiente)?</p>
                <Dropdown
                    id="condicionAnimal"
                    value={selectedCondicionAnimal}
                    options={condicionAnimal}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedCondicionAnimal(e.value);
                    }}
                    className="w-full"
                />
                <p>¿El animal ya fue atendido por un profesional de la medicina veterinaria?</p>
                <Dropdown
                    id="atencionVeterinaria"
                    value={selectedAtencionVeterinaria}
                    options={siNoNoSabe}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedAtencionVeretinaria(e.value);
                    }}
                    className="w-full"
                />
                <p>Relacion con el animal</p>
                <Dropdown
                    id="relacionAnimal"
                    value={selectedRelacionAnimal}
                    options={relacionAnimal}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedRelacionAnimal(e.value);
                    }}
                    className="w-full"
                />
                <p>Tipo de Animal (ser sintiente) victima de maltrato</p><Dropdown
                    id="tipoAnimal"
                    value={selectedTipoAnimal}
                    options={tipoAnimal}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedTipoAnimal(e.value);
                    }}
                    className="w-full"
                />
                <p>¿Cómo se enteró de la situación de posible maltrato hacia el animal?</p>
                <Dropdown
                    id="tomoConocimiento"
                    value={selectedTomoConocimiento}
                    options={tomoConocimiento}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedTomoConocimiento(e.value);
                    }}
                    className="w-full"
                />
                <p>Seleccione las personas con las cuales vive el animal</p>
                <MultiSelect
                    placeholder="Seleccione una o varias"
                    options={personasConvivencia}
                    onChange={(e) => {
                        setSelectedPersonasConvivencia(e.value);
                    }}
                    value={selectedPersonasConvivencia}
                    className="w-full mt-2"
                />
                <p>El posible caso de violencia o maltrato hacia el animal (ser sintiente) fue cometido por</p>
                <Dropdown
                    id="violenciaCometida"
                    value={selectedViolenciaCometida}
                    options={violenciaCometida}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedviolenciaCometida(e.value);
                    }}
                    className="w-full"
                />
                <p>¿Sabe si el animal (ser sintiente) fue victima de acto o abuso sexual?</p>
                <Dropdown
                    id="abusoAnimal"
                    value={selectedAbusoAnimal}
                    options={siNoNoSabe}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        setSelectedAbusoAnimal(e.value);
                    }}
                    className="w-full"
                />
                <p>¿Sabe si el maltrato fue cometido por un funcionario público?</p>
                <Dropdown
                    id="abusoFuncionario"
                    value={selectedAbusoFuncionario}
                    options={siNoNoSabe}
                    optionValue='code'
                    placeholder="Seleccione"
                    onChange={(e) => {
                        selectedAbusoFuncionario(e.value);
                    }}
                    className="w-full"
                />
            </div>
        </>
    )
}
