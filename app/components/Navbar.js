'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ModalCart from './ModalCart';
import { ThemeProvider } from './ThemeProvider';
import SubMenu from './SubMenu';
import { IoHome } from "react-icons/io5";
import SearchBar from './SearchBar';
import AuthModal from './AuthModal';
import AuthButtons from './AuthButtons';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTyoe, setModalType] = useState('login');

  const openModal = (type) =>{
    setModalType(type);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <nav className="w-full bg-purple-800 dark:bg-[#000000] flex flex-col items-center text-black dark:text-white">
      <section className='h-[50px] py-3 text-center w-full dark:bg-black dark:text-yellow-300 bg-pink-500 text-white font-openSands text-[17px] md:text-lg '>
        Envios gratis a partir de 100 USD.
      </section>
      <div className="px-4 py-3 w-full flex justify-between lg:px-5 items-center dark:bg-[#292826]">
        <SubMenu />
        <div className="md:hidden w-full flex justify-around items-center">
          <Image src="/assets/logo.svg" width={30} height={30} alt="logo" />
          <div className="flex justify-center items-center rounded text-white"
          >
            <Link href="/" >
              <IoHome className="h-6 w-6"/>
            </Link>
            <div className='mx-2'>
              <ModalCart />
            </div>
          <AuthButtons openModal={openModal} />
          <AuthModal
            isOpen={isModalOpen}
            onClose={closeModal}
            type={modalTyoe}
            />
          </div>
          <SearchBar />
        </div>

        <div className='hidden md:flex md:w-4/5 justify-center items-center'>
          <SearchBar />
          <AuthButtons openModal={openModal} />
          <AuthModal
            isOpen={isModalOpen}
            onClose={closeModal}
            type={modalTyoe}
            />
          <ModalCart />
        </div>

        <div className="hidden md:flex text-white text-xl font-bold">
          <Link href="/" className='hidden md:block flex text-lg font-poppins h-8 md:text-[26px]
            hover:dark:text-cyan-500'>
            <Image src="/assets/logo.svg" width={30} height={30} alt="logo" />
          </Link>
            <p>ade Shop.</p>
        </div>

      </div>

      <div className="fixed bottom-0 right-0 m-4">
        <div className="flex flex-col space-y-3">
          <ThemeProvider />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
