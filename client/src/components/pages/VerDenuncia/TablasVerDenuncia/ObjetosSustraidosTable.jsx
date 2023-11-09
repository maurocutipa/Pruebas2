import { TabView, TabPanel } from 'primereact/tabview';

export const ObjetosSustraidosTable = () => {
  return (
    <>
        <TabView>
            <TabPanel header="telefonos"></TabPanel>
            <TabPanel header="automoviles"></TabPanel>
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
