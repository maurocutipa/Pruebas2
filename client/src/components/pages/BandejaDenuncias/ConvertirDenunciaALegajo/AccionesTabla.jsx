/* eslint-disable react/prop-types */
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppDispatch } from '@/store/hooks';
import {
  setResumenHechosForm,
  eliminarResumenHecho,
  setDelitoAsignadoForm,
  eliminarDelitoAsignado,
  eliminarDetenido,
  setDetenidoForm,
} from '@/store/denuncias/denunciaLegajo/denunciaLegajo.slice';

export const AccionesTabla = ({ data, action, disabled = false }) => {
  const dispatch = useAppDispatch();

  const eliminar = () => {
    confirmDialog({
      message: `¿Está seguro de eliminar este ${action}?`,
      header: `Eliminar ${action}`,
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        if (action === 'resumen') {
          dispatch(eliminarResumenHecho(data.id));
        }

        if (action === 'delito') {
          dispatch(eliminarDelitoAsignado(data.id));
        }

        if (action === 'detenido') {
          dispatch(eliminarDetenido(data.id));
        }
      },
      draggable: false,
    });
  };

  const modificar = () => {
    if (action === 'resumen') {
      dispatch(setResumenHechosForm(data));
    }

    if (action === 'delito') {
      dispatch(setDelitoAsignadoForm(data));
    }

    if (action === 'detenido') {
      dispatch(setDetenidoForm(data));
    }
  };

  return (
    <>
      <Button
        icon='pi pi-pencil'
        size='large'
        className='text-lightblue-mpa'
        rounded
        text
        severity='info'
        onClick={modificar}
        tooltip='Modificar'
        disabled={disabled}
        tooltipOptions={{ position: 'top' }}
      />

      <Button
        icon='pi pi-trash'
        size='large'
        rounded
        text
        severity='danger'
        onClick={eliminar}
        tooltip='Eliminar'
        disabled={disabled}
        tooltipOptions={{ position: 'top' }}
      />
    </>
  );
};
