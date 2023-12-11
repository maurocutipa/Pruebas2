import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {TableLetradosParticipante} from "./TableLetradosParticipante"
export function Prueba() {
  return (
    <>
      
      <InputText type="search" placeholder="Buscar..." className="p-mb-2" />
      <TableLetradosParticipante/>
      <Button label="Agregar Nuevo Participante" icon="pi pi-plus" className="p-mt-2" />
    </>
  );
}
