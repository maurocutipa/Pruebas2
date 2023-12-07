import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate, useParams } from 'react-router-dom';

export const Art321 = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const goToLegajo = () => {
    navigate(`/legajo/${id}`);
  };

  return (
    <>
      <div className='px-8 py-4'>
        <h1 className='text-center'>
          Certificación Artículo 321 CPP - Legajo N° {id}
        </h1>

        <div className='mt-6'>
          <Button
            icon='pi pi-angle-left'
            label='Regresar al legajo'
            className='text-lightblue-mpa p-0 mb-4'
            type='button'
            link
            onClick={goToLegajo}
          />
        </div>

        <Card className='shadow-1 px-7'>
          <div className='text-right'>
            <p className='text-xl'>
              <strong>Fecha: </strong>10/10/2002
            </p>
            <p className='text-xl'>
              <strong>N° de LEGAJO: </strong>S-22-MPA
            </p>
          </div>

          <div className=''>
            <h2 className='mt-6'>Datos del Imputado:</h2>
            <div className='grid mt-5'>
              <div className='col-12 md:col-4'>
                <label htmlFor='imputado'>
                  Seleccion el imputado para cargar los datos
                </label>
                <Dropdown
                  id='imputado'
                  name='imputado'
                  className='w-full mt-2'
                  placeholder='Seleccione'
                />
              </div>
            </div>
          </div>

          <div className=''>
            <p className='text-2xl'>
              <strong>Nombre: </strong>Mauro
            </p>

            <p className='text-2xl'>
              <strong>Apellido: </strong>Mamani
            </p>

            <p className='text-2xl'>
              <strong>DNI: </strong>44514773
            </p>

            <p className='text-2xl'>
              <strong>Teléfono: </strong>388494012
            </p>
          </div>
        </Card>

        <Card className='shadow-1 px-7 mt-6'>
          <h2 className='mt-6'>Descripción de los Hechos:</h2>

          <section className='mt-6' id='investigacionPenal'>
            <h3 className='mb-4'>Investigaciones Penales en Trámite: SI/NO</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron investigaciones penales en trámite'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: '50rem' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo / N° de Expediente'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='fiscalia'
                header='Fiscalía'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='delito'
                header='Delitos/s'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='fechaCausa'
                header='Fecha de Causa'
                pt={{ headerCell: { className: 'w-2' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='medidaCoercion'>
            <h3 className='mb-4'>Medidas de Coerción</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron medidas de coerción'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: '50rem' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='tipoMedida'
                header='Tipo de medida'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='vigente'
                header='Vigente'
                pt={{ headerCell: { className: 'w-4' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='suspensionJuicio'>
            <h3 className='mb-4'>Suspensión de Juicio a prueba: SI/NO</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron suspensiones de juicio a prueba'
              className='mb-4 shadow-1 w-4'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column field='nroLegajo' header='N° de Legajo' />
            </DataTable>
          </section>

          <section className='mt-8' id='declaracionRebeldia'>
            <h3 className='mb-4'>Declaración de Rebeldía: SI/NO</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron declaraciones de rebeldía'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='vigencia'
                header='Vigencia'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='fechaRebeldia'
                header='Fecha de Rebeldía'
                pt={{ headerCell: { className: 'w-4' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='juiciosPenalesTramites'>
            <h3 className='mb-4'>
              Juicios Penales en Trámites (Requerimiento de citación a juicio
              firmes / debates en trámite):
            </h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron juicios penales'
              className='mb-4 shadow-1 w-8'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo / N° de Expediente'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='tribunalInterviniente'
                header='Tribunal Interviniente'
                pt={{ headerCell: { className: 'w-4' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='detencionConcedidos'>
            <h3 className='mb-4'>Ceses de detención concedidos:</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron ceses de detención concedidos'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='fiscalia'
                header='Fiscalía'
                pt={{ headerCell: { className: 'w-4' } }}
              />

              <Column
                field='fechaCese'
                header='Fecha de Cese de Det.'
                pt={{ headerCell: { className: 'w-4' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='condenas'>
            <h3 className='mb-4'>Condenas:</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron condenas'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo / N° de Expediente'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='fiscalia'
                header='Fiscalía'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='tribunalInterviniente'
                header='Triunal Interviniente'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='fechaSentencia'
                header='Fecha de Sentencia'
                pt={{ headerCell: { className: 'w-3' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='libertadesCondicionales'>
            <h3 className='mb-4'>
              Libertades condicionales/Salidas transitorias concedidas:
            </h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron libertades condicionales'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo / N° de Expediente'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='fiscalia'
                header='Fiscalía'
                pt={{ headerCell: { className: 'w-2' } }}
              />

              <Column
                field='tribunalInterviniente'
                header='Triunal Interviniente'
                pt={{ headerCell: { className: 'w-2' } }}
              />

              <Column
                field='fechaOtorgamiento'
                header='Fecha de Otorgamiento'
                pt={{ headerCell: { className: 'w-2' } }}
              />

              <Column
                field='tiempoRestanteCondena'
                header='Tiempo restante de condena'
                pt={{ headerCell: { className: 'w-3' } }}
              />
            </DataTable>
          </section>

          <section className='mt-8' id='reincidenciaDelictiva'>
            <h3 className='mb-4'>Reincidencias Delictivas:</h3>
            <DataTable
              value={[]}
              paginator
              rows={5}
              totalRecords={[].length}
              emptyMessage='No se encontraron reincidencias delictivas'
              className='mb-4 shadow-1'
              tableStyle={{ minWidth: 'w-4' }}
              dataKey='id'
            >
              <Column
                field='nroLegajo'
                header='N° de Legajo / N° de Expediente'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='fiscalia'
                header='Fiscalía'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='delito'
                header='Delito/s'
                pt={{ headerCell: { className: 'w-3' } }}
              />

              <Column
                field='estado'
                header='Estado'
                pt={{ headerCell: { className: 'w-3' } }}
              />
            </DataTable>
          </section>
        </Card>

        <div className='flex justify-content-between mt-6 mb-2'>
          <Button
            icon='pi pi-angle-left'
            label={'Cancelar'}
            className='bg-red-700 hover:bg-red-800 border-red-700'
            size='large'
          />

          <Button
            label={'Guardar Certificación'}
            className='btn-blue-mpa'
            size='large'
            type='submit'
          />
        </div>
      </div>
    </>
  );
};
