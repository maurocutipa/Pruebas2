import { Card } from 'primereact/card';
import { useAppSelector } from '@/store/hooks';


export const HeaderLegajo = () => {

  const { currentLegajo } = useAppSelector((state) => state.legajos);

  return (
    <div className='flex mt-4 formgrid gap-3'>
      <Card style={{backgroundColor: '#c9f1fd'}} className='field col-4'>
          <h3>{currentLegajo?.letra}-{currentLegajo?.nroExp}-MPA</h3>
      </Card>
      <Card className='field col h-6rem'>
          <h3>Pendientes</h3>
      </Card>
      <Card className='field col'>
          <h3>Pendientes</h3>
      </Card>
      <Card className='field col'>
          <h3>Pendientes</h3>
      </Card>
      <Card className='field col'>
          <h3>Pendientes</h3>
      </Card>
    </div>
  )
}
