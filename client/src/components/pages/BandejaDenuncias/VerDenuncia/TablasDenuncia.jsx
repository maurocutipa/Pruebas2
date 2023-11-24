import { Accordion, AccordionTab } from 'primereact/accordion';
import { VictimasDenunciantesTable } from './TablasVerDenuncia/TablasIntervinientes/VictimasDenunciantesTable';
import { DenunciadosTable } from './TablasVerDenuncia/TablasIntervinientes/DenunciadosTable';
import { TestigosTable } from './TablasVerDenuncia/TablasIntervinientes/TestigosTable';

export const TablasDenuncia = ({ intervinientes }) => {
  return (
    <>
      <Accordion multiple activeIndex={[0]}>
        <AccordionTab header='Victimas/Denunciantes'>
          <VictimasDenunciantesTable victimas={intervinientes.victimas} />
        </AccordionTab>

        <AccordionTab header='Denunciados'>
          <DenunciadosTable denunciados={intervinientes.denunciados} />
        </AccordionTab>

        <AccordionTab header='Testigos'>
          <TestigosTable testigos={intervinientes.testigos} />
        </AccordionTab>
      </Accordion>
    </>
  );
};
