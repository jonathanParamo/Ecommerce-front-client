'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '@/app/features/products/productsProviders';
import { addToCart } from '@/app/features/cart/cartProvider';
import ProductList from '@/app/components/ProductsList';
import Navbar from '@/app/components/Navbar';
import Pagination from '@/app/components/Pagination';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const dispatch = useDispatch();
  const { products, status, error, total } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    if (query) {
      dispatch(searchProducts({ query, page: currentPage, limit }));
    }
  }, [query, currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white dark:bg-black text-white dark:text-gray-200 min-h-screen">
      <Navbar />
      <h1 className="w-full font-roboto text-2xl text-center py-3">Resultados de búsqueda para: {query}</h1>
      <section className="pb-10">
        {status === 'loading' && <p>Cargando productos...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && products.length > 0 && (
          <>
            <ProductList products={products} handleAddToCart={handleAddToCart} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
        {status === 'succeeded' && products.length === 0 && (
          <p>No se encontraron productos para tu búsqueda.</p>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
