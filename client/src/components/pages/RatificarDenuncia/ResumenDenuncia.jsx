import { Card } from 'primereact/card';

export const ResumenDenuncia = () => {
  return (
    <Card className='shadow-1 px-7 mt-6'>
      <h2>Resumen de la Denuncia</h2>

      <div className='mt-6'>
        <h3>Datos Generales</h3>

        <p className=''>Fecha</p>
        <p className=''>Tipo</p>
      </div>

      <div className='mt-6'>
        <h3>Datos del Denunciante</h3>

        <p className=''>Apellido</p>
        <p className=''>Nombre</p>
        <p className=''>Tipo de documento</p>
        <p className=''>Número de documento</p>
        <p className=''>Fecha de nacimiento</p>
        <p className=''>Género</p>
      </div>

      <div className='mt-6'>
        <h3>Datos de Contacto</h3>

        <p className=''>Prefijo y teléfono</p>
        <p className=''>Correo electrónico</p>
      </div>

      <div className='mt-6'>
        <h3>Datos del Hecho </h3>

        <p className=''>Fecha y hora del hecho</p>
        <p className=''>Partido</p>
        <p className=''>Localidad/barrio</p>
        <p className=''>Calle</p>
        <p className=''>Esquina mas cercana</p>
        <p className=''>Número</p>
        <p className=''>Detalle de la ubicación</p>
        <p className=''>Lugar del hecho</p>
      </div>

      <div className='mt-6'>
        <h3>Datos de los Involucrados</h3>

        <p className=''>Relación del denunciante con la víctima</p>
        <p className=''>¿La victima tiene alguna discapacidad?</p>
        <p className=''>Relación del agresor con la víctima</p>
        <p className=''>Apellido del agresor</p>
        <p className=''>Nombre del agresor</p>
        <p className=''>Género del agresor</p>
        <p className=''>Información del agresor</p>
      </div>

      <div className='mt-6'>
        <h3>Adjuntos/Evidencias</h3>

        <p className=''>Descripción de la evidencia</p>
        <p className=''>Archivos cargados</p>
      </div>
    </Card>
  );
};
