import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import React, { useState, useEffect, memo, useContext } from 'react';


import { TelefonoForm } from './FormulariosEspeciales/RoboHurto/TelefonoForm';
import { TelefonosTable } from './TablasEspeciales/TelefonosTable';

import { AutomovilForm } from './FormulariosEspeciales/RoboHurto/AutomovilForm';
import { AutomovilesTable } from './TablasEspeciales/AutomovilesTable';
import { BicicletasForm } from './FormulariosEspeciales/RoboHurto/BicicletasForm';
import { AutopartesForm } from './FormulariosEspeciales/RoboHurto/AutopartesForm';
import { DocumentacionForm } from './FormulariosEspeciales/RoboHurto/DocumentacionForm';
import { TarjetasForm } from './FormulariosEspeciales/RoboHurto/TarjetasForm';
import { ChequesForm } from './FormulariosEspeciales/RoboHurto/ChequesForm';
import { OtrosForm } from './FormulariosEspeciales/RoboHurto/OtrosForm';
import { BicicletasTable } from './TablasEspeciales/BicicletasTable';
import { AutopartesTable } from './TablasEspeciales/AutopartesTable';
import { DocumentacionTable } from './TablasEspeciales/DocumentacionTable';
import { ChequesTable } from './TablasEspeciales/ChequesTable';
import { TarjetasTable } from './TablasEspeciales/TarjetasTable';
import { OtrosTable } from './TablasEspeciales/OtrosTable';

import { useRoboHurtoContext, useDenunciaContext } from '../../../../pages/Denuncia/Denuncia.jsx';
import { getBicicletasTipos } from '../../../../api/objetosPropiedad.api.js';

const BicicletasContext = React.createContext([], []);

