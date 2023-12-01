import { SelectButton } from "primereact/selectbutton"
import { useEffect } from "react";
import { useState } from "react"

export const AnexoDelitoPersonas = ({ datosDenunciaDelitoPersonas }) => {
    useEffect(() => {
      actualizarSeleccionSelectButton(setLesiones,datosDenunciaDelitoPersonas?.lesiones);
      actualizarSeleccionSelectButton(setHomicidio,datosDenunciaDelitoPersonas?.homicidio);
      actualizarSeleccionSelectButton(setFemicidio,datosDenunciaDelitoPersonas?.femicidio);
    }, [])
    
    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];

    const [lesiones, setLesiones] = useState();
    const [homicidio, setHomicidio] = useState();
    const [femicidio, setFemicidio] = useState();

    const actualizarSeleccionSelectButton = (setter, datos) => {
        setter(datos === 1 ?  1 : 0 );
    };

    return (
        <>
            <h2>Anexo denuncia delito contra las personas</h2>
            <div className="border-1 border-400 p-4">
                <div className="formgrid grid">
                    <div className='field col-12 lg:col'>
                        <div className='w-full'>
                            <span className='form-label'>¿Hubo Lesiones?</span>
                            <SelectButton value={lesiones} className='w-full w-10'
                                onChange={(e) => {
                                    setLesiones(e.target.value)
                                }}
                                options={siNo} optionLabel="name" optionValue="value"
                            />
                        </div>
                    </div>
                    <div className='field col-12 lg:col'>
                        <div className='w-full'>
                            <span className='form-label'>¿Hubo un Homicidio?</span>
                            <SelectButton value={homicidio} className='w-full w-10'
                                onChange={(e) => {
                                    if (e.target.value == 0) {
                                        setFemicidio(0)
                                    }
                                    setHomicidio(e.target.value)
                                }}
                                options={siNo} optionLabel="name"
                            />
                        </div>
                    </div>

                    {
                        homicidio == 1 &&
                        <div className='field col-12 lg:col'>
                            <div className='w-full'>
                                <span className='form-label'>¿Hubo un Femicidio?</span>
                                <SelectButton value={femicidio} className='w-full w-10'
                                    onChange={(e) => {
                                        setFemicidio(e.target.value)
                                    }}
                                    options={siNo} optionLabel="name"
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
