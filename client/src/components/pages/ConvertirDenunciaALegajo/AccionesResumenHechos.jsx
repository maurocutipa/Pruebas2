import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

export const AccionesResumenHechos = () => {
  const eliminarResumen = () => {
    confirmDialog({
      message: '¿Está seguro de eliminar este resumen?',
      header: 'Eliminar resumen',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {},
      draggable: false,
    });
  };

  const modificarResumen = () => {};

  return (
    <>
      <Button
        icon='pi pi-pencil'
        size='large'
        className='text-lightblue-mpa'
        rounded
        text
        severity='info'
        onClick={modificarResumen}
        tooltip='Modificar'
        tooltipOptions={{ position: 'top' }}
      />

      <Button
        icon='pi pi-trash'
        size='large'
        rounded
        text
        severity='danger'
        onClick={eliminarResumen}
        tooltip='Eliminar'
        tooltipOptions={{ position: 'top' }}
      />
    </>
  );
};