export const RoboHurto = memo(({ }) => {
    const [tiposBicicleta, setTiposBicicleta] = useState('')

    const getTiposBicicletas = async () => {
        const data = await getBicicletasTipos();
        setTiposBicicleta(data.data.data);
        console.log(data)
    }

    useEffect(() => {
        getTiposBicicletas();
    }, [])
    //Control de dialogs para cada formulario de cada objeto.
    const [telefonoVisible, setTelefonoVisible] = useState(false);
    const [automovilVisible, setAutomovilVisible] = useState(false);
    const [bicicletaVisible, setBicicletaVisible] = useState(false);
    const [autoparteVisible, setAutoparteVisible] = useState(false);
    const [documentacionVisible, setDocumentacionVisible] = useState(false);
    const [tarjetaVisible, setTarjetaVisible] = useState(false);
    const [chequesVisible, setChequesVisible] = useState(false);
    const [otrosVisible, setOtrosVisible] = useState(false);

    //Context
    const { telefonos, automoviles, bicicletas, autopartes, documentos, cheques, tarjetas, otros, selectedOptionsRoboHurto, setTelefonos, setAutomoviles, setBicicletas, setAutopartes, setDocumentos, setCheques, setTarjetas, setOtros, setSelectedOptionsRoboHurto } = useRoboHurtoContext();
    const { tipoDenuncia } = useDenunciaContext();
    // Operaciones con telefonos
    const agregarTelefono = (telefono) => {
        setTelefonos([...telefonos, telefono]);
    };
    const eliminarTelefono = (telefono) => {
        const telefonosActualizados = telefonos.filter((t) => t !== telefono);
        setTelefonos(telefonosActualizados);
    };

    //Operaciones con Automoviles
    const agregarAutomovil = (automovil) => {
        setAutomoviles([...automoviles, automovil]);
    };
    const eliminarAutomovil = (automovil) => {
        const automovilesActualizados = automoviles.filter((t) => t !== automovil);
        setAutomoviles(automovilesActualizados);
    };

    //operaciones con Bicicletas
    const agregarBicicleta = (bicicleta) => {
        setBicicletas([...bicicletas, bicicleta]);
    };
    const eliminarBicicleta = (bicicleta) => {
        const bicicletasActualizadas = bicicletas.filter((t) => t !== bicicleta);
        setBicicletas(bicicletasActualizadas);
    };

    //operaciones con Autopartes
    const agregarAutoparte = (autoparte) => {
        setAutopartes([...autopartes, autoparte]);
    };
    const eliminarAutoparte = (autoparte) => {
        const autopartesActualizadas = autopartes.filter((t) => t !== autoparte);
        setAutopartes(autopartesActualizadas);
    };

    //operaciones con Documentacion
    const agregarDocumento = (documento) => {
        setDocumentos([...documentos, documento]);
    };
    const eliminarDocumento = (documento) => {
        const documentosActualizados = documentos.filter((t) => t !== documento);
        setDocumentos(documentosActualizados);
    };

    //operaciones con Tarjetas
    const agregarTarjeta = (tarjeta) => {
        setTarjetas([...tarjetas, tarjeta]);
    };
    const eliminarTarjeta = (tarjeta) => {
        const tarjetasActualizados = tarjetas.filter((t) => t !== tarjeta);
        setTarjetas(tarjetasActualizados);
    };

    //operaciones con Cheques
    const agregarCheque = (cheque) => {
        setCheques([...cheques, cheque]);
    };
    const eliminarCheque = (cheque) => {
        const chequesActualizados = cheques.filter((t) => t !== cheque);
        setCheques(chequesActualizados);
    };

    //operaciones con Otros
    const agregarOtro = (otro) => {
        setOtros([...otros, otro]);
    };
    const eliminarOtro = (otro) => {
        const otrosActualizados = otros.filter((t) => t !== otro);
        setOtros(otrosActualizados);
    };

    //Select para circunstancias del hecho. 
    const options = [
        { label: 'Me dañaron cosas', code: 'danoCosas' },
        { label: 'Utilizaron armas', code: 'armas' },
        { label: 'Hubo violencia física', code: 'violenciaFisica' },
        { label: 'Amenaza', code: 'amenaza' },
        { label: 'Arrebato', code: 'arrebato' },
        { label: 'Otra', code: 'otra' },
    ];

    return (
        <BicicletasContext.Provider value={{ tiposBicicleta }}>
            <>
                <MultiSelect
                    value={selectedOptionsRoboHurto}
                    onChange={(e) => setSelectedOptionsRoboHurto(e.value)}
                    options={options}
                    optionLabel="label"
                    placeholder="Circunstancias del Hecho"
                    className="field w-full md:w-20rem"
                // onSelectAll={console.log(selectedOptionsRoboHurto)}
                />

                <div>
                    <h3 className='text-lightblue-mpa text-4xl'>Objetos sustraídos</h3>
                </div>

                <h5 className='text-md'>Haga click sobre los botones para agregar objetos.</h5>

                <div className="text-center">
                    <div className="grid mb-4">
                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Telefonos" icon="pi pi-plus" onClick={() => setTelefonoVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Teléfono" visible={telefonoVisible} style={{ width: '50vw' }} onHide={() => setTelefonoVisible(false)}>
                                <TelefonoForm agregarTelefono={agregarTelefono} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Automoviles" icon="pi pi-plus" onClick={() => setAutomovilVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Automovil" visible={automovilVisible} style={{ width: '50vw' }} onHide={() => setAutomovilVisible(false)}>
                                <AutomovilForm agregarAutomovil={agregarAutomovil} tipoDenuncia={tipoDenuncia} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Bicicletas" icon="pi pi-plus" onClick={() => setBicicletaVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Bicicleta" visible={bicicletaVisible} style={{ width: '50vw' }} onHide={() => setBicicletaVisible(false)}>
                                <BicicletasForm agregarBicicleta={agregarBicicleta} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Autopartes" icon="pi pi-plus" onClick={() => setAutoparteVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Autoparte" visible={autoparteVisible} style={{ width: '50vw' }} onHide={() => setAutoparteVisible(false)}>
                                <AutopartesForm agregarAutoparte={agregarAutoparte} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Documentacion" icon="pi pi-plus" onClick={() => setDocumentacionVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Documentación" visible={documentacionVisible} style={{ width: '50vw' }} onHide={() => setDocumentacionVisible(false)}>
                                <DocumentacionForm agregarDocumento={agregarDocumento} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Tarjetas" icon="pi pi-plus" onClick={() => setTarjetaVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Tarjeta Credito/Debito" visible={tarjetaVisible} style={{ width: '50vw' }} onHide={() => setTarjetaVisible(false)}>
                                <TarjetasForm agregarTarjeta={agregarTarjeta} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Cheques" icon="pi pi-plus" onClick={() => setChequesVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Cheques" visible={chequesVisible} style={{ width: '50vw' }} onHide={() => setChequesVisible(false)}>
                                <ChequesForm agregarCheque={agregarCheque} />
                            </Dialog>
                        </div>

                        <div className='col-12 sm:col-6 md:col-4 lg:col-3'>
                            <Button type="button" label="Otros" icon="pi pi-plus" onClick={() => setOtrosVisible(true)} className="btn-blue-mpa w-full" />
                            <Dialog draggable={false} header="Agregar Otros" visible={otrosVisible} style={{ width: '50vw' }} onHide={() => setOtrosVisible(false)}>
                                <OtrosForm agregarOtro={agregarOtro} />
                            </Dialog>
                        </div>
                    </div>

                    {
                        (telefonos.length==0&&automoviles.length==0&&bicicletas.length==0&&autopartes.length==0&&documentos.length==0&&tarjetas==0&&cheques.length==0&&otros.length==0) && (
                            <small className="p-error">Debe ingresar al menos un objeto.</small>
                        )
                    }

                    {
                        telefonos.length !== 0 && (
                            <div className='mt-6'>
                                <h3>Lista de Telefonos</h3>
                                <TelefonosTable telefonos={telefonos} eliminarTelefono={eliminarTelefono} />
                            </div>
                        )
                    }

                    {
                        automoviles.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Vehiculos</h3>
                                <AutomovilesTable automoviles={automoviles} eliminarAutomovil={eliminarAutomovil} tipoDenuncia={tipoDenuncia} />
                            </div>
                        )
                    }

                    {
                        bicicletas.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Bicicletas</h3>
                                <BicicletasTable bicicletas={bicicletas} eliminarBicicleta={eliminarBicicleta} />
                            </div>
                        )
                    }

                    {
                        autopartes.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Autopartes</h3>
                                <AutopartesTable autopartes={autopartes} eliminarAutoparte={eliminarAutoparte} />
                            </div>
                        )
                    }
                    {
                        documentos.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Documentos</h3>
                                <DocumentacionTable documentos={documentos} eliminarDocumento={eliminarDocumento} />
                            </div>
                        )
                    }
                    {
                        tarjetas.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Tarjetas</h3>
                                <TarjetasTable tarjetas={tarjetas} eliminarTarjeta={eliminarTarjeta} />
                            </div>
                        )
                    }
                    {
                        cheques.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Cheques</h3>
                                <ChequesTable cheques={cheques} eliminarCheque={eliminarCheque} />
                            </div>
                        )
                    }
                    {
                        otros.length !== 0 && (
                            <div className="mt-6">
                                <h3>Lista de Otros </h3>
                                <OtrosTable otros={otros} eliminarOtro={eliminarOtro} />
                            </div>
                        )
                    }

                </div>
            </>
        </BicicletasContext.Provider>
    );
})

export function useBicicletasContext() {
    return useContext(BicicletasContext);
}
