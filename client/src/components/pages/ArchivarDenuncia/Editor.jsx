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
    // [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
  ],
  // toolbar: {
  //   handlers: {
  //     link: function (value) {
  //       console.log(value);
  //       if (value) {
  //         var href = prompt('Enter the URL');
  //         this.quill.format('link', href);
  //       } else {
  //         this.quill.format('link', false);
  //       }
  //     },
  //     image: (value) => {
  //       console.log(value);
  //     },
  //   },
  // },

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
