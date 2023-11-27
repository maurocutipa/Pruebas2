/* eslint-disable react/prop-types */
import { Document, Page, StyleSheet, usePDF } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html';
import { PdfViewer } from '@/components/common/PdfViewer';
import { useEffect, useState } from 'react';
import PDFMerger from 'pdf-merger-js/browser';

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

const html = (firmaDenunciante, firmaFuncionario) => `
  <body>
    <div class="flex">
      <div class="flex-image">
        <div class="border">
          <img
            src=${firmaDenunciante || ''}
            alt='FIRMA DENUNCIANTE'
            style="width: 150px; height: 150px;"
          />
        </div>
        <div class="firma">Denunciante</div>
        <div class="firma">Firma y DNI</div>
      </div>

      <div class="flex-image">
        <div class="border ml">
          <img
            src=${firmaFuncionario || ''}
            alt='FIRMA DENUNCIANTE'
            style="width: 150px; height: 150px;"
          />
        </div>
        <div class="firma">Funcionario Interviniente</div>
        <div class="firma">Firma y DNI</div>
      </div>
    </div>
  </body>
`;

export const PdfPreview = ({ firmaDenunciante, firmaFuncionario }) => {
  const Pdf = () => (
    <Document>
      <Page size={'A4'} style={styles.body}>
        <Html stylesheet={stylesHtml}>
          {html(firmaDenunciante, firmaFuncionario)}
        </Html>
      </Page>
    </Document>
  );

  const [instance] = usePDF({ document: <Pdf /> });

  if (instance.loading) return <div>Cargando...</div>;

  if (instance.error) return <div>{instance.error}</div>;

  return <PdfMerged instance={instance} />;
};

const PdfMerged = ({ instance }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const mergePdf = async () => {
      const link =
        'https://www.sib.gob.ar/portal/wp-content/uploads/2020/08/Cuento-Los-Parques-Nacionales-nuestros-por-naturaleza.pdf';

      const res = await fetch(link, { signal: abortController.signal });
      const blob = await res.blob();

      const merger = new PDFMerger();
      await merger.add(blob);
      await merger.add(instance.blob);

      console.log('PAASA');
      const mergedPdf = await merger.saveAsBlob();
      const url = URL.createObjectURL(mergedPdf);
      setUrl(url);
    };

    mergePdf();

    return () => {
      setUrl(null);
      abortController.abort();
    };
  }, [instance]);

  if (!url) return <div>Cargando...</div>;

  return <PdfViewer url={url} height={500} />;
};
