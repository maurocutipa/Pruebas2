import { useState } from 'react';
import { Card } from 'primereact/card';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PdfPreviewMemo } from '@/components/pages/BandejaDenuncias/ArchivarDenuncia/PdfPreview';
import { Editor } from '@/components/pages/BandejaDenuncias/ArchivarDenuncia/Editor';
import { useDebounce } from 'use-debounce';
import { archivarDenuncia } from '@/api/legajo.api';
import { FirmarPdf } from '../../../components/pages/BandejaDenuncias/ArchivarDenuncia/FirmarPdf';

export const ArchivarDenuncia = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const { id } = useParams();
  const [htmlContent] = useDebounce(text, 500);

  const handleArchivarDenuncia = async () => {
    setVisible(true);
  };

  const execAction = async () => {
    try {
      const body = { idDenuncia: id, motivosArchivo: htmlContent };
      await archivarDenuncia(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Archivar Denuncia N° {id}</h1>

      <div className='mt-6'>
        <Button
          icon='pi pi-angle-left'
          label='Regresar a la bandeja'
          className='text-lightblue-mpa p-0 mb-4'
          type='button'
          link
          onClick={() => navigate('/bandeja-denuncias')}
        />
        <Card className='shadow-1 px-7 '>
          <div className='grid'>
            <div className='col-12'>
              <Editor text={text} setText={setText} />
            </div>

            <div className='col-12'>
              <PdfPreviewMemo htmlContent={htmlContent} />
            </div>
          </div>
        </Card>
      </div>

      <div className='flex justify-content-between mt-6 mb-2'>
        <Button
          icon='pi pi-angle-left'
          label={'Cancelar'}
          onClick={() => navigate('/bandeja-denuncias')}
          className='bg-red-700 hover:bg-red-800 border-red-700'
          size='large'
        />

        <Button
          label={'Archivar Denuncia'}
          onClick={handleArchivarDenuncia}
          className='btn-blue-mpa'
          size='large'
          disabled={htmlContent.length < 50}
        />
      </div>

      {visible && (
        <FirmarPdf
          visible={visible}
          setVisible={setVisible}
          execAction={execAction}
          htmlContent={htmlContent}
        />
      )}
    </div>
  );
};
