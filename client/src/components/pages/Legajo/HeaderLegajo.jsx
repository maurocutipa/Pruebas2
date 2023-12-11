//react
import { useRef } from "react";

//prime react
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";

//redux
import { useAppSelector } from "@/store/hooks";

//third party
import dayjs from "dayjs";

//css
import "./HeaderLegajo.scss";
import { useState } from "react";

//components
import { TableLetradosParticipante } from "./LetradosyParticipante/TableLetradosParticipante";

export const HeaderLegajo = () => {
  const { currentLegajo } = useAppSelector((state) => state.legajos);
  const { currentDenuncia } = useAppSelector((state) => state.denuncias);

  const [visibleRight, setVisibleRight] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const participantesMenu = useRef(null);
  //#11223A
  return (
    <>
      <div className="grid">
        <div className="col-10 md:col-12 lg:col-12 xl:col-4">
          <Card
            style={{ backgroundColor: "#11223A" }}
            className="flex align-content-center"
            pt={{
              content: { className: "p-0" },
            }}
          >
            <p className="text-2xl m-0 p-0 text-white">
              Nro de Legajo:
              <strong>{` ${currentLegajo?.letra}-${currentLegajo?.nroExp}-MPA`}</strong>
            </p>
          </Card>
        </div>
        <div className="col-2 md:hidden">
          <Button
            icon="pi pi-arrow-left"
            onClick={() => setVisibleRight(true)}
            style={{ minHeight: 69 }}
          />
          <Sidebar
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
          >
            <h2>Right Sidebar</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Sidebar>
        </div>
        <div className="hidden md:block md:col-12 lg:col-12 xl:col-8 pb-0">
          <div className="grid">
            <div className="col-5 xl:col-5 pb-0">
              <div className="grid">
                <div className="col-5 xl:col-5">
                  <Button
                    label="2 Pendientes"
                    icon="pi pi-calendar"
                    className="w-12 bg-white hover:bg-gray-200 text-xs"
                    severity="secondary"
                    outlined
                    style={{ minHeight: 69, padding: "0 10px" }}
                    text
                    raised
                    tooltip="Ir a pendientes"
                    tooltipOptions={{ position: "bottom" }}
                  />
                </div>
                <div className="col-7 xl:col-7">
                  <Button
                    label="Vencimiento de IPP en 3 dias"
                    className="w-12 bg-white hover:bg-gray-200 text-sm"
                    severity="danger"
                    outlined
                    style={{
                      minHeight: 69,
                      color: "#E00000",
                      padding: "0 10px",
                    }}
                    text
                    raised
                    tooltip="Ir a pendientes"
                    tooltipOptions={{ position: "bottom" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-7 xl:col-7 pb-0">
              <div className="grid">
                <div className="col-7 xl:col-7">
                  <Button
                    label="Vencimiento de Prision Preventiva: 2 días"
                    className="w-12 text-sm bg-white hover:bg-gray-200"
                    severity="danger"
                    outlined
                    style={{ minHeight: 69, color: "#E00000" }}
                    text
                    raised
                    tooltip="Ir a pendientes"
                    tooltipOptions={{ position: "bottom" }}
                  />
                </div>
                <div className="col-5 xl:col-5">
                  <Button
                    label="Otros Vencimientos"
                    className="w-12 text-sm bg-white hover:bg-gray-200"
                    severity="danger"
                    outlined
                    style={{ minHeight: 69, color: "#E00000" }}
                    text
                    raised
                    tooltip="Ir a pendientes"
                    tooltipOptions={{ position: "bottom" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* @mayko */}
      {/* <div className="flex">
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
      </div> */}
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
            <Menu
              model={[]}
              popup
              ref={participantesMenu}
              id="participantes_menu"
            />
            <Button
              label="Participantes"
              icon="pi pi-users"
              className="mr-2"
              onClick={(event) => participantesMenu.current.toggle(event)}
              aria-controls="participantes_menu"
              aria-haspopup
            />
          </div>
        </div>
      </div>

      {/*LETRADOS Y PARTICIPANTES - MAURO  */}
      <Button
        className="p-button-text p-mb-2 my-custom-margin"
        onClick={toggleVisibility}
        label="LETRADOS Y OTROS PARTICIPANTES"
        icon={isVisible ? "pi pi-chevron-up" : "pi pi-chevron-down"}
        iconPos="right"
      />
      {isVisible && (
        <>
          <div className="p-inputgroup my-custom-margin">
            <InputText
              type="number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por DNI..."
            />
            <Button
              onClick={() => console.log("Buscando")}
              icon="pi pi-search"
              className="p-button-primary"
            />
          </div>
          <TableLetradosParticipante />
          <Button
            label="Agregar Nuevo Participante"
            icon="pi pi-plus"
            className="p-mt-2 my-custom-margin"
          />
        </>
      )}
      {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}
    </>
  );
};
