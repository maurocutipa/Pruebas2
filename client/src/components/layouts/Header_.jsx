import './header.css';

import { Link, Outlet } from 'react-router-dom';

import { Menubar } from 'primereact/menubar';

const Header_ = () => {
  const items = [
    {
      style: 'color: white',
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      url: '/bandeja-denuncias',
    },
  ];

  const start = (
    <Link to={'/'}>
      <img
        alt='logo'
        src='https://mpajujuy.gob.ar/images/imgTitle.png'
        height='40'
        className='mr-5'
      />
    </Link>
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
          model={items}
          start={start}
        />
      </header>
      <Outlet></Outlet>
    </>
  );
};

export default Header_;
