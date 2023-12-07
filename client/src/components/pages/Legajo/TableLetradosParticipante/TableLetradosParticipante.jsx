import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export const TableLetradosParticipante = () => {
  const [tipoValue, setTipoValue] = useState("");
  const columns = [
    { field: "editar", header: "Editar" },
    { field: "apellido", header: "Apellido" },
    { field: "nombre", header: "Nombre" },
    { field: "dni", header: "DNI" },
    { field: "calidad", header: "Calidad" },
    { field: "matriculaProfesional", header: "Matrícula Profesional" },
    { field: "verMas", header: "Ver Más" },
  ];

  const options = [
    { id: 1, tipo: "Calidad 1" },
    { id: 2, tipo: "Calidad 2" },
    { id: 3, tipo: "Calidad 3" },
  ];
  const data = [
    {
      editar: "",
      apellido: "YAÑEZ",
      nombre: "MAURO",
      dni: "41041626",
      calidad: "Seleccionar",
      matriculaProfesional: "INGENIERO INFORMATICO",
      ver_mas: "+",
    },
  ];

  const calidadTemplate = (rowData) => {
    return (
      <Dropdown
        className="w-full"
        placeholder="Seleccione un Tipo"
        options={options}
        optionLabel="tipo"
        optionValue="id"
        value={tipoValue}
        onChange={(e) => {
          setTipoValue(e.target.value);
          setStr(
            tiposDenunciaInterna.find((item) => item.id == e.target.value).tipo
          );
        }}
      ></Dropdown>
    );
  };

  const editarTemplate = (rowData) => {
    return (
      <Button type="button" icon="pi pi-pencil" className="p-button-text" />
    );
  };

  const verMasTemplate = (rowData) => {
    return (
      <Button
        type="button"
        icon="pi pi-external-link"
        className="p-button-text"
      />
    );
  };

  return (
    <DataTable
      value={data}
      paginator
      rows={10}
      tableStyle={{ minWidth: "50rem" }}
      className="shadow-3"
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={
            col.field === "editar"
              ? editarTemplate
              : col.field === "verMas"
              ? verMasTemplate
              : col.field === "calidad"
              ? calidadTemplate
              : null
          }
        />
      ))}
    </DataTable>
  );
};
