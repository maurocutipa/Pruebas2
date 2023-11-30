/* eslint-disable react/prop-types */
import { BlobProvider } from '@react-pdf/renderer';
import { PdfViewer } from '@/components/common/PdfViewer';
import { memo } from 'react';
import { PDF } from './Pdf';

export const PdfPreview = ({ htmlContent }) => {
  return (
    <BlobProvider document={<PDF htmlContent={htmlContent} />}>
      {(pdf) => {
        return (
          <>
            {pdf.url !== null ? <PdfViewer url={pdf.url} height={600} /> : null}
          </>
        );
      }}
    </BlobProvider>
  );
};

export const PdfPreviewMemo = memo(PdfPreview);
