import { useState } from 'react';
import { Card } from 'primereact/card';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PdfPreviewMemo } from '@/components/pages/ArchivarDenuncia/PdfPreview';
import { Editor } from '@/components/pages/ArchivarDenuncia/Editor';
import { useDebounce } from 'use-debounce';

export const ArchivarDenuncia = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const { id } = useParams();
  const [htmlContent] = useDebounce(text, 500);

  const handleArchivarDenuncia = () => {
    console.log(text);
  };

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Archivar Denuncia N° {id}</h1>

      <Card className='shadow-1 px-7 mt-6'>
        <div className='grid'>
          <div className='col-12'>
            <Editor text={text} setText={setText} />
          </div>

          <div className='col-12'>
            <PdfPreviewMemo htmlContent={htmlContent} />
          </div>
        </div>
      </Card>

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
        />
      </div>
    </div>
  );
};
