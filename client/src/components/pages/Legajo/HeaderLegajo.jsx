//react
import { useRef } from "react";

//prime react
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

//redux
import { useAppSelector } from "@/store/hooks";

//third party
import dayjs from "dayjs";

//css
import "./HeaderLegajo.scss";


export const HeaderLegajo = () => {
  const { currentLegajo } = useAppSelector((state) => state.legajos);
  const { currentDenuncia } = useAppSelector((state) => state.denuncias);


  const participantesMenu = useRef(null);

  return (
    <>
      <div className="flex">
        <Card className="col-4 flex flex-column header-card bg-cyan-100">
          <span className="text-4xl m-0">
            Nro de Legajo:{" "}
            <strong>{`${currentLegajo?.letra}-${currentLegajo?.nroExp}-MPA`}</strong>
          </span>
        </Card>
        <Card className="col-2 flex flex-column header-card">
          <span className="text-4xl m-0">
            <i className="pi pi-calendar" style={{ fontSize: "3rem" }}></i>
            Pendientes{" "}
          </span>
        </Card>
        <Card className="col-2 flex flex-column header-card">
          <span className="text-4xl m-0 text-red-500">Vencimiento de IPP </span>
        </Card>
        <Card className="col-2 flex flex-column header-card">
          <span className="text-4xl m-0 text-red-500">
            Vencimiento de Prision Preventiva{" "}
          </span>
        </Card>
        <Card className="col-2 flex flex-column header-card">
          <span className="text-4xl m-0 text-red-500">Otros vencimientos </span>
        </Card>
      </div>
      <div className="flex mt-2">
        <div className="flex col-4">
          <Button
            label={`Ir a denuncia: ${currentDenuncia?.denuncia.idDenuncia}`}
            icon="pi pi-search"
            className="p-button-primary col-4"
          />
          <Button
            label={`Certificacion (Art. 321)`}
            icon="pi pi-check"
            outlined
            className="col-4"
            severity="secondary"
          />
          <Button
            label={`Conexidad`}
            icon="pi pi-paperclip"
            className="col-4"
            outlined
            severity="secondary"
          />
        </div>
        <div className="flex col-8">
          <div className="my-auto col-8">
            <span>
              <strong>Fecha de alta de legajo: </strong>
              {dayjs(currentLegajo?.fechaIngreso).format(
                "DD/MM/YYYY HH:mm"
              )}{" "}
              por {currentLegajo?.userIngreso}
            </span>
          </div>
          <div className="col-4 flex justify-content-end">
            <Menu model={[]} popup ref={participantesMenu} id="participantes_menu" />
            <Button label="Participantes" icon="pi pi-users" className="mr-2" onClick={(event) => participantesMenu.current.toggle(event)} aria-controls="participantes_menu" aria-haspopup />
          </div>
        </div>
      </div>
    </>
  );
};
