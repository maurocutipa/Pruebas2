import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { Divider } from 'primereact/divider';

import { VictimasDenunciantesTable } from '../../components/pages/VerDenuncia/VictimasDenunciantesTable';
import { DenunciadosTable } from '../../components/pages/VerDenuncia/DenunciadosTable';

export const VerDenuncia = () => {

    const tiposDenuncia = [
        { label: 'Actuación de Oficio', value: 'Actuación de Oficio' },
        { label: 'Robo/Hurto', value: 'Robo/Hurto' },
        { label: 'Delitos contra las Personas', value: 'Delitos contra las Personas' },
        { label: 'Narcomenudeo', value: 'Narcomenudeo' },
        { label: 'Incidentes Viales', value: 'Incidentes Viales' },
        { label: 'Violencia de Género', value: 'Violencia de Género' },
        { label: 'Delitos Sexuales', value: 'Delitos Sexuales' },
        { label: 'Violencia Intrafamiliar', value: 'Violencia Intrafamiliar' },
        { label: 'Ciberdelitos', value: 'Ciberdelitos' },
        { label: 'Delitos Económicos y contra la Administración Pública', value: 'Delitos Económicos y contra la Administración Pública' },
        { label: 'Delitos Patrimoniales', value: 'Delitos Patrimoniales' },
        { label: 'Denuncia Ambiental', value: 'Denuncia Ambiental' },
        { label: 'Abigeato/Cuatrerismo', value: 'Abigeato/Cuatrerismo' },
        { label: 'Daños', value: 'Daños' },
        { label: 'Maltrato Animal', value: 'Maltrato Animal' },
        { label: 'Otro Tipo de Denuncia', value: 'Otro Tipo de Denuncia' },
    ];

    const opcionesCompetencia = [
        { label: 'Penal', value: 'Penal' },
        { label: 'No penal', value: 'No penal' },
        { label: 'Ambiental', value: 'Ambiental' },
        { label: 'Archivo', value: 'Archivo' }
    ];

    const opcionesFlagrancia = [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' },
    ]

    const [selectedTipos, setSelectedTipos] = useState(null);
    const [selectedCompetencias, setSelectedCompetencias] = useState(null);
    const [selectedFlagrancia, setSelectedFlagrancia] = useState(null);

    return (
        <>
            {/* Cabecera tipo denuncia */}
            <div className='p-6'>
                <section className="grid">
                    <h1 className="col pl-5">Denuncia N° 123123</h1>
                    <div className="col pt-4">
                        <label htmlFor="tiposDenuncia" className='p-2'>Tipo de Denuncia:</label>
                        <Dropdown
                            id="tiposDenuncia"
                            optionLabel="label"
                            optionValue="value"
                            value={selectedTipos}
                            options={tiposDenuncia}
                            onChange={(e) => setSelectedTipos(e.value)}
                            placeholder="Seleccione el tipo de denuncia"
                        />
                    </div>
                    <div className="col pt-4">
                        <label htmlFor="competenciaDenuncia" className='p-2'>Competencia</label>
                        <Dropdown
                            id="competenciaDenuncia"
                            optionLabel="label"
                            optionValue="value"
                            value={selectedTipos}
                            options={opcionesCompetencia}
                            onChange={(e) => setSelectedTipos(e.value)}
                            placeholder="Seleccione competencia"
                        />
                    </div>
                </section>

                {/* Datos Generales de la denuncia */}

                <section className="pl-4">
                    <h2>Datos Generales</h2>
                    <h4>N° legajo: </h4>
                    <div className="grid">
                        <h4 className='col'>Seccional: </h4>
                        <h4 className='col'>Exp.Seccional: </h4>
                        <h4 className='col'></h4>
                    </div>
                    <div className="grid">
                        <h4 className='col'>Fecha de Realizacion de la Denuncia:</h4>
                        <h4 className='col'>Hora: </h4>
                        <h4 className='col'></h4>
                    </div>
                    <div className="grid">
                        <h4 className='col'>Fecha de Ratificacion de la Denuncia: </h4>
                        <h4 className='col'>Hora: </h4>
                        <h4 className='col'></h4>
                    </div>
                    <label htmlFor="competenciaDenuncia">Flagrancia</label>
                    <Dropdown
                        id="flagrancia"
                        optionLabel='label'
                        optionValue='value'
                        value={selectedFlagrancia}
                        options={opcionesFlagrancia}
                        onChange={(e) => setSelectedFlagrancia(e.value)}
                        placeholder='SI / NO'
                    />
                </section>

                <Divider/>

                {/* Victimas / Denunciantes */}

                <section className='pl-4'>
                    <h2>Victimas / Denunciantes</h2>
                    <VictimasDenunciantesTable/>
                </section>

                <Divider/>

                {/* Denunciados */}
                
                <section className='pl-4'>
                    <h2>Denunciados</h2>
                    <DenunciadosTable/>
                </section>

            </div>
        </>
    )
}
