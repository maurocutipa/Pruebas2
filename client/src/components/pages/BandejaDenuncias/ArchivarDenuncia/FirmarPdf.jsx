/* eslint-disable react/prop-types */
import { usePDF } from '@react-pdf/renderer';
import { PDF } from './Pdf';
import { ModalFirmaDigital } from '@/components/common/ModalFirmaDigital';

export const FirmarPdf = ({ htmlContent, visible, setVisible, execAction }) => {
  const [instance] = usePDF({ document: <PDF htmlContent={htmlContent} /> });

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
