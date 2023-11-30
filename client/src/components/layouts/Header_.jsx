import './header.css';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getDenunciaDataThunk,
  getDelitosThunk,
} from '@/store/data/data.thunks';
import { logoutThunk } from '@/store/auth/auth.thunks';
import { useEffect, useRef } from 'react';

const Header_ = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const profileButton = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDenunciaDataThunk());
    dispatch(getDelitosThunk());
    console.log('LLAMADA A LA API');
  }, [dispatch]);

  const items = [
    {
      template: () => {
        return (
          <Link to={'/bandeja-denuncias'}>
            <Button
              className='link'
              label='Bandeja de denuncias'
              icon='pi pi-inbox'
              iconPos='left'
            />
          </Link>
        );
      },
    },

    {
      template: () => {
        return (
          <Link to={'/denuncias'}>
            <Button
              className='link'
              label='Denuncias'
              icon='pi pi-inbox'
              iconPos='left'
            />
          </Link>
        );
      },
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
    </>
  );

  const itemsMenu = [
    {
      template: (_item, options) => {
        return (
          <button
            onClick={(e) => options.onClick(e)}
            className={
              'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround'
            }
          >
            <Avatar
              image='https://i.scdn.co/image/ab6761610000e5ebd5b18200f4504f7b38a06a09'
              className='mr-2'
              shape='circle'
            />
            <div className='flex flex-column'>
              {/* <span className='font-bold'>{usuario?.toUpperCase()}</span> */}
              <div className='text-sm font-bold'>
                {user?.username.toUpperCase()}
              </div>
            </div>
          </button>
        );
      },
    },
    { separator: true },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-power-off',
      command: () => {
        dispatch(logoutThunk());
        navigate('/login');
      },
    },
  ];

  const end = (
    <>
      <Menu
        model={itemsMenu}
        popup
        ref={profileButton}
        pt={{ icon: { className: 'text-gray-800 font-bold' } }}
      />
      <Button
        icon='pi pi-user'
        rounded
        className='link'
        aria-label='User'
        onClick={(e) => profileButton.current.toggle(e)}
      />
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
          end={end}
          model={items}
        />
      </header>
      <Outlet />
    </>
  );
};

export default Header_;
