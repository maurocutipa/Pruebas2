/* eslint-disable react/prop-types */
import { Document, Page, StyleSheet, usePDF } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { ModalFirmaDigital } from '@/components/common/ModalFirmaDigital';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
});

const stylesHtml = {
  ['.flex']: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ['.flex-image']: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ['.ml']: {
    marginLeft: '10px',
  },
  ['.border']: {
    border: '1px solid black',
    padding: '5px',
  },
  ['.firma']: {
    fontSize: '12px',
  },
};

const html = () => `
  <body>
    <div class="flex">
      <div class="flex-image">
        <div class="firma">Denunciante</div>
        <div class="firma">Firma y DNI</div>
      </div>

      <div class="flex-image">
        <div class="firma">Funcionario Interviniente</div>
        <div class="firma">Firma y DNI</div>
      </div>
    </div>
  </body>
`;

export const PdfPreview = ({ visible, setVisible, execAction }) => {
  const Pdf = () => (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html stylesheet={stylesHtml}>{html()}</Html>
      </Page>
    </Document>
  );

  const [instance] = usePDF({ document: <Pdf /> });

  if (instance.loading) return <div>Cargando...</div>;

  if (instance.error) return <div>{instance.error}</div>;

  return (
    <ModalFirmaDigital
      visible={visible}
      setVisible={setVisible}
      firmaData={instance}
      execAction={execAction}
    />
  );
};
