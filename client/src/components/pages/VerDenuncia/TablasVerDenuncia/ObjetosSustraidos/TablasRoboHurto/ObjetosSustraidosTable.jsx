import { TabView, TabPanel } from 'primereact/tabview';
import { AutomovilesTable } from './AutomovilesTable';
import { TelefonosTable } from './TelefonosTable';
import { BicicletasTable } from './BicicletasTable';
import { AutopartesTable } from './AutopartesTable';
import { DocumentacionTable } from './DocumentacionTable';
import { TarjetasTable } from './TarjetasTable';
import { ChequesTable } from './ChequesTable';
import { OtrosTable } from './OtrosTable';

export const ObjetosSustraidosTable = ({ datosDenunciaPropiedad }) => {
  return (
    <>
      <TabView>
        <TabPanel header="Teléfonos"> <TelefonosTable telefonos={datosDenunciaPropiedad.telefonos} /> </TabPanel>
        <TabPanel header="Automoviles"> <AutomovilesTable automoviles={datosDenunciaPropiedad.automoviles} /> </TabPanel>
        <TabPanel header="Bicicletas"> <BicicletasTable bicicletas={datosDenunciaPropiedad.bicicletas} /> </TabPanel>
        <TabPanel header="Autopartes"> <AutopartesTable autopartes={datosDenunciaPropiedad.autopartes} /> </TabPanel>
        <TabPanel header="Documentacion"> <DocumentacionTable documentacion={datosDenunciaPropiedad.documentacion} /> </TabPanel>
        <TabPanel header="Tarjetas de credito / debito"> <TarjetasTable tarjetas={datosDenunciaPropiedad.tarjetas} /> </TabPanel>
        <TabPanel header="Cheques"> <ChequesTable cheques={datosDenunciaPropiedad.cheques} /> </TabPanel>
        <TabPanel header="Otros"> <OtrosTable otros={datosDenunciaPropiedad.otro} /> </TabPanel>
      </TabView>
    </>
  )
}
