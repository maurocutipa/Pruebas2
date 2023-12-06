import React, { useState } from 'react'
import { FirmaPad2 } from './common/FirmaPad2';
import { Card } from 'primereact/card';
import { useDenunciaContext } from '../pages/Denuncia/Denuncia';

export const Firma = () => {

  const { firmasDenunciantes, firmaFuncionario } = useDenunciaContext();
  //se modifica el estado de firmasDenunciantes en el form de denunciantes, cuando se pasa al siguiente paso

  const whiteImage = 'src/assets/img/whiteImage.png';

  return (
    <Card className='shadow-1 px-7 mt-6'>
      <div className='grid mt-8'>
        {
          firmasDenunciantes.map(
            (firmaDenunciante) => (
              <div key={firmaDenunciante.id} className='col-12 lg:col-6 text-center'>
                <img style={{ maxWidth: '100%', height: 'auto', border: '1px solid black' }}
                  src={firmaDenunciante.image ? firmaDenunciante.image : whiteImage}
                  alt='FIRMA DENUNCIANTE | DEBE CARGAR LA FIRMA'
                />
                <div className='mt-2'>
                  <div className='font-bold'>Denunciante</div>
                  <div className='mt-2'>Firma y D.N.I.</div>

                  <FirmaPad2
                    type='denunciante'
                    index={firmaDenunciante.id}
                  />
                </div>
              </div>
            )
          )
        }

        <div className='col-12 lg:col-6 text-center'>
          <img
            src={firmaFuncionario ? firmaFuncionario : whiteImage}
            alt='FIRMA FUNCIONARIO | DEBE CARGAR LA FIRMA'
            style={{ maxWidth: '100%', height: 'auto', width: '99%', border: '1px solid black' }}
          />

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
