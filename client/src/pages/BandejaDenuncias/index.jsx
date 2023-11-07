import { DenunciasTable } from '@/components/pages/BandejaDenuncias/DenunciasTable';

const BandejaDenuncias = () => {
  return (
    <div className='px-8 py-4'>
      <h1 className='text-center mb-6'>Bandeja de Denuncias</h1>
      <DenunciasTable />
    </div>
  );
};

export default BandejaDenuncias;
