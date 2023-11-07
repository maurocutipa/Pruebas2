/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppDispatch } from '@/store/hooks';
import {
  deleteDenunciaThunk,
  getDenunciaThunk,
} from '@/store/denunciasSlice/denuncias.thunks';
import { setIdDenuncia } from '@/store/denunciasSlice/denuncias.slice';
import { Menu } from 'primereact/menu';
import { useRef } from 'react';

export const AccionesTabla = ({ id, setVisible }) => {
  const menuLeft = useRef(null);
  const dispatch = useAppDispatch();

  const eliminarDenuncia = () => {
    confirmDialog({
      message: '¿Está seguro de eliminar esta denuncia?',
      header: 'Confirmación para eliminar una denuncia',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => dispatch(deleteDenunciaThunk(id)),
      draggable: false,
    });
  };

  const descargarDenuncias = () => {
    console.log('DESCARGADO', id);
  };

  const mostrarDetalles = () => {
    dispatch(getDenunciaThunk(id));
    console.log('DETALLES', id);
  };

  const realizarPase = () => {
    setVisible(true);
    dispatch(setIdDenuncia(id));
  };

  const convertirDenuncia = () => {
    console.log('CONVERTIR DENUNCIA', id);
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
          label: 'Descargar como PDF',
          command: () => descargarDenuncias(),
        },
        {
          label: 'Realizar pase',
          command: () => realizarPase(),
        },
        {
          label: 'Convertir denuncia a legajo',
          command: () => convertirDenuncia(),
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
