import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export const TableTemplate = ({
  personas,
  editorTemplate,
  verMasTemplate,
  tipo = '',
}) => {
  let mensajeVacio =
    tipo == 'denunciante'
      ? 'No se encontraron denunciantes.'
      : tipo == 'denunciado'
        ? 'No se encontraron denunciados.'
        : 'No se encontraron testigos.';


  const calidadBody = (e) => {
    var text = ''
    switch (e.idIntervinienteTipo) {
      case 1:
        text = "Victima"
        break;
      case 2:
        text = "Denunciante"
        break;
      case 3:
        text = "Victima/Denunciante"
        break;
      case 4:
        text = "Denunciado"
        break;
      case 9:
        text = "Testigo"
        break;
    }
    return (
      text
    )
  }

  return (
    <DataTable
      value={personas}
      paginator
      showGridlines
      rows={10}
      dataKey='id'
      emptyMessage={mensajeVacio}
      className='shadow-3'
    >
      <Column
        header='Acciones'
        body={editorTemplate}
        headerStyle={{ width: '4rem' }}
        bodyStyle={{ textAlign: 'center' }}
      />
      <Column
        field='tipoPersona'
        header='Tipo Persona'
        style={{ maxWidth: '5rem', display: tipo != 'denunciado' && 'none' }}
      />
      <Column
        field='nombre'
        header='Nombre'
        style={{ minWidth: '12rem' }}
      />
      <Column
        field='apellido'
        header='Apellido'
        style={{ minWidth: '12rem' }}
      />
      <Column
        field='tipoIdentificacion'
        header='Tipo Documento'
        style={{ maxWidth: '9rem' }}
      />
      <Column
        field='numeroIdentificacion'
        header='Nº Documento'
        style={{ maxWidth: '7rem' }}
      />
      <Column
        body={e=> calidadBody(e)}
        field='calidad'
        header='Calidad'
        style={{ maxWidth: '15rem', display: tipo != 'denunciante' && 'none' }}
      />
      <Column
        field='informacionAdicional'
        header='Informacion Adicional'
        style={{
          maxWidth: '15rem', overflowWrap: "break-word",
          display: tipo != 'denunciado' && tipo != 'testigo' && 'none',
        }}
        bodyStyle={{ lineBreak: 'auto' }}
      />
      <Column
        header='Ver Más'
        body={verMasTemplate}
        headerStyle={{ width: '3rem', maxWidth: '6.5rem' }}
        bodyStyle={{ textAlign: 'center' }}
      />
    </DataTable>
  );
};
