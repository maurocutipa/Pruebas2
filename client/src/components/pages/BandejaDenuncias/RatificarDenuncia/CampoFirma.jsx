/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import SignaturePad from 'react-signature-canvas';

export const CampoFirma = ({ title, setSignature, signatureRef }) => {
  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      return;
    }

    setSignature(
      setSignature.current.getTrimmedCanvas().toDataURL('image/png')
    );
  };

  return (
    <section className='mx-2'>
      <div className='mb-1'>
        <h3>{title}</h3>

        <div className='mt-2'>
          <SignaturePad
            ref={signatureRef}
            canvasProps={{ className: 'signature-canvas' }}
          />

          <div className='mt-3'>
            <Button
              size='small'
              label='Guardar'
              className='btn-blue-mpa mr-2'
              type='button'
              onClick={handleSave}
            />

            <Button
              size='small'
              label='Limpiar'
              className='bg-bluegray-100 text-gray-900 border-bluegray-100 hover:bg-bluegray-200'
              type='button'
              onClick={() => signatureRef.current.clear()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
