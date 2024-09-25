import { FaCartPlus } from "react-icons/fa";

export default function ListProducts({ products, handleAddToCart }) {
  return (
    <ul className="px-2 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {products.map((product) => (
        <li
          key={product._id}
          className="w-full p-2 bg-white dark:bg-[#141414] rounded-lg shadow-md overflow-hidden flex flex-col items-center"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-44 object-cover p-2"
          />
          <div className="w-full">
            <h2 className="text-lg font-roboto text-gray-800 dark:text-white mb-1 truncate">
              {product.name}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 truncate">
              {product.description}
            </p>
            <div className="w-full flex justify-between items-end">
              {product.discountedPrice ? (
                <div className="flex w-full justify-around items-center">
                  <p className="text-[18px] items-end font-roboto text-end text-black dark:text-white">
                    ${product.discountedPrice}
                  </p>
                  <p className="text-sm text-black dark:text-[#f5f5f590] line-through">
                    ${product.priceCOP}
                  </p>
                </div>
              ) : (
                <p className="text-md font-bold text-gray-800 dark:text-gray-200">
                  ${product.priceCOP}
                </p>
              )}
            </div>

            <div className="w-full flex justify-between text-black dark:text-white items-end mt-2">
              {product.discount.value !== 0 ? `descuento ${product.discount.value} %`  : "Sin descuento" }
              <button
                onClick={() => handleAddToCart(product)} // Asegúrate de que se llame la función correcta
                className="p-2 border-2 border-violet-500 dark:border-blue-500 text-violet-500 dark:text-blue-400 rounded-full transition-all duration-300 ease-in-out hover:bg-border-600 dark:hover:border-blue-600 hover:scale-105"
              >
                <FaCartPlus className="h-3 w-3 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
