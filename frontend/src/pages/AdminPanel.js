import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

    return (
        <div className='min-h-[calc(100vh-120px)] flex flex-col md:flex-row'>

            {/* Sidebar */}
            <aside className='bg-white min-h-full w-full md:w-60 customShadow p-4'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/* Navigation */}
                <div className='mt-4'>
                    <nav className='space-y-2'>
                        <Link to={"all-users"} className='block px-4 py-2 hover:bg-slate-100 rounded'>All Users</Link>
                        <Link to={"all-products"} className='block px-4 py-2 hover:bg-slate-100 rounded'>All Products</Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel
