import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { ResumenDenuncia } from '@/components/pages/RatificarDenuncia/ResumenDenuncia';
import { FirmaYTOS } from '@/components/pages/RatificarDenuncia/FirmaYTOS';

export const RatificarDenuncia = () => {
  const { id } = useParams();

  const handleRatificarDenuncia = () => {
    console.log(id);
  };

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Ratificar Denuncia N° {id}</h1>

      <ResumenDenuncia />

      <FirmaYTOS />

      <div className='flex justify-content-end mt-6 mb-2'>
        <Button label={'Firmar'} className='btn-blue-mpa mr-4' size='large' />

        <Button
          onClick={handleRatificarDenuncia}
          label={'Ratificar Denuncia'}
          className='btn-blue-mpa'
          size='large'
        />
      </div>
    </div>
  );
};
