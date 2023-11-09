import { Accordion, AccordionTab } from 'primereact/accordion';
import { VictimasDenunciantesTable } from './TablasVerDenuncia/TablasIntervinientes/VictimasDenunciantesTable';
import { DenunciadosTable } from './TablasVerDenuncia/TablasIntervinientes/DenunciadosTable';
import { TestigosTable } from './TablasVerDenuncia/TablasIntervinientes/TestigosTable';

export const TablasDenuncia = () => {
    return (
        <>
            <Accordion multiple activeIndex={[0]}>
                <AccordionTab header="Victimas/Denunciantes">
                    <div>
                        <h3>Victimas / Denunciantes</h3>
                        <VictimasDenunciantesTable />
                    </div>
                </AccordionTab>

                <AccordionTab header="Denunciados">
                    <div>
                        <h3>Denunciados</h3>
                        <DenunciadosTable />
                    </div>
                </AccordionTab>

                <AccordionTab header="Testigos">
                    <div>
                        <h3>Testigos</h3>
                        <TestigosTable />
                    </div>
                </AccordionTab>
            </Accordion>
        </>
    )
}
