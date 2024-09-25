'use client'

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { fetchCategories } from '../features/cateogory/categoriesProviders';
import { FaChevronRight } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

function SubMenu() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const { categories, status, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleMouseEnter = (label) => {
    setOpenCategory(label);
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };

    const handleScrollOrWheel = () => {
      setIsSubMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('wheel', handleScrollOrWheel);
    document.addEventListener('scroll', handleScrollOrWheel);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('wheel', handleScrollOrWheel);
      document.removeEventListener('scroll', handleScrollOrWheel);
    };
  }, [dispatch, status]);

  if(status === 'loading') {
    return <Loader />
  }

  if (status === 'failed') {
    return <p>Error:{error}</p>
  }

  return (
    <div className={`flex flex-col items-end ${isSubMenuOpen ? 'bg-purple-800 dark:bg-[#f5f5f530]' : 'bg-transparent'}
      p-2 transition-all duration-500 ease-out`}
      ref={menuRef}
    >
      <button
        onClick={handleSubMenuToggle}
        className="flex items-center justify-center text-white font-bold rounded transition-all
        duration-500 ease-out hover:bg-purple-700 dark:text-slate-100 dark:hover:bg-transparent"
      >
       {isSubMenuOpen ? <FaTimes className='w-6 h-6'/> : <FaBars className='w-6 h-6' />}
      </button>

      <div className={`fixed top-[114px] left-0 h-[calc(100vh-116px)] bg-purple-800 dark:bg-[#292826] transition-transform duration-1000 ease-out ${isSubMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {isSubMenuOpen && (
          <ul className="bg-purple-800 dark:bg-[#292826] px-4 shadow-lg h-full">
            {categories.map(({name, subcategories, _id}) => (
              <li
                key={_id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(name)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="text-white hover:text-pink-500 dark:hover:text-cyan-500 font-semibold flex items-center justify-between w-full p-2 rounded transition-all duration-500 ease-out"
                >
                  {name}
                  <FaChevronRight className="ml-2" />
                </button>
                {openCategory === name && (
                  <ul className="absolute left-full top-0 w-48 bg-purple-800 dark:bg-[#292826] pl-4 p-2 rounded-r shadow-lg-r space-y-1">
                    {subcategories.map((subLink, index) => (
                      <li key={index}>
                        <Link
                          href={`/pages/products?categoryId=${_id}&subcategory=${subLink}`}
                          className="block p-2 text-white hover:text-pink-500 border-b-2 border-[#f5f5f550] hover:border-pink-500 dark:hover:border-cyan-400 dark:hover:text-cyan-500 transition-all duration-500 ease-out">
                          {subLink}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SubMenu;
