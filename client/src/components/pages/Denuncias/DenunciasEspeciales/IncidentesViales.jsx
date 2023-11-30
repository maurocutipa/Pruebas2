import React, { useState } from 'react'
import { useDenunciaContext } from '../../../../pages/Denuncia/Denuncia.jsx';
import { AutomovilesTable } from './TablasEspeciales/AutomovilesTable';
import AutomovilForm from './FormulariosEspeciales/RoboHurto/AutomovilForm';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useIncidentesVialesContext } from '../../../../pages/Denuncia/Denuncia.jsx';

export const IncidentesViales = (props) => {
  const { tipoValue, str } = useDenunciaContext();
  const [automovilVisible, setAutomovilVisible] = useState(false);
  const { automoviles, setAutomoviles } = useIncidentesVialesContext();

  const agregarAutomovil = (automovil) => {
    setAutomoviles([...automoviles, automovil]);
  };

  const eliminarAutomovil = (automovil) => {
    const automovilesActualizados = automoviles.filter((t) => t !== automovil);
    setAutomoviles(automovilesActualizados);
  };

  return (
    <>
      <div>
        <h3 className='text-lightblue-mpa text-4xl'>Vehículos Involucrados</h3>

        <div className="text-center">
          <div className="grid mb-4">
            <div className='col-12 md:col-6 lg:col-3'>
              <Button type="button" label="Agregar Automoviles" icon="pi pi-plus" onClick={() => setAutomovilVisible(true)} className="btn-blue-mpa w-full" />
              <Dialog draggable={false} header="Carga de Automóvil" visible={automovilVisible} style={{ width: '70vw' }} onHide={() => setAutomovilVisible(false)}>
                <AutomovilForm agregarAutomovil={agregarAutomovil} tipoDenuncia={tipoValue} />
              </Dialog>
            </div>
          </div>
        </div>

        {
          automoviles.length==0 ? (
            <small className="p-error">Debe ingresar al menos un vehículo.</small>
          ) : null
        }
        
        {/* {props.getFormErrorMessageDenuncia('automovilesIncidenteVial')}  //sacar*/}

        {
          automoviles.length != 0 ? (
            <div className="mt-6">
              <h3>Lista de Vehiculos</h3>
              <AutomovilesTable automoviles={automoviles} eliminarAutomovil={eliminarAutomovil} tipoDenuncia={tipoValue} />
            </div>
          )
            : null
        }
      </div>
    </>
  )
}
