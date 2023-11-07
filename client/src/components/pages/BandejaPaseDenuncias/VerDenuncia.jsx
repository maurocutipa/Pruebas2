/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';

export const VerDenuncia = ({ id }) => {
  const handleVerDenuncia = () => {
    console.log(id);
  };

  return (
    <Button
      icon='pi pi-search-plus'
      tooltip='Ver Denuncia'
      className='btn-blue-mpa'
      tooltipOptions={{ position: 'top' }}
      onClick={handleVerDenuncia}
    />
  );
};
