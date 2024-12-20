import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa"; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const context = useContext(Context);
    const navigate = useNavigate();
    const searchInput = useLocation();

    // States
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [search, setSearch] = useState(new URLSearchParams(searchInput?.search).getAll("q"));

    // Handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: 'include',
            });

            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                dispatch(setUserDetails(null));
                navigate("/");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("An error occurred during logout.");
        }
    };

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        navigate(value ? `/search?q=${value}` : "/search");
    };

    return (
        <header className='h-16 shadow-md bg-gradient-to-r from-blue-700 to-blue-900 fixed w-full z-40'> {/* Updated background */}
            <div className='container mx-auto h-full flex items-center justify-between px-4'>

                {/* Logo */}
                <div>
                    <Link to="/">
                        <Logo w={90} h={50} />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className='flex items-center w-full justify-between lg:max-w-sm border rounded-full focus-within:shadow pl-2'>
                    <input
                        type='text'
                        placeholder='Search products here...'
                        className='w-full outline-none'
                        aria-label="Search products"
                        onChange={handleSearch}
                        value={search}
                    />
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch />
                    </div>
                </div>

                {/* Menu Options */}
                <div className='flex items-center gap-5 lg:gap-7'>

                    {/* Hamburger Icon */}
                    <button
                        className='text-2xl lg:hidden'
                        aria-label="Toggle mobile menu"
                        onClick={() => setMobileMenu(prev => !prev)}
                    >
                        {mobileMenu ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Show Login Button if user is not logged in */}
                    {!user?._id && (
                        <Link 
                            to="/login" 
                            className='text-sm px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700'
                        >
                            Login
                        </Link>
                    )}

                    {/* User Dropdown */}
                    {user?._id && (
                        <div className='relative'>
                            <div
                                className='text-3xl cursor-pointer'
                                onClick={() => setMenuDisplay(prev => !prev)}
                            >
                                {user?.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        className='w-10 h-10 rounded-full'
                                        alt={user.name}
                                    />
                                ) : (
                                    <FaUserCircle />
                                )}
                            </div>
                            {menuDisplay && (
                                <div className='absolute right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50'>
                                    {user?.role === ROLE.ADMIN && (
                                        <Link
                                            to="/admin-panel/all-products"
                                            className='block px-4 py-2 text-sm hover:bg-gray-100'
                                            onClick={() => setMenuDisplay(false)}
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link
                                        to="/profile"
                                        className='block px-4 py-2 text-sm hover:bg-gray-100'
                                        onClick={() => setMenuDisplay(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className='block px-4 py-2 text-sm hover:bg-gray-100'
                                        onClick={() => setMenuDisplay(false)}
                                    >
                                        My Orders
                                    </Link>
                                    <button
                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Cart Icon */}
                    {user?._id && (
                        <Link to="/cart" className='text-2xl relative'>
                            <FaShoppingCart />
                            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                <p className='text-sm'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )}

                </div>
            </div>

            {/* Mobile Search and Menu */}
            <div className='lg:hidden'>
                {/* Mobile Menu */}
                {mobileMenu && (
                    <div className='absolute top-16 left-0 w-full bg-white shadow-md py-4 z-40'>
                        <nav className='flex flex-col items-center space-y-4'>
                            <Link to="/" className='hover:text-red-600'>Home</Link>
                            {user?._id ? (
                                <>
                                    <Link to="/profile" className='hover:text-red-600'>My Profile</Link>
                                    <Link to="/orders" className='hover:text-red-600'>My Orders</Link>
                                    {user?.role === ROLE.ADMIN && (
                                        <Link to="/admin-panel/all-products" className='hover:text-red-600'>Admin Panel</Link>
                                    )}
                                </>
                            ) : (
                                <Link to="/login" className='hover:text-red-600'>Login</Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
