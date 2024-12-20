import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayRWFCurrency from '../helpers/displayCurrency'; // Currency formatter
import { MdDelete } from 'react-icons/md';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        phone_number: '',
        name: '',
        address: '',
        city: '',
        postal_code: '',
    });
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        const initializeCart = async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
        };

        initializeCart();
    }, []);

    const updateCartQuantity = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ _id: id, quantity: qty }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        } catch (error) {
            console.error('Error deleting cart product:', error);
        }
    };

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice, 0);

    const config = {
        public_key: 'FLWPUBK_TEST-2e25e747c6ee48a1bc6d351a33b3fed8-X',
        tx_ref: Date.now().toString(),
        amount: totalPrice,
        currency: 'RWF',
        payment_options: paymentMethod,
        customer: {
            email: customerInfo.email || 'guest@example.com',
            phone_number: customerInfo.phone_number || '0000000000',
            name: customerInfo.name || 'Guest User',
        },
        customizations: {
            title: 'My Store Checkout',
            description: 'Payment for items in cart',
            logo: 'https://your-logo-url.com/logo.png',
        },
    };

    const fwConfig = {
        ...config,
        text: `Pay with ${paymentMethod.toUpperCase()}`,
        callback: (response) => {
            console.log(response);
            closePaymentModal();
            if (response.status === 'successful') {
                alert('Payment successful!');
                // Further actions after successful payment
            }
        },
        onClose: () => {
            console.log('Payment modal closed');
        },
    };

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && <p className='bg-white py-5'>No Data</p>}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {loading
                        ? loadingCart.map((_, index) => (
                              <div
                                  key={`AddToCartLoading-${index}`}
                                  className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                          ))
                        : data.map((product) => (
                              <div
                                  key={product?._id}
                                  className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                  <div className='w-32 h-32 bg-slate-200'>
                                      <img
                                          src={product?.productId?.productImage[0]}
                                          alt={product?.productId?.productName}
                                          className='w-full h-full object-scale-down mix-blend-multiply'
                                      />
                                  </div>
                                  <div className='px-4 py-2 relative'>
                                      <div
                                          className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                                          onClick={() => deleteCartProduct(product?._id)}>
                                          <MdDelete />
                                      </div>

                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                          {product?.productId?.productName}
                                      </h2>
                                      <div className='text-gray-600'>
                                          {displayRWFCurrency(product?.productId?.sellingPrice)}
                                      </div>
                                      <div className='flex items-center gap-3 mt-1'>
                                          <button
                                              className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                              onClick={() => updateCartQuantity(product?._id, product?.quantity - 1)}
                                              disabled={product?.quantity <= 1}>
                                              -
                                          </button>
                                          <span>{product?.quantity}</span>
                                          <button
                                              className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                                              onClick={() => updateCartQuantity(product?._id, product?.quantity + 1)}>
                                              +
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                </div>

                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                    ) : (
                        <div className='h-auto bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div className='p-4'>
                                <p>Total Quantity: {totalQty}</p>
                                <p>Total Price: {displayRWFCurrency(totalPrice)}</p>
                            </div>
                            <div className='p-4 space-y-4'>
                                <div>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                        Name
                                    </label>
                                    <input
                                        id='name'
                                        type='text'
                                        value={customerInfo.name}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, name: e.target.value })
                                        }
                                        className='w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                        Email
                                    </label>
                                    <input
                                        id='email'
                                        type='email'
                                        value={customerInfo.email}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, email: e.target.value })
                                        }
                                        className='w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='phone_number' className='block text-sm font-medium text-gray-700'>
                                        Phone Number
                                    </label>
                                    <input
                                        id='phone_number'
                                        type='text'
                                        value={customerInfo.phone_number}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, phone_number: e.target.value })
                                        }
                                        className='w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                                        Delivery Address
                                    </label>
                                    <input
                                        id='address'
                                        type='text'
                                        value={customerInfo.address}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, address: e.target.value })
                                        }
                                        className='w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                                        City
                                    </label>
                                    <input
                                        id='city'
                                        type='text'
                                        value={customerInfo.city}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, city: e.target.value })
                                        }
                                        className='w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='postal_code' className='block text-sm font-medium text-gray-700'>
                                        Postal Code
                                    </label>
                                    <input
                                        id='postal_code'
                                        type='text'
                                        value={customerInfo.postal_code}
                                        onChange={(e) =>
                                            setCustomerInfo({ ...customerInfo, postal_code: e.target.value })
                                        }
                                        className='w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-between px-4'>
                                <label htmlFor='payment-method' className='font-medium text-lg'>
                                    Payment Method
                                </label>
                                <select
                                    id='payment-method'
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className='border p-2'>
                                    <option value='card'>Card</option>
                                    <option value='mobilemoney'>Mobile Money</option>
                                    <option value='ussd'>USSD</option>
                                </select>
                            </div>
                            <FlutterWaveButton {...fwConfig} className='bg-blue-600 p-2 text-white w-full mt-2' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
