"use client"

import Navbar from './components/Navbar';
import ProductsPage from './pages/products/page';

export default function Home() {
  return (
    <div className="bg-white dark:bg-black text-white dark:text-gray-200 min-h-screen">
      <Navbar />
    <main className="pt-5 pb-3 md:py-10 px-5">
      <ProductsPage />
    </main>
  </div>
  );
}
