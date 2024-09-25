"use client"

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/pages/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSearchBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Barra de búsqueda para pantallas grandes */}
      <div className="hidden md:flex w-3/5 h-[32px] flex items-center justify-center bg-white rounded-full border border-gray-300">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-3 pl-4 rounded-full border-none outline-none font-roboto
          focus:outline-none focus:ring-0 transition-all bg-transparent text-purple-800 dark:text-black"
        />
        <button
          onClick={(e) => handleSearch(e)}
          className="px-3 text-purple-800 hover:text-purple-700 dark:text-gray-900 dark:hover:text-gray-200"
        >
          <FaSearch className="h-6 w-6" />
        </button>
      </div>

      {/* Barra de búsqueda para pantallas móviles */}
      <div className="md:hidden relative">
        {!isOpen && (
          <button
            onClick={toggleSearchBar}
            className="p-2 text-white rounded-full focus:outline-none"
          >
            <FaSearch className="h-5 w-5" />
          </button>
        )}

        <div
          className={`fixed top-[52px] left-0 right-0 h-16 bg-purple-800 dark:bg-black flex items-center justify-center
            transition-transform duration-700 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-full`}
        >
          <div
            className={`w-2/3 h-10 max-w-full bg-white rounded-full flex items-center shadow-md border
              border-gray-300 dark:border-gray-700 p-2 transition-transform duration-700 ease-in-out ${isOpen ? "scale-100" : "scale-95"}`}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-full pl-4 pr-8 bg-transparent text-purple-800 dark:text-black outline-none
              transition-transform duration-700 ease-out font-roboto"
            />
            <button
              onClick={(e) => handleSearch(e)}
              className="p-2 text-purple-800 hover:text-purple-700 dark:text-gray-900 dark:hover:text-gray-200"
            >
              <FaSearch className="h-6 w-6" />
            </button>
          </div>
            <button
              onClick={toggleSearchBar}
              className="p-2 text-red-500 hover:text-purple-700 dark:text-gray-900 dark:hover:text-gray-200"
            >
              <IoClose className="h-6 w-6" />
            </button>
        </div>
      </div>

    </>
  );
}

export default SearchBar;
