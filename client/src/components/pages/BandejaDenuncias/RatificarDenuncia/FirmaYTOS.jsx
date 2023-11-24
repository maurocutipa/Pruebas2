import { Card } from 'primereact/card';

export const FirmaYTOS = () => {
  return (
    <Card className='shadow-1 px-7 mt-6'>
      <h2>Términos y Condiciones</h2>

      <div className='mt-6'>
        <p className='mt-4'>
          1. El sistema digital de denuncias no tiene como objetivo la
          comunicación o informe de urgencias o emergencias, en ese caso debe
          utilizar como vía de contacto la línea telefónica 911 prevista a tal
          efecto.
        </p>

        <p className='mt-4'>
          2. Si ya han informado el hecho por otro canal formal de denuncia, no
          debe reportarlo nuevamente utilizando este sistema.
        </p>

        <p className='mt-4'>
          3. Para aquellos casos en que se proporcionen datos personales, los
          mismos deberán poseer la documentación respaldatoria.
        </p>

        <p className='mt-4'>
          4. Quien informe delitos lo hará con la responsabilidad que esto
          amerita y la certeza sobre la ocurrencia del mismo.
        </p>

        <p className='mt-4'>
          5. Se adoptarán todas las medidas técnicas de integridad y seguridad
          de los datos necesarias para garantizar la seguridad y
          confidencialidad de los datos personales, de modo de evitar su
          adulteración, pérdida, consulta o tratamiento no autorizado, y que
          permitan detectar desviaciones, intencionales o no, de información, ya
          sea que los riesgos provengan de la acción humana o del medio técnico
          utilizado.
        </p>

        <p className='mt-4'>
          6. La información suministrada no se almacena en el dispositivo móvil
          una vez que es enviada al servidor.
        </p>

        <p className='mt-4'>
          7. Acepto ser notificado de la denuncia y todo otro acto vinculado u
          originado a raíz de la misma al correo electrónico y/o via WhatsApp al
          número de teléfono proporcionado.
        </p>

        <p>
          <span className='font-bold'>Falsa denuncia:</span> Al realizar una
          denuncia, Usted debe saber que si la realiza falsamente -es decir,
          miente en lo que nos está informando-, está cometiendo un delito con
          penas de prisión de dos meses a un año o multa (artículo 245 del
          Código Penal).
        </p>

        <p className='font-bold font-italic mt-6'>
          NOTA: Se enviará una copia de la denuncia al correo electrónico o
          mensaje WhatsApp indicado.
        </p>
      </div>

      <div className='grid mt-8'>
        <div className='col-12 lg:col-6 text-center'>
          <div className='p-8' style={{ border: '1px solid black' }}>
            FIRMA DENUNCIANTE
          </div>
          <div className='mt-2'>
            <div className='font-bold'>Denunciante</div>
            <div className='mt-2'>Firma y D.N.I.</div>
          </div>
        </div>

        <div className='col-12 lg:col-6 text-center'>
          <div className='p-8' style={{ border: '1px solid black' }}>
            FIRMA FUNCIONARIO
          </div>

          <div className='mt-2'>
            <div className='font-bold'>Funcionario Interviniente</div>
            <div className='mt-2'>Firma y D.N.I.</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
