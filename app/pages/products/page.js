'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsProviders';
import { addToCart } from '@/app/features/cart/cartProvider';
import Pagination from '../../components/Pagination';
import Loader from '@/app/components/Loader';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { FaBoxOpen } from 'react-icons/fa';
import ProductList from '@/app/components/ProductsList';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const subcategory = searchParams.get('subcategory');

  const { products, status, error, total } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit, categoryId, subcategory }));
  }, [dispatch, currentPage, limit, categoryId, subcategory]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const totalPages = Math.ceil(total / limit);
  const hasData = products && products.length > 0

  return (
    <div className="bg-white dark:bg-black text-white dark:text-gray-200 min-h-screen">
      {categoryId && subcategory && <Navbar />}
      <main className="pt-5 pb-3 md:py-10 px-5">
        {status === 'loading' && <Loader />}
        {status === 'failed' && <p className="text-white">Error: {error}</p>}
        {status === 'succeeded' && (
          <>
            <div className="w-full flex justify-center p-2">
              {/* Aquí usamos el componente ProductList */}
              <ProductList products={products} handleAddToCart={handleAddToCart} />

              {/* Mostrar mensaje si no hay productos */}
              {!hasData && (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#141414] p-4">
                  <div className="text-gray-600 dark:text-gray-400">
                    <FaBoxOpen className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
                  </div>
                  <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    No Products Available
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    We’re sorry, but there are no products available in this subcategory at the moment. Please check back later or explore other categories.
                  </p>
                </div>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
