'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const Success = () => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get('session_id');
  const order_id = searchParams.get('order_id');
  const user_id = searchParams.get('user_id');
  const cedula = searchParams.get('cedula');
  const products = searchParams.get('products');
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    if (session_id && !orderCreated) {
      const createOrder = async () => {
        try {
          const res = await fetch('http://localhost:4000/api/v1/orders/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: session_id,
              userId: user_id,
              cedula: cedula,
              products: JSON.parse(products),
              orderCreated
            }),
          });

          const data = await res.json();

          if (res.ok) {
            setSessionData('Orden creada con éxito', data);
            setLoading(false)
          setOrderCreated(true);

          } else {
            setError('Error al crear la orden:', data.message);
            setLoading(false)
          }
        } catch (error) {
          setError('Error al crear la orden:', error);
          setLoading(false)
        }
      };

      createOrder();
    }
  }, [session_id, user_id, cedula, products, orderCreated]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-black">
      <div className="bg-zinc-100 dark:bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-4/5 md:w-2/5 text-center">
        <FaCheckCircle className="text-purple-800 dark:text-cyan-600 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Compra confirmada</h1>

        {loading && <p className="text-black  dark:text-cyan-400">Loading...</p>}
        {sessionData && (
          <>
            <p className="text-lg text-black dark:text-white mb-4">Session ID: {sessionData}</p>
            <p className="text-lg font-semibold text-black dark:text-white mb-8">Gracias por comprar en
            <span className="text-purple-800 dark:text-cyan-500 font-roboto pl-1">Jade Shop</span>!</p>
          </>
        )}

        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-purple-800 text-white rounded-md hover:bg-purple-900 dark:bg-cyan-700
          dark:hover:bg-cyan-900 focus:outline-none focus:ring-4 focus:ring-purple-950 dark:focus:ring-cyan-950 transition-all"
        >
          Go Back to Home
        </button>
      </div>

      <div className="fixed bottom-0 right-0 m-4">
        <div className="flex flex-col space-y-3">
          <ThemeProvider />
        </div>
      </div>
    </div>
  );
};

export default Success;





