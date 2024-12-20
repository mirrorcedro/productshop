import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-xl sm:text-2xl font-semibold py-4">{heading}</h2>

      <div className="relative">
        {/* Scroll buttons for larger screens */}
        <button
          className="hidden md:flex bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={scrollLeft}
        >
          <FaAngleLeft className="text-lg" />
        </button>
        <button
          className="hidden md:flex bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={scrollRight}
        >
          <FaAngleRight className="text-lg" />
        </button>

        <div
          className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all scroll-smooth"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="w-full min-w-[220px] sm:min-w-[260px] max-w-[220px] sm:max-w-[260px] h-40 bg-white rounded-md shadow-md flex"
                >
                  <div className="bg-slate-200 h-full w-1/3 animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                    <div className="h-3 bg-slate-200 animate-pulse rounded"></div>
                    <div className="h-4 bg-slate-200 animate-pulse rounded"></div>
                    <div className="h-5 bg-slate-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <Link
                  key={product?._id}
                  to={`product/${product?._id}`}
                  className="w-full min-w-[220px] sm:min-w-[260px] max-w-[220px] sm:max-w-[260px] h-40 bg-white rounded-md shadow-md flex"
                >
                  <div className="bg-slate-200 h-full w-1/3">
                    <img
                      src={product.productImage[0]}
                      alt={product?.productName}
                      className="object-scale-down h-full w-full transition-transform duration-200 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 grid gap-2">
                    <h3 className="font-medium text-sm sm:text-base text-black line-clamp-1">
                      {product?.productName}
                    </h3>
                    <p className="text-xs sm:text-sm capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-red-600 font-medium text-sm sm:text-base">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through text-xs sm:text-sm">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
