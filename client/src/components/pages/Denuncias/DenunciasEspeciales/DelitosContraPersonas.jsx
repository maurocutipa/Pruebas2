import { useState, useEffect, memo } from 'react';
import { useRoboHurtoContext, useDelitosContraPersonasContext } from '../../../../pages/Denuncia/Denuncia.jsx';
import { SelectButton } from 'primereact/selectbutton';
import { useFormik } from 'formik';

//export default function DelitosContraPersonas() {

export const DelitosContraPersonas = memo(({ }) => {
    const siNo = [{ name: 'Si', value: 1 }, { name: 'No', value: 0 }];
    const form = useFormik({
        initialValues: {
            lesiones: 0,
            homicidio: 0,
            femicidio: 0,
        },
        validate: (data) => {
            let errors = {};
            // if (data.homicidio == 0) {
            //     form.values.femicidio = 0;
            // }
            return errors;
        },
    });

    const { lesiones, homicidio, femicidio, setLesiones, setHomicidio, setFemicidio } = useDelitosContraPersonasContext();

    return (
        <>
            <div className='grid'>
                <div className='field col-12 lg:col'>
                    <div className='w-full'>
                        <span className='form-label'>Hubo Lesiones?</span>
                        <SelectButton value={lesiones} className='w-full w-10'
                            onChange={(e) => {
                                setLesiones(e.target.value)
                            }}
                            options={siNo} unselectable={false} optionLabel="name"
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                    </div>
                </div>


                <div className='field col-12 lg:col'>
                    <div className='w-full'>
                        <span className='form-label'>Hubo un Homicidio?</span>
                        <SelectButton value={homicidio} className='w-full w-10'
                            onChange={(e) => {
                                if (e.target.value == 0) {
                                    setFemicidio(0)
                                }
                                setHomicidio(e.target.value)
                            }}
                            options={siNo} unselectable={false} optionLabel="name"
                            pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                    </div>
                </div>

                {homicidio == 1 &&
                    <div className='field col-12 lg:col'>
                        <div className='w-full'>
                            <span className='form-label'>Hubo un Femicidio?</span>
                            <SelectButton value={femicidio} className='w-full w-10'
                                onChange={(e) => {
                                    setFemicidio(e.target.value)
                                }}
                                options={siNo} unselectable={false} optionLabel="name"
                                pt={{ button: ({ context }) => ({ className: context.selected ? 'btn-blue-mpa' : undefined, }), }} />
                        </div>
                    </div>}
            </div>
        </>
    )
})