import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

export const AnexoViolenciaDeGenero = ({ datosViolenciaDeGenero }) => {
  useEffect(() => {
    actualizarSeleccion(situaciones, 1, setSelectedSituaciones);
    actualizarSeleccion(tiposViolencia, 1, setSelectedTipos);
    actualizarSeleccion(perfilAgresor, 1, setSelectedPerfil);
    actualizarSeleccion(vulnerabilidades, 1, setSelectedVulnerabilidades);
    setRiesgo(datosViolenciaDeGenero.valoracion); 
  }, []);

  const situaciones = [
    { label: 'Separación reciente o en trámite de separación', denuncia: 'situacion1', valor: datosViolenciaDeGenero?.situacion1 },
    { label: 'Acoso reciente a la víctima o quebrante de la orden de alejamiento', denuncia: 'situacion2', valor: datosViolenciaDeGenero?.situacion2 },
  ];

  const tiposViolencia = [
    { label: 'Existencia de violencia física susceptible de causar lesiones', denuncia: 'tipoViolencia1', valor: datosViolenciaDeGenero?.tipoViolencia1 },
    { label: 'Violencia física en presencia de los hijos u otros familiares', denuncia: 'tipoViolencia2', valor: datosViolenciaDeGenero?.tipoViolencia2 },
    { label: 'Aumento de la frecuencia y de la gravedad de los incidentes violentos en el último mes', denuncia: 'tipoViolencia3', valor: datosViolenciaDeGenero?.tipoViolencia3 },
    { label: 'Amenazas graves o de muerte en el último mes', denuncia: 'tipoViolencia4', valor: datosViolenciaDeGenero?.tipoViolencia4 },
    { label: 'Amenazas con objetos peligrosos o con armas de cualquier tipo', denuncia: 'tipoViolencia5', valor: datosViolenciaDeGenero?.tipoViolencia5 },
    { label: 'Intención clara de causar lesiones graves o muy graves', denuncia: 'tipoViolencia6', valor: datosViolenciaDeGenero?.tipoViolencia6 },
    { label: 'Agresiones sexuales en la relación de pareja', denuncia: 'tipoViolencia7', valor: datosViolenciaDeGenero?.tipoViolencia7 },
  ];

  const perfilAgresor = [
    { label: 'Celos muy intensos o conductas controladoras sobre la pareja', denuncia: 'perfilAgresor1', valor: datosViolenciaDeGenero?.perfilAgresor1 },
    { label: 'Historial de conductas violentas con una pareja anterior', denuncia: 'perfilAgresor2', valor: datosViolenciaDeGenero?.perfilAgresor2 },
    { label: 'Historial de conductas violentas con otras personas (amigos, compañeros de trabajo, etc.)', denuncia: 'perfilAgresor3', valor: datosViolenciaDeGenero?.perfilAgresor3 },
    { label: 'Consumo abusivo de alcohol y/o drogas', denuncia: 'perfilAgresor4', valor: datosViolenciaDeGenero?.perfilAgresor4 },
    { label: 'Antecedentes de enfermedad mental con abandono de tratamientos psiquiátricos o psicológicos', denuncia: 'perfilAgresor5', valor: datosViolenciaDeGenero?.perfilAgresor5 },
    { label: 'Conductas de crueldad, de desprecio a la víctima y de falta de arrepentimiento', denuncia: 'perfilAgresor6', valor: datosViolenciaDeGenero?.perfilAgresor6 },
    { label: 'Justificación de las conductas violentas por su propio estado (alcohol, drogas, estrés) o por la provocación de la víctima', denuncia: 'perfilAgresor7', valor: datosViolenciaDeGenero?.perfilAgresor7 },
  ];

  const vulnerabilidades = [
    { label: 'Percepción de la víctima de peligro de muerte en el último mes', denuncia: 'vulnerabilidades1', valor: datosViolenciaDeGenero?.vulnerabilidades1 },
    { label: 'Intentos de retirar denuncias previas o de echarse atrás en la decisión de abandonar o denunciar al agresor', denuncia: 'vulnerabilidades2', valor: datosViolenciaDeGenero?.vulnerabilidades2 },
    { label: 'Vulnerabilidad de la víctima por razones de enfermedad, soledad o dependencia', denuncia: 'vulnerabilidades3', valor: datosViolenciaDeGenero?.vulnerabilidades3 },
    { label: 'Dependencia económica de la víctima del agresor', denuncia: 'vulnerabilidades4', valor: datosViolenciaDeGenero?.vulnerabilidades4 },
  ];

  const [selectedSituaciones, setSelectedSituaciones] = useState([]);
  const [selectedTipos, setSelectedTipos] = useState([]);
  const [selectedPerfil, setSelectedPerfil] = useState([]);
  const [selectedVulnerabilidades, setSelectedVulnerabilidades] = useState([]);
  const [riesgo, setRiesgo] = useState(0)

  const actualizarSeleccion = (opciones, valorActual, setter) => {
    const opcionesSeleccionadas = opciones.filter(opcion => opcion.valor === valorActual);
    setter(opcionesSeleccionadas);
  };

  return (
    <>
      <h2>
        Anexo Violencia de Género
        {riesgo < 4 ? (
          <Badge value="Riesgo Bajo" size="large" severity="info" className="m-2"></Badge>
        ) : riesgo < 10 ? (
          <Badge value="Riesgo medio" size="large" severity="warning" className="m-2"></Badge>
        ) : riesgo >= 10 ? (
          <Badge value="Riesgo Alto" size="large" severity="danger" className="m-2"></Badge>
        ) : null}
      </h2>

      <h3>Valoración Actual: {riesgo}</h3>

      <div className="border-1 border-400 p-4">
        <h4 className="underline">SITUACION DE LA RELACION EN PAREJA:</h4>
        <MultiSelect
          placeholder="Seleccione la situacion de la relacion en pareja"
          options={situaciones}
          onChange={(e) => {
            setSelectedSituaciones(e.value);
          }}
          value={selectedSituaciones}
          className="w-8"
        />
        <Divider />
        <h4 className="underline">TIPO DE VIOLENCIA: </h4>
        <MultiSelect
          placeholder="Seleccione tipos de violencia"
          options={tiposViolencia}
          onChange={(e) => {
            setSelectedTipos(e.value);
          }}
          value={selectedTipos}
          className="w-8"
        />
        <Divider />
        <h4 className="underline">PERFIL DEL AGRESOR: </h4>
        <MultiSelect
          placeholder="Seleccione el perfil del agresor"
          options={perfilAgresor}
          onChange={(e) => {
            setSelectedPerfil(e.value);
          }}
          value={selectedPerfil}
          className="w-8"
        />
        <Divider />
        <h4 className="underline">VULNERABILIDAD DE LA VICTIMA: </h4>
        <MultiSelect
          placeholder="Seleccione vulnerabilidades de la victima"
          options={vulnerabilidades}
          onChange={(e) => {
            setSelectedVulnerabilidades(e.value);
          }}
          value={selectedVulnerabilidades}
          className="w-8"
        />
        <Divider />
        <h4>Total Valoración:</h4>
        <InputNumber value={riesgo} disabled></InputNumber>
        <Button tooltip="Calcular y establecer nueva valoracion"
          icon="pi pi-calculator" 
          onClick={() => setRiesgo(selectedSituaciones.length + selectedTipos.length + selectedPerfil.length + selectedVulnerabilidades.length)}
        />
      </div>
    </>
  );
};
