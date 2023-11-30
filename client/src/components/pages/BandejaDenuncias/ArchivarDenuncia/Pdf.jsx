/* eslint-disable react/prop-types */
import { Document, Font, Page, StyleSheet } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';

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
  },
});

const stylesHtml = {
  ['.ql-align-center']: {
    textAlign: 'center',
  },

  ['.ql-size-huge']: {
    fontSize: '24px',
  },

  ['.ql-size-large']: {
    fontSize: '18px',
  },

  ['.ql-size-small']: {
    fontSize: '10px',
  },

  ['.ql-align-right']: {
    textAlign: 'right',
  },

  ['.ql-align-justify']: {
    textAlign: 'justify',
  },

  ['.ql-align-left']: {
    textAlign: 'left',
  },

  p: {
    fontSize: '14px',
  },

  li: {
    fontSize: '14px',
  },

  img: {
    width: '150px',
    height: '150px',
  },

  strong: {
    fontWeight: 'bold',
  },

  em: {
    fontStyle: 'italic',
  },
};

const html = (htmlContent) => `
  <body>
    <style>
      * {
        font-family: 'Courier New';
      }
    </style>
    ${htmlContent || ''}
  </body>
`;

export const PDF = ({ htmlContent }) => {
  return (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html stylesheet={stylesHtml}>{html(htmlContent)}</Html>
      </Page>
    </Document>
  );
};
