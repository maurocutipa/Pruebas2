/* eslint-disable react/prop-types */
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { InvalidFieldMessage } from '@/components/common/InvalidFieldMessage';

export const Campos = ({ formik }) => {
  const { data } = useAppSelector((state) => state.data);
  const [competencias, setCompetencias] = useState([]);

  useEffect(() => {
    setCompetencias(
      data.competencias.filter(
        (c) =>
          c.idCompetencia !== 'No penal' &&
          c.idCompetencia !== 'Penal' &&
          c.idCompetencia !== 'Archivo'
      )
    );
  }, [data]);

  return (
    <section id='campos'>
      <h2>Seleccione los campos</h2>

      <div className='grid mt-4'>
        <div className='col-12 xl:col-4'>
          <label htmlFor='competencia'>Competencias:</label>
          <Dropdown
            id='competencia'
            name='competencia'
            options={competencias}
            optionLabel='competencia'
            optionValue='idCompetencia'
            placeholder='Seleccione'
            className={`w-full mt-2  ${
              formik.errors.competencia && formik.touched.competencia
                ? 'p-invalid'
                : null
            }`}
            onChange={formik.handleChange}
            value={formik.values.competencia}
            onBlur={formik.handleBlur}
          />
          <InvalidFieldMessage formik={formik} name='competencia' />
        </div>

        <div className='col-12 xl:col-4'>
          <label htmlFor='remision'>Remisión:</label>
          <Dropdown
            id='remision'
            name='remision'
            options={data.remisiones}
            optionLabel='remision'
            optionValue='idRemision'
            placeholder='Seleccione'
            className={`w-full mt-2  ${
              formik.errors.remision && formik.touched.remision
                ? 'p-invalid'
                : null
            }`}
            onChange={formik.handleChange}
            value={formik.values.remision}
            onBlur={formik.handleBlur}
          />

          <InvalidFieldMessage formik={formik} name='remision' />
        </div>
      </div>
    </section>
  );
};
