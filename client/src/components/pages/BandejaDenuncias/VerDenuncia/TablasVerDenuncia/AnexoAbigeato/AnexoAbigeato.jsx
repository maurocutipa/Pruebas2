import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react"
import { AnimalesDetalles } from "../AnimalesDetalles/AnimalesDetalles";

export const AnexoAbigeato = ({datosAnexoAbigeato}) => {

  const { datosGeneralesDenunciaAbigeato, detallesDenunciaAbigeato } = datosAnexoAbigeato; 


  useEffect(() => {
    actualizarDropdown(setViolenciaFisica,datosGeneralesDenunciaAbigeato.violenciaFisica);

  }, [])

  const siNo = [
    { label: 'SI', code: 1 },
    { label: 'NO', code: 0 }
  ];

  /* violencia fisica dropdown sino */
  const [violenciaFisica, setViolenciaFisica] = useState({});
  
  const actualizarDropdown = (setter, datos) => {
    setter(datos);
  };
  return (
    <>
      <h2>Anexo Abigeato</h2>
      <div className="border-1 border-400 p-4">
        <div className="field col-12 ">
          <label htmlFor="violenciaFisica">¿Existió violencia física o daños materiales?</label>
          <Dropdown
            id="violenciaFisica"
            value={violenciaFisica}
            options={siNo}
            optionValue='code'
            placeholder="Seleccione"
            onChange={(e) => {
              setViolenciaFisica(e.value);
            }}
            className="w-full"
          />
          <h3 className='text-lightblue-mpa'>Datos de los animales sustraídos</h3>
          {/* tablas de animales */}
          <AnimalesDetalles animales={detallesDenunciaAbigeato}/>
        </div>
      </div>
    </>
  )
}
