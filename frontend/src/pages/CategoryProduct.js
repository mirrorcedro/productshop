import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                category: filterCategoryList,
            }),
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
        setLoading(false);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory(prev => ({
            ...prev,
            [value]: checked,
        }));
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map(categoryKeyName => (selectCategory[categoryKeyName] ? categoryKeyName : null))
            .filter(el => el);

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((el, index) => {
            if (arrayOfCategory.length - 1 === index) {
                return `category=${el}`;
            }
            return `category=${el}&&`;
        });

        navigate("/product-category?" + urlFormat.join(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;
        setSortBy(value);

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    return (
        <div className="container mx-auto p-4">

            {/* Desktop version */}
            <div className="hidden lg:grid grid-cols-[250px,1fr] gap-4">

                {/* Left Side */}
                <div className="bg-white p-4 rounded-lg shadow-md min-h-[calc(100vh-120px)] overflow-y-auto">

                    {/* Sort By */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Sort by</h3>

                        <form className="text-sm flex flex-col gap-4 py-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "asc"}
                                    onChange={handleOnChangeSortBy}
                                    value={"asc"}
                                    className="accent-red-600"
                                />
                                <label>Price - Low to High</label>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "dsc"}
                                    onChange={handleOnChangeSortBy}
                                    value={"dsc"}
                                    className="accent-red-600"
                                />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter By */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Category</h3>

                        <form className="text-sm flex flex-col gap-4 py-4">
                            {productCategory.map((categoryName, index) => (
                                <div className="flex items-center gap-3" key={index}>
                                    <input
                                        type="checkbox"
                                        name={"category"}
                                        checked={selectCategory[categoryName?.value]}
                                        value={categoryName?.value}
                                        id={categoryName?.value}
                                        onChange={handleSelectCategory}
                                        className="accent-red-600"
                                    />
                                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Right Side (Product) */}
                <div className="px-4">
                    <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>

                    <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)]">
                        {data.length !== 0 && !loading ? (
                            <VerticalCard data={data} loading={loading} />
                        ) : (
                            <p className="text-center text-gray-500">No products found.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile version */}
            <div className="lg:hidden">
                {/* Sort by and category filters for mobile */}
                <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Sort by</h3>
                    <form className="text-sm flex gap-6 py-3">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sortBy"
                                checked={sortBy === "asc"}
                                onChange={handleOnChangeSortBy}
                                value={"asc"}
                                className="accent-red-600"
                            />
                            Low to High
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="sortBy"
                                checked={sortBy === "dsc"}
                                onChange={handleOnChangeSortBy}
                                value={"dsc"}
                                className="accent-red-600"
                            />
                            High to Low
                        </label>
                    </form>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Category</h3>
                    <form className="text-sm flex flex-wrap gap-4">
                        {productCategory.map((categoryName, index) => (
                            <label className="flex items-center gap-2" key={index}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    checked={selectCategory[categoryName?.value]}
                                    value={categoryName?.value}
                                    id={categoryName?.value}
                                    onChange={handleSelectCategory}
                                    className="accent-red-600"
                                />
                                {categoryName?.label}
                            </label>
                        ))}
                    </form>
                </div>

                {/* Products for mobile */}
                <div className="px-4">
                    {data.length !== 0 && !loading ? (
                        <VerticalCard data={data} loading={loading} />
                    ) : (
                        <p className="text-center text-gray-500">No products found.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default CategoryProduct;
