import { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
//persona slice
import {
  getPersonasThunks,
  getGruposThunks,
} from '@/store/personas/personas.thunks';

import { setNotificaciones, resetState } from '@/store/personas/personas.slice';
import { generateUUID } from '@/utils/generateUUID';

export const Notificaciones = () => {
  const { grupos, personas, notificaciones } = useAppSelector(
    (state) => state.personas
  );

  const dispatch = useAppDispatch();

  const tipoNotificaciones = [
    { label: 'NOTIFICACION PERSONAL', value: 1 },
    { label: 'NOTIFICACION POR GRUPO', value: 2 },
    { label: 'AGENDA DEL SECTOR', value: 3 },
  ];

  //states
  const [currentTipo, setCurrentTipo] = useState(null);
  const [currentPersona, setCurrentPersona] = useState(null);
  const [currentGrupo, setCurrentGrupo] = useState(null);

  //refs
  const nombreApellidoRef = useRef(null);
  const emailRef = useRef(null);

  const handleCurrentTipo = (e) => {
    setCurrentTipo(e.value);
  };

  const handlePersona = (e) => {
    setCurrentPersona(e.value);
    if (!e.value) {
      nombreApellidoRef.current.value = '';
      emailRef.current.value = '';
      return;
    }
    nombreApellidoRef.current.value = personas.find(
      (p) => p.mail === e.value
    ).nombre;
    emailRef.current.value = e.value;
  };

  const addNotificacion = () => {
    const persona = {
      tipo: currentTipo & 1 ? 'PERSONA' : 'GRUPO',
      tipoNotificacion:
        currentTipo == 1 ? 'PERSONAL' : currentTipo == 2 ? 'GRUPAL' : 'AGENDA',
      nombre:
        currentTipo & 1
          ? nombreApellidoRef.current.value
          : grupos.find((g) => g.id === currentGrupo)?.nombre,
      mail: currentTipo & 1 ? emailRef.current.value : '-',
      id: generateUUID(),
    };

    dispatch(setNotificaciones([...notificaciones, persona]));
  };

  const deleteNotificacion = (id) => {
    dispatch(setNotificaciones(notificaciones.filter((p) => p.id !== id)));
  };

  useEffect(() => {
    dispatch(getGruposThunks());
    dispatch(
      getPersonasThunks({
        limit: 2000,
        offset: 0,
      })
    );

    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <section id='notificaciones'>
      <h2>Notificaciones</h2>

      <div className='mt-5'>
        <div className='grid'>
          <div className='col-12 xl:col-3'>
            <label htmlFor='tipoNotificacion'>Tipo Notificación</label>
            <Dropdown
              id='tipoNotificacion'
              name='tipoNotificacion'
              value={currentTipo}
              options={tipoNotificaciones}
              placeholder='Seleccione un tipo'
              className={`w-full mt-2 `}
              optionLabel='label'
              optionValue='value'
              onChange={handleCurrentTipo}
            />
          </div>

          {(currentTipo === 1 || currentTipo === 3) && (
            <>
              <div className='col-12 xl:col-3'>
                <label htmlFor='persona'>Persona</label>
                <Dropdown
                  id='persona'
                  name='persona'
                  value={currentPersona}
                  options={personas}
                  optionLabel='nombre'
                  optionValue='mail'
                  placeholder='Seleccione una persona'
                  className={`w-full mt-2 `}
                  onChange={handlePersona}
                />
              </div>

              <div className='col-12 xl:col-3'>
                <label htmlFor='nombreApellido'>Nombre y Apellido</label>
                <InputText
                  id='nombreApellido'
                  name='nombreApellido'
                  placeholder='Ingrese un nombre y apellido'
                  className={`w-full mt-2 `}
                  ref={nombreApellidoRef}
                />
              </div>

              <div className='col-12 xl:col-3'>
                <label htmlFor='email'>Email</label>
                <InputText
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Ingrese un email'
                  className={`w-full mt-2 `}
                  ref={emailRef}
                />
              </div>
            </>
          )}

          {currentTipo === 2 && (
            <>
              <div className='col-12 xl:col-9'>
                <label htmlFor='grupo'>Grupo</label>
                <Dropdown
                  id='grupo'
                  name='grupo'
                  value={currentGrupo}
                  options={grupos}
                  optionLabel='nombre'
                  optionValue='id'
                  placeholder='Seleccione un grupo'
                  className={`w-full mt-2 `}
                  onChange={(e) => setCurrentGrupo(e.value)}
                />
              </div>
            </>
          )}

          {currentTipo && (
            <div className='col-12 xl:col-2 mt-4'>
              <Button
                icon='pi pi-plus'
                label='Agregar'
                className='btn-blue-mpa w-full'
                onClick={addNotificacion}
                type='button'
              />
            </div>
          )}
        </div>

        <div className='mt-6'>
          <DataTable
            value={notificaciones}
            paginator
            rows={5}
            totalRecords={notificaciones.length}
            emptyMessage='No se encontraron resultados'
            className='mb-4 shadow-1 mt-4'
            tableStyle={{ minWidth: '50rem' }}
            dataKey='id'
          >
            <Column field='tipo' header='Tipo' />
            <Column field='nombre' header='Nombre' />
            <Column field='mail' header='Mail' />
            <Column
              field='acciones'
              header='Eliminar'
              body={({ id }) => (
                <Button
                  icon='pi pi-trash'
                  size='large'
                  rounded
                  text
                  severity='danger'
                  onClick={() => deleteNotificacion(id)}
                  tooltip='Eliminar'
                  tooltipOptions={{ position: 'top' }}
                />
              )}
              pt={{ headerCell: { className: 'w-2' } }}
            />
          </DataTable>
        </div>
      </div>
    </section>
  );
};
