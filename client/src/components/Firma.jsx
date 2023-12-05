import React from 'react'
import { FirmaPad2 } from './common/FirmaPad2';
import { Card } from 'primereact/card';
import { useDenunciaContext } from '../pages/Denuncia/Denuncia';

export const Firma = () => {

  const { firmasDenunciantes, firmaFuncionario, setFirmaFuncionario } = useDenunciaContext();

  return (
    <Card className='shadow-1 px-7 mt-6'>
      <div className='grid mt-8'>
        {
          firmasDenunciantes.map(
            (firmaDenunciante) => (
              <div key={firmaDenunciante.id} className='col-12 lg:col-6 text-center'>
                <div className='w-12' style={{ border: '1px solid black', height: '300px' }}>
                  <img
                    src={firmaDenunciante.image}
                    alt='FIRMA DENUNCIANTE | DEBE CARGAR LA FIRMA'
                    style={{ height: '290px', width: '99%' }}
                  />
                </div>
                <div className='mt-2'>
                  <div className='font-bold'>Denunciante</div>
                  <div className='mt-2'>Firma y D.N.I.</div>

                  {/* <FirmaPad
                type='denunciante'
                signatureRef={null}
                disabled={false}
              /> */}

                  <FirmaPad2
                    type='denunciante'
                    index={firmaDenunciante.id}
                    // handleSetFirmaDenunciante={()=> setFirmaDenunciante(firmaDenunciante.id)}
                  />
                </div>
              </div>
            )
          )
        }

        <div className='col-12 lg:col-6 text-center'>
          <div
            className='w-12'
            style={{ border: '1px solid black', height: '300px' }}
          >
            <img
              src={firmaFuncionario}
              alt='FIRMA FUNCIONARIO | DEBE CARGAR LA FIRMA'
              style={{ height: '290px', width: '99%' }}
            />
          </div>

          <div className='mt-2'>
            <div className='font-bold'>Funcionario Interviniente</div>
            <div className='mt-2'>Firma y D.N.I.</div>

            <FirmaPad2
              type='funcionario'
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
