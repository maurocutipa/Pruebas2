import { TabView, TabPanel } from 'primereact/tabview';
import { AutomovilesTable } from './AutomovilesTable';

export const ObjetosSustraidosTable = ({datosDenunciaPropiedad}) => {
  return (
    <>
        <TabView>
            <TabPanel header="telefonos"></TabPanel>
            <TabPanel header="automoviles"> <AutomovilesTable automoviles = {datosDenunciaPropiedad.automoviles}/> </TabPanel>
            <TabPanel header="bicicletas"></TabPanel>
            <TabPanel header="autopartes"></TabPanel>
            <TabPanel header="documentacion"></TabPanel>
            <TabPanel header="tarjetas de credito / debito"></TabPanel>
            <TabPanel header="cheques"></TabPanel>
            <TabPanel header="otros"></TabPanel>
        </TabView>
    </>
  )
}
