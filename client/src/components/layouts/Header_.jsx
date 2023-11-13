import './header.css';

import { Link, Outlet } from 'react-router-dom';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

const Header_ = () => {
  const items = [
    {
      style: 'color: white',
      label: 'Bandeja de denuncias',
      icon: 'pi pi-fw pi-home',
      url: '/bandeja-denuncias',
    },
    {
      style: 'color: white',
      label: 'Bandeja de pases',
      icon: 'pi pi-fw pi-home',
      url: '/bandeja-pase-denuncias',
    },
  ];

  const start = (
    <>
      <Link to={'/'}>
        <img
          alt='logo'
          src='https://mpajujuy.gob.ar/images/imgTitle.png'
          height='40'
          className='mr-5'
        />
      </Link>

      {items.map((item) => (
        <Link to={item.url} key={item.url}>
          <Button label={item.label} severity='info' />
        </Link>
      ))}
    </>
  );

  return (
    <>
      <header>
        <Menubar
          style={{
            backgroundColor: '#051041',
            border: '0px',
            borderRadius: '0px',
            padding: '30px',
          }}
          start={start}
        />
      </header>
      <Outlet></Outlet>
    </>
  );
};

export default Header_;
