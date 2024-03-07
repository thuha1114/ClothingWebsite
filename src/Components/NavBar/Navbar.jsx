import React, { createContext, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { json, Link } from 'react-router-dom'
import logo from '/images/logo.png'


export const Navbar = () => {

    const navItems = [
        {title:'Đồ nữ', path:'/women'},
        {title:'Đồ nam', path:'/men'},
        {title:'Đồ trẻ em', path:'/kids'}
    ]

    const [cartList, setCartList] = useState(() => {
        var storage = JSON.parse(localStorage.getItem('cartList'))
        return storage ? storage : []
    })

    const handleToTop = () => {
        window.scrollTo({top: '0', behavior:'smooth'})
    }

    return (
        <>
            <header className='flex px-32 text-blue-900 fixed top-0 mb-96 ht-32 bg-blue-200/90 z-10 w-full font-semibold '>
                    
                <Link to="/">
                    <img src={logo} alt='Logo for Website' className='size-32 flex-none cursor-pointer'/>
                </Link>
                <ul className='flex justify-between flex-1 mx-20 m-auto w-28'>
                    {navItems.map(({title, path, category}) =>(
                        <li key={title} className="hover:border-b-4 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold" >
                            <Link to={path} onClick={handleToTop}>{title}</Link>
                        </li>
                    ))}
                </ul>
                {/* Thanh tìm kiếm */}
                <div className=' relative m-auto'>
                    <input  
                        className='border-2 rounded-full border-slate-400 w-60 h-8 pl-8 text-sm font-normal border-sky-700 focus:outline-none'
                        placeholder='Nhập nội dung tìm kiếm ...'
                    />
                    <i className="fa-solid fa-magnifying-glass cursor-pointer absolute left-2 top-2"></i>
                </div>
                <Link to="/cart" className=' mx-10 m-auto cursor-pointer relative hover:opacity-85'>
                    <i className="fa-solid fa-cart-shopping">
                        <span className='w-4 h-4 rounded-full bg-red-400 text-xs absolute bottom-3 left-2 text-center'>{cartList.length}</span>
                    </i>
                </Link>
                <div className='mx-4 m-auto'>
                    <button className='border-2 border-sky-700 rounded-full w-28 h-10 mr-4 hover:bg-sky-500 hover:text-slate-50 hover:font-semibold'>Đăng nhập</button>
                    <button className='border-2 border-sky-700 rounded-full w-28 h-10 hover:bg-sky-500 hover:text-slate-50 hover:font-semibold'>Đăng ký</button>
                </div>
            </header>
            <Carousel>

            </Carousel>
        </>
    )
}
