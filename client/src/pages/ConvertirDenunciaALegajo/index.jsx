// Generado y sin generar

import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { AsignarDelito } from '../../components/pages/ConvertirDenunciaALegajo/AsignarDelitos';
import { ResumenHechos } from '../../components/pages/ConvertirDenunciaALegajo/ResumenHechos';

export const ConvertirDenunciaALegajo = () => {
  const { id } = useParams();

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Convertir Denuncia N° {id} a Legajo</h1>
      <ResumenHechos />
      <AsignarDelito />

      <div className='flex justify-content-between mt-8 mb-2'>
        <Button
          label={'Cancelar'}
          className='bg-red-700 hover:bg-red-800 border-red-700'
          size='large'
        />
        <Button
          label={'Convertir a Legajo'}
          className='btn-blue-mpa'
          size='large'
        />
      </div>
    </div>
  );
};
