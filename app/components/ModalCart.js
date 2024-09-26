'use client'

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa6";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cart/cartProvider";
import { CiCirclePlus, CiCircleRemove, CiCircleMinus } from "react-icons/ci";
import Image from "next/image";

const ModalCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_URL_SERVER || 'http://localhost:4000/api/v1/';

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleCheckout = async () => {
    try {
      const products = cart.map(({ _id, name, priceCOP, quantity, discountedPrice }) => ({
        productId: _id,
        name,
        price: discountedPrice ? discountedPrice : priceCOP,
        quantity,
      }));

      const response = await fetch(`${API_URL}orders/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products,
          userId: user._id,
          cedula: user.cedula,
        }),
        credentials: 'include',
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const hasData = cart.length > 0;

  const total = cart.reduce((accumulator, product) =>
    accumulator + (product.discountedPrice || product.priceCOP) * product.quantity,
    0
  );

  return (
    <div>
      {modalIsOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-4 rounded bg-[#f5f5f5] shadow-lg z-50 w-10/12 md:w-2/3">
            <h1 className="w-full h-6 font-roboto text-center font-semibold text-base md:text-xl text-black mb-4">Sus productos:</h1>
            {hasData ? (
              <section>
                <div className="relative max-h-[500px] overflow-y-auto overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cart.map(({ _id, name, images, priceCOP, quantity, discountedPrice }) => (
                      <div key={_id} className="flex items-center space-x-4 mb-4">
                        <Image
                          src={images[0]}
                          alt={name}
                          width={100}
                          height={150}
                          layout="responsive"
                          className="w-8 h-12 md:w-20 md:h-20 rounded"
                        />
                        <div>
                          <p className="w-44 md:w-48 text-sm font-roboto md:text-lg text-black font-semibold truncate">{name}</p>
                          <div className="flex items-center">
                            <p className="text-xs md:text-md text-gray-600 pr-1 overflow-auto overflow-hidden truncate">Price por unidad:</p>
                            <p className="text-purple-800 dark:text-cyan-800">${discountedPrice ? discountedPrice : priceCOP}</p>
                          </div>
                          <p className="text-sm font-semibold md:text-md text-gray-600">Total: ${discountedPrice ? discountedPrice * quantity : priceCOP * quantity}</p>
                          <div className="w-full mt-2 flex items-center justify-between border border-blue-950
                            rounded-full p-1 bg-blue-50">
                            <button
                              onClick={() => handleDecreaseQuantity(_id)}
                              className="flex items-center justify-center disabled:opacity-50 transition-transform duration-300 ease-out"
                              disabled={quantity === 1}
                            >
                              <CiCircleMinus className="h-8 w-8 text-blue-500 hover:text-blue-700"/>
                            </button>
                            <p className="text-sm text-gray-600">Unds: {quantity}</p>
                            <button
                              onClick={() => handleIncreaseQuantity(_id)}
                              className="flex items-center justify-center transition-transform duration-300 ease-out"
                            >
                              <CiCirclePlus className="h-8 w-8 text-green-500 hover:text-green-700"/>
                            </button>
                            <button
                              onClick={() => handleRemoveFromCart(_id)}
                              className="flex items-center justify-center transition-transform duration-300 ease-out"
                            >
                              <CiCircleRemove className="h-8 w-8 text-red-500 hover:text-red-700"/>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                <h2 className="text-blue-950 mt-4">Total del carrito: ${total.toFixed(2)}</h2>
              </div>
            </section>
            ) : (
              <div className="text-center text-gray-600">
                En este momento no hay productos en el carrito.
              </div>
            )}

            <div className="w-full flex justify-around">
              <button
                onClick={handleCheckout}
                className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${!user ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={!user}
              >
                Comprar
              </button>

              <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          rel="noopener noreferrer"
          className="flex justify-center items-center
          rounded text-white hover:bg-purple-700 border border-transparent dark:hover:border-cyan-400 rounde rounded-full
          dark:hover:bg-transparent dark:hover:text-cyan-400  p-1 hover:cursor-pointer transform duration-500 ease-out"
        >
          <FaCartArrowDown onClick={openModal} className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}

export default ModalCart;
