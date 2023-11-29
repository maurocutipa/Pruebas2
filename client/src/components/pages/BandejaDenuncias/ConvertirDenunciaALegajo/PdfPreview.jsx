/* eslint-disable react/prop-types */
import { Document, Font, Page, StyleSheet, usePDF } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { ModalFirmaDigital } from '@/components/common/ModalFirmaDigital';
import { useAppSelector } from '@/store/hooks';

const customFonts = [
  {
    family: 'Courier New',
    src: '/fonts/Courier Regular.ttf',
  },
  {
    family: 'Courier New',
    fontWeight: 'bold',
    src: '/fonts/CourierPrime-Bold.ttf',
  },
  {
    family: 'Courier New',
    fontStyle: 'italic',
    src: '/fonts/CourierPrime-Italic.ttf',
  },
  {
    family: 'Courier New',
    fontStyle: 'italic',
    fontWeight: 'bold',
    src: '/fonts/CourierPrime-BoldItalic.ttf',
  },
];

customFonts.forEach((font) => {
  Font.register(font);
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Courier New',
  },
});

const stylesHtml = {};

const html = (data) => `
  <body>
    <style>
      * {
        font-size: 10px;
        font-family: 'Courier New';
      }

      h4 {
        font-size: 12px;
      }

      table {
        border: 1px solid;
        border-collapse: collapse;
        width: 100%;
      }
      
      th, td {
        border: 1px solid;
        text-align: left;
        padding: 8px;
      }
      
      tr:nth-child(even) {background-color: #f2f2f2;}
    </style>

    La denuncia N° fue convertida a legajo con los siguientes datos:

    <p><strong>Fiscalía Asignada:</strong> ${data.fiscalia}</p>

    <h4>Resumen de los hechos</h4>
    <table>
      <tr>
        <th>Nombre Completo</th>
        <th>Descripción</th>
      </tr>
      ${data.resumenHechos.map((resumenHecho) => {
        return `
          <tr>
            <td>${resumenHecho.denunciado}</td>
            <td>${resumenHecho.descripcion}</td>
          </tr>
        `;
      })}
    </table>

    <h4>Delitos asignados</h4>
    <table>
      <tr>
        <th>Nombre Completo</th>
        <th>Delito</th>
      </tr>
      ${data.delitos.map((delito) => {
        return `
          <tr>
            <td>${delito.denunciado}</td>
            <td>${delito.delito}</td>
          </tr>
        `;
      })}
    </table>
  </body>
`;

export const PdfPreview = ({ visible, setVisible, execAction }) => {
  const { dataParaPdf } = useAppSelector((state) => state.denunciaLegajo);

  const Pdf = () => (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html stylesheet={stylesHtml}>{html(dataParaPdf)}</Html>
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
