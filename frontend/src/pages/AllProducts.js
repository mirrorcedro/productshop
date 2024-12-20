import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log('product data', dataResponse);
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/** Header Section */}
      <div className="bg-white shadow-sm py-3 px-5 flex justify-between items-center sticky top-0 z-10">
        <h2 className="font-bold text-xl text-gray-800">All Products</h2>
        <button
          className="bg-red-500 text-white hover:bg-red-600 transition-all py-2 px-4 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** Product Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-4">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + 'allProduct'}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/** Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
