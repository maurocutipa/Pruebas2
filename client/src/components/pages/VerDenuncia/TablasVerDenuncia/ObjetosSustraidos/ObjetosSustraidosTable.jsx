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
        <TabPanel header="telefonos"> <TelefonosTable telefonos={datosDenunciaPropiedad.telefonos} /> </TabPanel>
        <TabPanel header="automoviles"> <AutomovilesTable automoviles={datosDenunciaPropiedad.automoviles} /> </TabPanel>
        <TabPanel header="bicicletas"> <BicicletasTable bicicletas={datosDenunciaPropiedad.bicicletas} /> </TabPanel>
        <TabPanel header="autopartes"> <AutopartesTable autopartes={datosDenunciaPropiedad.autopartes} /> </TabPanel>
        <TabPanel header="documentacion"> <DocumentacionTable documentacion={datosDenunciaPropiedad.documentacion} /> </TabPanel>
        <TabPanel header="tarjetas de credito / debito"> <TarjetasTable tarjetas={datosDenunciaPropiedad.tarjetas} /> </TabPanel>
        <TabPanel header="cheques"> <ChequesTable cheques={datosDenunciaPropiedad.cheques} /> </TabPanel>
        <TabPanel header="otros"> <OtrosTable otros={datosDenunciaPropiedad.otro} /> </TabPanel>
      </TabView>
    </>
  )
}
