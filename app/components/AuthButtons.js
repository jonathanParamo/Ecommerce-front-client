import { FaSignInAlt, FaUserPlus, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AuthButtons = ({ openModal }) => {
  const  { user }  = useSelector((state) => state.user);

  return (
    <div className="flex font-roboto md:mx-3">
      {user && user.name ? (
        <div className="flex items-center text-white">
          <span className="text-lg font-semibold ">
            Hola, {user.name}!
          </span>
        </div>
      ) : (
        <>
          <button
            onClick={() => openModal('login')}
            className="text-white flex items-center rounded mx-1"
          >
            <FaSignInAlt className="h-6 w-6 mx-1" />
            <span className='hidden md:flex'>Iniciar sesión</span>
          </button>

          <button
            onClick={() => openModal('register')}
            className="text-white flex items-center rounded mx-1"
          >
            <FaUserPlus className="w-6 h-6 mx-1" />
            <span className='hidden md:flex'>Registrarse</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
