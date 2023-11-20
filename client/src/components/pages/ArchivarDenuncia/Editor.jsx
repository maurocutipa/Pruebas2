/* eslint-disable react/prop-types */
import { Editor as E } from 'primereact/editor';

export const Editor = ({ text, setText }) => {
  return (
    <>
      <h3>Redacte los motivos por los cuales se archivará la denuncia</h3>
      <E
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: '320px', fontSize: '18px' }}
        className='mt-6'
      />

      <h5 className='font-italic'>
        Nota: Se enviará al denunciante y/o víctima una copia de los motivos de
        archivo
      </h5>
    </>
  );
};
