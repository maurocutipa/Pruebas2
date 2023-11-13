import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';

export const AccionesResumenHechos = () => {
  const menuLeft = useRef(null);

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

  const menuitems = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Modificar',
          command: () => modificarResumen(),
        },
        {
          label: 'Eliminar',
          command: () => eliminarResumen(),
        },
      ],
    },
  ];

  return (
    <>
      <Menu popup model={menuitems} ref={menuLeft} />

      <Button
        icon='pi pi-ellipsis-v'
        className='text-lightblue-mpa'
        rounded
        text
        severity='info'
        onClick={(ev) => menuLeft.current.toggle(ev)}
      />

      <Button
        icon='pi pi-trash'
        className='text-lightblue-mpa'
        rounded
        text
        severity='info'
        onClick={(ev) => menuLeft.current.toggle(ev)}
      />
    </>
  );
};
