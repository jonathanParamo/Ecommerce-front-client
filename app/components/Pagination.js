'use client';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="w-full flex justify-center items-center m-x-6 my-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`w-1/3 md:w-40 px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-400"
        }`}
      >
        Previous
      </button>

      <span className="text-gray-700 dark:text-white">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`w-1/3 md:w-40 px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 ${
          currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-gray-400"
        }`}
      >
        Next
      </button>
    </div>
);

export default Pagination;
