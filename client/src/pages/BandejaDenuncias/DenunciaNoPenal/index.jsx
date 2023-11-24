import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { useAppSelector } from '@/store/hooks';

export const DenunciaNoPenal = () => {
  const { data } = useAppSelector((state) => state.data);
  const [competencias, setCompetencias] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setCompetencias(
      data.competencias.filter(
        (c) =>
          c.idCompetencia !== 1 &&
          c.idCompetencia !== 2 &&
          c.idCompetencia !== 7
      )
    );
  }, [data]);

  return (
    <div className='px-8 py-4'>
      <h1 className='text-center'>Trámite de denuncia no penal - N° {id}</h1>

      <div className='mt-6'>
        <Button
          icon='pi pi-angle-left'
          label='Regresar a la bandeja'
          className='text-lightblue-mpa p-0 mb-4'
          type='button'
          link
          onClick={() => navigate('/bandeja-denuncias')}
        />

        <Card className='shadow-1 px-7'>
          <section id='campos'>
            <h2>Selecciones los campos adecuados</h2>

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
                  className={`w-full mt-2 `}
                  // onChange={formik.handleChange}
                  // value={formik.values.denunciado}
                  // onBlur={formik.handleBlur}
                />
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
                  className={`w-full mt-2 `}
                  // onChange={formik.handleChange}
                  // value={formik.values.denunciado}
                  // onBlur={formik.handleBlur}
                />
              </div>
            </div>
          </section>

          <Divider className='my-6' />

          <section id='notificaciones'>
            <h2>Notificaciones</h2>
            <div className=''></div>
          </section>
        </Card>

        <Card className='shadow-1 px-7 mt-6'>
          <div className=''>
            <h2>Redacción del mail</h2>

            <div className='grid mt-6'>
              <div className='col-12 lg:col-5'>
                <label htmlFor='asunto'>Asunto</label>
                <InputText id='asunto' name='asuntos' className='w-full mt-2' />
              </div>
            </div>

            <div className='grid mt-4'>
              <div className='col-12'>
                <label htmlFor='observaciones'>Observaciones</label>
                <InputTextarea
                  id='observaciones'
                  name='observaciones'
                  className={`w-full mt-2 `}
                  rows={8}
                  autoResize='none'
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.descripcion}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className='flex justify-content-between mt-6 mb-2'>
        <Button
          icon='pi pi-angle-left'
          label={'Cancelar'}
          onClick={() => navigate('/bandeja-denuncias')}
          className='bg-red-700 hover:bg-red-800 border-red-700'
          size='large'
        />

        <Button label={'Guardar'} className='btn-blue-mpa' size='large' />
      </div>
    </div>
  );
};
