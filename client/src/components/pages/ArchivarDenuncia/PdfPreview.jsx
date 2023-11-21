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

const html = (htmlContent) => `
  <body>
    <style>
      .ql-align-center {
        text-align: center;
      }

      span.ql-size-huge, strong.ql-size-huge, em.ql-size-huge, u.ql-size-huge {
        font-size: 24px;
      }

      span.ql-size-large, strong.ql-size-large, em.ql-size-large, u.ql-size-large {
        font-size: 18px;
      }

      span.ql-size-small, strong.ql-size-small, em.ql-size-small, u.ql-size-small {
        font-size: 10px;
      }

      .ql-align-right {
        text-align: right;
      }

      .ql-align-justify {
        text-align: justify;
      }

      .ql-align-left {
        text-align: left;
      }

      .ql-align-center {
        text-align: center;
      }

      p {
        font-size: 14px;
      }

      li {
        font-size: 14px;
      }

      img {
        width: 150px;
        height: 150px;
      }

      strong {
        font-weight: bold;
      }

      em {
        font-style: italic;
      }
    </style>
    ${htmlContent ? htmlContent : ''}
  </body>
`;

const PdfPreview = ({ htmlContent }) => {
  const Pdf = () => (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html>{html(htmlContent)}</Html>
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
