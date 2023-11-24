/* eslint-disable react/prop-types */
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);
export const Editor = ({ text, setText }) => {
  const handleChange = (content) => {
    setText(content);
  };

  return (
    <>
      <h2>Redacte los motivos por los cuales se archivará la denuncia</h2>
      <div className='mb-8 mt-6'>
        <ReactQuill
          placeholder='Escriba aquí los motivos por los cuales se archivará la denuncia'
          theme='snow'
          value={text}
          onChange={handleChange}
          style={{ height: '320px' }}
          modules={modules}
        />
      </div>

      <h5 className='font-italic'>
        Nota: Se enviará al denunciante y/o víctima una copia de los motivos de
        archivo
      </h5>
    </>
  );
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [{ align: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    handleStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white',
    },
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
};
