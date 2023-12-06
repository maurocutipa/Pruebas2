/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { deleteDenunciaThunk } from '@/store/denuncias/denuncias.thunks';
import { setIdDenuncia } from '@/store/denuncias/denuncias.slice';
import { downloadFile } from '@/utils/downloadfile';

export const AccionesTabla = ({ setVisible, denuncia }) => {
  const navigate = useNavigate();
  const menuLeft = useRef(null);
  const dispatch = useAppDispatch();

  const {
    idDenuncia,
    idLegajo,
    ratificacion,
    accion,
    nombreArchivo,
    nombreOriginal,
  } = denuncia;

  const eliminarDenuncia = () => {
    confirmDialog({
      message: '¿Está seguro de eliminar esta denuncia?',
      header: `Eliminar Denuncia: #${idDenuncia}`,
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => dispatch(deleteDenunciaThunk(idDenuncia)),
      draggable: false,
    });
  };

  const ratificarDenuncia = () => {
    navigate(`/ratificar-denuncia/${idDenuncia}`);
  };

  const descargarPdf = () => {
    const pdfTest =
      'https://www.sib.gob.ar/portal/wp-content/uploads/2020/08/Cuento-Los-Parques-Nacionales-nuestros-por-naturaleza.pdf';
    downloadFile(nombreArchivo || pdfTest, nombreOriginal);
  };

  const mostrarDetalles = () => {
    navigate(`/ver-denuncia/${idDenuncia}`);
  };

  const realizarPase = () => {
    setVisible(true);
    dispatch(setIdDenuncia(idDenuncia));
  };

  const verLegajo = () => {
    dispatch(setIdDenuncia(idDenuncia));
    navigate(`/legajo/${idLegajo}`);
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
          label: ratificacion ? 'Descargar PDF' : 'Ratificar denuncia',
          command: () => (ratificacion ? descargarPdf() : ratificarDenuncia()),
        },
        ...(() => {
          if (!accion)
            return [
              {
                label: 'Acción a realizar',
                command: () => realizarPase(),
              },
            ];
          return [];
        })(),
        {
          label: 'Eliminar denuncia',
          command: () => eliminarDenuncia(),
        },
        ...(() => {
          if (idLegajo)
            return [
              {
                label: 'Ver legajo',
                command: () => verLegajo(),
              },
            ];
          return [];
        })(),
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
