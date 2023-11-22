import { LoginForm } from './LoginForm';

export const Contenedor = () => {
  return (
    <>
      <div className='h-screen flex align-items-center justify-content-center'>
        <div className='surface-card p-4 shadow-2 border-round w-10 md:w-8 lg:w-6 xl:w-4'>
          <div className='grid'>
            <div className='col-12'>
              <div className='p-3 border-round-sm font-bold'>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
