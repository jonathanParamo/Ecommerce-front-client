'use client'

import { useState } from "react";
import { toast } from 'react-toastify';
import { loginUser, registerUser } from "../features/user/userProviders";
import { useDispatch } from "react-redux";

const AuthModal = ({ isOpen, onClose, type }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cedula, setCedula] = useState('');
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const isLogin = type === 'login';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Todos los campos son requeridos');
      return;
    }
    dispatch(loginUser({ email, password }));
    onClose();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !surname || !password || !confirmPassword || !cedula) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    const userData = { email, name, surname, password, cedula };
    dispatch(registerUser(userData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#191919] p-6 rounded-lg shadow-lg w-4/5 md:w-2/5 h-4/5">
        <h2 className="text-2xl font-semibold font-roboto mb-4 text-center text-black dark:text-white">
          {isLogin ? 'Iniciar sesión' : 'Registrarse'}
        </h2>

        {isLogin && (
          <form >
            <input className="mt-24 w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-purple-800 text-white p-2 rounded font-nunito"
              onClick={(e) => handleLoginSubmit(e)}
            >
              Iniciar sesión
            </button>
          </form>
        )}

        {!isLogin && (
          <form>
            <input className="w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full mb-2 p-2 border-2 rounded bg-transparent
                outline-none text-black dark:text-white border-purple-800 focus-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input className="w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input className="w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="text"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input className="w-full mb-2 p-2 border-2 rounded bg-transparent
              outline-none text-black dark:text-white border-purple-800 focus-none"
              type="number"
              placeholder="No. Cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <button
              className="w-full bg-purple-800 text-white p-2 rounded"
              onClick={(e) => handleRegisterSubmit(e)}
            >
              Registrarse
            </button>
          </form>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="text-black dark:text-white font-roboto hover:text-red-500">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
