import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";

export const AnexoDanos = ({ datosDenunciaDanos }) => {
    useEffect(() => {
        actualizarSeleccion(tiposDanos,1,setSelectedTiposDanos);
        actualizarSeleccion(tiposConsecuencias,1,setSelectedTiposConsecuencias);
        setDetalleOtro(datosDenunciaDanos?.consecuenciaDetallesOtro);
        actualizarDropdown(setSelectedTiposPertenencia,datosDenunciaDanos?.pertenencia);
    }, [])
    
    const tiposDanos = [
        { label: 'Animal', code: 'danoAnimal', valor: datosDenunciaDanos?.danoAnimal },
        { label: 'Cosa material (auto, teléfono, entre otros)', code: 'danoCosaMaterial', valor: datosDenunciaDanos?.danoCosaMaterial },
        { label: 'Inmueble (edificio, casa, construcción, entre otras)', code: 'danoInmueble', valor: datosDenunciaDanos?.danoInmueble },
        { label: 'Sistema informático, datos o un documento digital', code: 'danoSistemaInformatico', valor: datosDenunciaDanos?.danoSistemaInformatico },
    ];

    const tiposConsecuencias = [
        { label: 'Daño o sabotaje informático (borrado de información)', code: 'consecuenciaDano', valor: datosDenunciaDanos?.consecuenciaDano },
        { label: 'Destrucción', code: 'consecuenciaDestruccion', valor: datosDenunciaDanos?.consecuenciaDestruccion },
        { label: 'Hacerla desaparecer', code: 'consecuenciaDesaparicion', valor: datosDenunciaDanos?.consecuenciaDesaparicion },
        { label: 'Inutilización', code: 'consecuenciaInutilizacion', valor: datosDenunciaDanos?.consecuenciaInutilizacion },
        { label: 'Dañarla de otro modo', code: 'consecuenciaOtro', valor: datosDenunciaDanos?.consecuenciaOtro },
    ];

    const tiposPertenencias = [
        { label: 'Agresor (parcialmente)', code: 'agresor' },
        { label: 'Bien de uso público (puentes, caminos, biblitecas, entre otros)', code: 'usoPublico' },
        { label: 'Denunciante', code: 'denunciante' },
        { label: 'Tercero', code: 'tercero' },
    ];

    /* multiselects */
    const [selectedTiposDanos, setSelectedTiposDanos] = useState([]);
    const [selectedTiposConsecuencias, setSelectedTiposConsecuencias] = useState([]);
    /*Textarea detalle*/
    const [detalleOtro, setDetalleOtro] = useState('');
    /*Dropdown*/
    const [selectedTiposPertenencia, setSelectedTiposPertenencia] = useState([]);

    const [consecuenciaOtro, setConsecuenciaOtro] = useState(0);

    const actualizarSeleccion = (opciones, valorActual, setter) => {
        const opcionesSeleccionadas = opciones.filter(opcion => {
            opcion.code == 'consecuenciaOtro' && opcion.valor == 1 ? setConsecuenciaOtro(1) : setConsecuenciaOtro(0);
            return opcion.valor === valorActual
        });
        setter(opcionesSeleccionadas);
    };

    const actualizarDropdown = (setter, datos) => {
        setter(datos);
    };

    const actualizarConsecuenciaOtro = (array) => {
        let band = false;
        array.forEach(e => {
            if(e?.code == 'consecuenciaOtro') band = true;
        });
        band == true ? setConsecuenciaOtro(1) : setConsecuenciaOtro(0);
    }
    return (
        <>
            <h2>Anexo Denuncia Daños</h2>
            <div className="border-1 border-400 p-4">
                <div className="formgrid grid">
                    <div className="field col-12 lg:col-6">
                        <label htmlFor="tipoDano">¿Qué se dañó?</label>
                        <MultiSelect
                            id='tipoDano'
                            name='tipoDano'
                            options={tiposDanos}
                            value={selectedTiposDanos}
                            onChange={(e) => {
                                setSelectedTiposDanos(e.value);
                            }}
                            placeholder="Seleccionar"
                            className='w-full'
                            showSelectAll={false}
                            panelHeaderTemplate={<></>}
                        />
                    </div>
                    <div className="field col-12 lg:col-6">
                        <label htmlFor="tipoConsecuencia">¿Qué consecuencias provocó sobre la cosa dañada?</label>
                        <MultiSelect
                            id='tipoConsecuencia'
                            name='tipoConsecuencia'
                            options={tiposConsecuencias}
                            value={selectedTiposConsecuencias}
                            onChange={(e) => {
                                actualizarConsecuenciaOtro(e.value);
                                setSelectedTiposConsecuencias(e.value);
                            }}
                            placeholder="Seleccionar"
                            className='w-full'
                            showSelectAll={false}
                            panelHeaderTemplate={<></>}
                        />
                    </div>
                    {
                        consecuenciaOtro == 1 &&
                        <div className="field col-12 lg:col-6">
                            <label htmlFor="consecuenciaDetallesOtro">Descripción del daño</label>
                            <InputTextarea
                                rows={4}
                                className='w-full'
                                value={detalleOtro}
                                onChange={(e) => {
                                    setDetalleOtro(e.target.value);
                                }}
                                placeholder="Escribe aquí"
                            />
                        </div>
                    }
                    <div className="field col-12 lg:col-6">
                        <label htmlFor="descripcionDano">¿A quién pertenece la cosa?</label>
                        <Dropdown
                            id="pertenencia"
                            value={selectedTiposPertenencia}
                            optionValue='code'
                            options={tiposPertenencias}
                            placeholder="Seleccionar"
                            onChange={(e) => {
                                setSelectedTiposPertenencia(e.value);
                            }}
                            className='w-full'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
