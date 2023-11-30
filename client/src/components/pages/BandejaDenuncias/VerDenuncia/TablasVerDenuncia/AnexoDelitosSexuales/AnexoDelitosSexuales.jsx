import { SelectButton } from "primereact/selectbutton";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";

export const AnexoDelitosSexuales = ({ datosDelitoSexual }) => {
    const detallesDelitoSexual = datosDelitoSexual.detallesDelitoSexual;
    const datosVictima = datosDelitoSexual.datosVictima;

    useEffect(() => {
        actualizarSeleccionSelectButton(setSelectedDependencia, datosVictima?.dependeIngresos);
        actualizarSeleccionSelectButton(setSelectedHijosMenores, datosVictima?.hijosMenores);
        actualizarSeleccionSelectButton(setSelectedRiesgoVida, datosVictima?.riesgoVida);
        actualizarSeleccionSelectButton(setSelectedDenunciasPrevias, detallesDelitoSexual?.denunciasPrevias);
        actualizarSeleccionSelectButton(setSelectedSolicitudImagenes, detallesDelitoSexual?.solicitudImagenes);
        actualizarSeleccionSelectButton(setSelectedMediosElectronicos, detallesDelitoSexual?.mediosElectronicos);
        actualizarSeleccionSelectButton(setSelectedMenorInvolucrado, detallesDelitoSexual?.menorInvolucrado);
        actualizarSeleccionMultiselect(hechosSexual, 1, setSelectedHechoSexual);
        actualizarSeleccionMultiselect(accionesAutor, 1, setSelectedAccionesAutor);
    }, [datosVictima])

    //======================== Select Buttons ==========================

    //Datos de victima
    const [selectedDependencia, setSelectedDependencia] = useState('');
    const [selectedHijosMenores, setSelectedHijosMenores] = useState('');
    const [selectedRiesgoVida, setSelectedRiesgoVida] = useState('');

    //Datos del hecho
    const [selectedDenunciasPrevias, setSelectedDenunciasPrevias] = useState([]); 
    const [selectedSolicitudImagenes, setSelectedSolicitudImagenes] = useState([]);
    const [selectedMediosElectronicos, setSelectedMediosElectronicos] = useState([]);  
    const [selectedMenorInvolucrado, setSelectedMenorInvolucrado] = useState([]); 

    const options = ['Si', 'No'];

    const actualizarSeleccionSelectButton = (setter, datos) => {
        setter(datos === 1 ? 'Si' : 'No');
    };

    //======================== Multiselects ============================

    const [selectedHechoSexual, setSelectedHechoSexual] = useState([]); 
    const [selectedAccionesAutor, setSelectedAccionesAutor] = useState([]); 

    const hechosSexual = [
        {label:'Acercamiento del agresor con contenido sexual (sin contacto físico) contra o sin su voluntad',code:'hechoAcercamiento', valor: detallesDelitoSexual?.hechoAcercamiento},
        {label:'Contacto tecnológico por parte de un mayor de edad a un menor de edad con el propósito de cometer un delito contra su integridad sexual',code:'hechoContactoTecnologico', valor: detallesDelitoSexual?.hechoContactoTecnologico},
        {label:'Beso en la boca',code:'hechoBeso', valor: detallesDelitoSexual?.hechoBeso},
        {label:'Tocamiento de partes íntimas',code:'hechoTocamiento', valor: detallesDelitoSexual?.hechoTocamiento},
        {label:'Introducción de un objeto o una parte del cuerpo en un orificio de la víctima',code:'hechoIntroduccion', valor: detallesDelitoSexual?.hechoIntroduccion},
    ];
    const accionesAutor = [
        {label:'Emplear violencia o proferir amenazas',code:'accionViolencia', valor: detallesDelitoSexual?.accionViolencia},
        {label:'Aprovecharse de la inexperiencia de la victima',code:'accionAprovecharse', valor: detallesDelitoSexual?.accionAprovecharse},
        {label:'Utilizar drogas',code:'accionDrogas', valor: detallesDelitoSexual?.accionDrogas},
        {label:'Aprovechar una especial situación de vulnerabilidad o debilidad de la víctima (enfermedad, carencia de razón o estado de inconsciencia)',code:'accionVulnerabilidad', valor: detallesDelitoSexual?.accionVulnerabilidad},
        {label:'Utilizar un arma',code:'accionArma', valor: detallesDelitoSexual?.accionArma}
    ];

    const actualizarSeleccionMultiselect = (opciones, valorActual, setter) => {
        const opcionesSeleccionadas = opciones.filter(opcion => opcion.valor === valorActual);
        setter(opcionesSeleccionadas);
    };

    return (
        <>
            <div className="border-1 border-400 p-4">
                <h3>Detalles de la victima: </h3>
                <p>¿Depende de los ingresos que aporta el autor del hecho para subsistir?</p>
                <SelectButton value={selectedDependencia} onChange={(e) => setSelectedDependencia(e.value)} options={options} />
                <p>¿Tiene hijos menores de edad?</p>
                <SelectButton value={selectedHijosMenores} onChange={(e) => setSelectedHijosMenores(e.value)} options={options} />
                <p>¿Considera que se encuentra en riesgo de vida?</p>
                <SelectButton value={selectedRiesgoVida} onChange={(e) => selectedRiesgoVida(e.value)} options={options} />
                <Divider />
                <h3>Detalles del delito: </h3>
                <p>¿En que consistió el hecho?</p>
                <MultiSelect
                    placeholder="Seleccione datos del hecho"
                    options={hechosSexual}
                    onChange={(e) => {
                        setSelectedHechoSexual(e.value);
                    }}
                    value={selectedHechoSexual}
                    className="w-8"
                />
                <p>¿Cuales de las siguientes acciones realizó el autor?</p>
                <MultiSelect
                    placeholder="Seleccione acciones del autor"
                    options={accionesAutor}
                    onChange={(e) => {
                        setSelectedAccionesAutor(e.value);
                    }}
                    value={selectedAccionesAutor}
                    className="w-8"
                />
                <p>¿Ha realizado previamente una denuncia en una dependencia o Ministerio Público de la Acusación?</p>
                <SelectButton value={selectedDenunciasPrevias} onChange={(e) => setSelectedDenunciasPrevias(e.value)} options={options} />
                <p>¿El autor solicito imagenes con contenido sexual?</p>
                <SelectButton value={selectedSolicitudImagenes} onChange={(e) => setSelectedSolicitudImagenes(e.value)} options={options} />
                <p>¿El/los autor/autores enviaron a la victima imágenes con contenido sexual por medios electrónicos?</p> 
                <SelectButton value={selectedMediosElectronicos} onChange={(e) => setSelectedMediosElectronicos(e.value)} options={options} />
                <p>¿Se vió involucrado algún menor entre las victimas?</p>
                <SelectButton value={selectedMenorInvolucrado} onChange={(e) => setSelectedMenorInvolucrado(e.value)} options={options} />
            </div>
        </>
    )
}
