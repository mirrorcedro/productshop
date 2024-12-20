/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';  // Assuming productCategory has structure with main categories and subcategories
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import displayRWFCurrency from '../helpers/displayRWFCurrency'; // Ensure this function formats values properly

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        subCategory: "",  // State to store selected subcategory
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [subCategories, setSubCategories] = useState([]); // Store subcategories based on selected category

    // Handle form input changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle category change and update subcategories dynamically
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setData((prev) => ({
            ...prev,
            category: value,
            subCategory: ""  // Reset subcategory when category changes
        }));

        const selectedCategory = productCategory.find((cat) => cat.value === value);
        if (selectedCategory && selectedCategory.children) {
            setSubCategories(selectedCategory.children); // Update subcategories if available
        } else {
            setSubCategories([]); // Reset subcategories if no children
        }
    };

    // Handle product image upload
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);

        try {
            // Upload image to Cloudinary (or custom solution)
            const uploadImageCloudinary = await uploadImage(file);
            setData((prev) => ({
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.secure_url] // Using secure_url for HTTPS
            }));
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle image deletion
    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: newProductImage
        }));
    };

    // Handle form submission to upload the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(SummaryApi.uploadProduct.url, {
                method: SummaryApi.uploadProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData?.message);
                onClose();
                fetchData();
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            console.error('Product upload failed:', error);
            toast.error("Failed to upload product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    {/* Brand Name */}
                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='Enter brand name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    {/* Category Selection */}
                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select
                        required
                        value={data.category}
                        name='category'
                        onChange={handleCategoryChange}
                        className='p-2 bg-slate-100 border rounded'
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>

                    {/* Subcategory Selection */}
                    {data.category && subCategories.length > 0 && (
                        <>
                            <label htmlFor='subCategory' className='mt-3'>Subcategory :</label>
                            <select
                                required
                                value={data.subCategory}
                                name='subCategory'
                                onChange={handleOnChange}
                                className='p-2 bg-slate-100 border rounded'
                            >
                                <option value="">Select Subcategory</option>
                                {subCategories.map((subCat, index) => (
                                    <option value={subCat.value} key={subCat.value + index}>{subCat.label}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {/* Product Image */}
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>

                    {/* Display uploaded images */}
                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((imageUrl, index) => (
                                    <div key={index} className='relative group'>
                                        <img
                                            src={imageUrl}
                                            alt={`Product Image ${index}`}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(imageUrl);
                                            }}
                                        />
                                        <div
                                            className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                            onClick={() => handleDeleteProductImage(index)}
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload at least one product image</p>
                        )}
                    </div>

                    {/* Price and Selling Price */}
                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Enter price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <span>{data.price && `Formatted: ${displayRWFCurrency(data.price)}`}</span>

                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter selling price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <span>{data.sellingPrice && `Formatted: ${displayRWFCurrency(data.sellingPrice)}`}</span>

                    {/* Description */}
                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='Enter product description'
                        rows={3}
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                    />

                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700' disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Product'}
                    </button>
                </form>
            </div>

            {/* Display image in full screen */}
            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
};

export default UploadProduct;
