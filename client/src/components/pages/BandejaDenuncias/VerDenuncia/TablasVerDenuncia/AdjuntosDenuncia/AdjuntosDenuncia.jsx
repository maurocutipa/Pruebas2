import { Dialog } from 'primereact/dialog';
import { PdfViewer } from '@/components/common/PdfViewer';
import { GET_ADJUNTOS } from '@/constants';
import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import { Button } from 'primereact/button';

export const AdjuntosDenuncia = ({ adjuntosDenuncia, detalleAdjunto }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <h3>Adjuntos / Evidencias</h3>
            <h4>Descripción: </h4>
            <p>{detalleAdjunto}</p>
            <h4>Adjuntos: </h4>
            <ul>
                <Button label="Ver Documentos" icon="pi pi-file" onClick={() => setVisible(true)} className='btn-blue-mpa' />
                <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <TabView>
                        <TabPanel header="Documentos">
                            {Object.values(adjuntosDenuncia).map((elemento, indice) => {
                                const extension = elemento.nombreArchivo.split('.').pop().toLowerCase();
                                if (['pdf'].includes(extension)) {
                                    return (
                                        <PdfViewer key={indice} url={`${GET_ADJUNTOS}/${elemento.nombreArchivo}`} />
                                    );
                                }
                                return null;
                            })}
                            {!Object.values(adjuntosDenuncia).some(elemento => ['pdf'].includes(elemento.nombreArchivo.split('.').pop().toLowerCase())) && (
                                <h2>No se encontraron documentos PDF</h2>
                            )}
                        </TabPanel>
                        <TabPanel header="Multimedia">
                            {Object.values(adjuntosDenuncia).map((elemento, indice) => {
                                const extension = elemento.nombreArchivo.split('.').pop().toLowerCase();
                                const tipos = ['mp4', 'mov', 'avi', 'jpg', 'png', 'jpeg'];
                                if (tipos.includes(extension)) {
                                    return (
                                        <div key={indice}>
                                            <iframe src={`${GET_ADJUNTOS}/${elemento.nombreArchivo}`} frameBorder="0"></iframe>
                                            <p>Archivo Multimedia: {elemento.nombreArchivo}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            {!Object.values(adjuntosDenuncia).some(elemento => ['mp4', 'mov', 'avi', 'jpg', 'png', 'jpeg'].includes(elemento.nombreArchivo.split('.').pop().toLowerCase())) && (
                                <h2>No se encontraron archivos multimedia</h2>
                            )}
                        </TabPanel>
                        <TabPanel header="Otros">
                            {Object.values(adjuntosDenuncia).map((elemento, indice) => {
                                const extension = elemento.nombreArchivo.split('.').pop().toLowerCase();
                                const tipos = ['mp4', 'mov', 'avi', 'jpg', 'png', 'jpeg', 'pdf'];
                                if (adjuntosDenuncia.length !== 0 && !tipos.includes(extension)) {
                                    return (
                                        <div key={indice}>
                                            <iframe src={`${GET_ADJUNTOS}/${elemento.nombreArchivo}`} frameBorder="0"></iframe>
                                            <p>Archivo: {elemento.nombreArchivo}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            {(
                                Object.values(adjuntosDenuncia).some(elemento =>
                                    ['mp4', 'mov', 'avi', 'jpg', 'png', 'jpeg', 'pdf'].includes(elemento.nombreArchivo.split('.').pop().toLowerCase())
                                ) ||
                                adjuntosDenuncia.length === undefined
                            ) && (
                                    <h2>No se encontraron otros tipos de archivos</h2>
                                )}
                        </TabPanel>
                    </TabView>

                </Dialog>
            </ul>
        </>
    )
}
