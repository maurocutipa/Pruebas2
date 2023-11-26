/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { deleteDenunciaThunk } from '@/store/denuncias/denuncias.thunks';
import { setIdDenuncia } from '@/store/denuncias/denuncias.slice';

export const AccionesTabla = ({ id, setVisible, isRatificada }) => {
  const navigate = useNavigate();
  const menuLeft = useRef(null);
  const dispatch = useAppDispatch();

  const eliminarDenuncia = () => {
    confirmDialog({
      message: '¿Está seguro de eliminar esta denuncia?',
      header: `Eliminar Denuncia: #${id}`,
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => dispatch(deleteDenunciaThunk(id)),
      draggable: false,
    });
  };

  const ratificarDenuncia = () => {
    navigate(`/ratificar-denuncia/${id}`);
  };

  const descargarPdf = () => {
    console.log('DESCARGADO', id);
  };

  const mostrarDetalles = () => {
    navigate(`/ver-denuncia/${id}`);
  };

  const realizarPase = () => {
    setVisible(true);
    dispatch(setIdDenuncia(id));
  };

  const menuitems = [
    {
      label: 'Acciones',
      items: [
        {
          label: 'Mostrar detalles',
          command: () => mostrarDetalles(),
        },
        {
          label: isRatificada ? 'Descargar PDF' : 'Ratificar denuncia',
          command: () => (isRatificada ? descargarPdf() : ratificarDenuncia()),
        },
        {
          label: 'Acción a realizar',
          command: () => realizarPase(),
        },
        {
          label: 'Eliminar denuncia',
          command: () => eliminarDenuncia(),
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        popup
        model={menuitems}
        ref={menuLeft}
        pt={{
          label: { className: 'text-gray-800 font-medium' },
          action: { className: 'hover:bg-gray-300' },
        }}
      />
      <Button
        icon='pi pi-ellipsis-v'
        className='text-lightblue-mpa'
        rounded
        text
        severity='info'
        onClick={(ev) => menuLeft.current.toggle(ev)}
      />
    </>
  );
};
