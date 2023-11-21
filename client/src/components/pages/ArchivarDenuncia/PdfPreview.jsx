/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Html from 'react-pdf-html';
import { Document, Page, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import { PdfViewer } from '@/components/common/PdfViewer';
import { memo } from 'react';

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
    <strong>
      <p style="font-weight: bold;">hola</p>
    </strong>
    ${htmlContent ? htmlContent : ''}
  </body>
`;

const PdfPreview = ({ htmlContent }) => {
  const Pdf = () => (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html stylesheet={stylesHtml}>{html(htmlContent)}</Html>
      </Page>
    </Document>
  );

  return (
    <BlobProvider document={<Pdf />}>
      {({ blob, url }) => {
        return (
          <>{url !== null ? <PdfViewer url={url} height={600} /> : null}</>
        );
      }}
    </BlobProvider>
  );
};

export const PdfPreviewMemo = memo(PdfPreview);
