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

const PdfPreview = ({ htmlContent }) => {
  const Pdf = () => (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html>{htmlContent ? htmlContent : ''}</Html>
      </Page>
    </Document>
  );

  return (
    <BlobProvider document={<Pdf />}>
      {({ blob, url }) => {
        return <>{url !== null ? <PdfViewer url={url} /> : null}</>;
      }}
    </BlobProvider>
  );
};

export const PdfPreviewMemo = memo(PdfPreview);
