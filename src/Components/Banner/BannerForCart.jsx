import React from 'react'
import shopping_cart from '/images/shopping_cart.png'
import { Link } from 'react-router-dom'


export const BannerForCart = () => {
  return (
    <div className='relative'>
        <img src={shopping_cart} alt="Banner For Cart" className='mt-32 w-full h-80' />
        <h1 className='text-3xl font-bold absolute top-28 left-48 text-slate-50'>Giỏ hàng của bạn</h1>
        <Link to='/'>
            <h1 className='text-lg font-bold absolute top-52 left-52 text-slate-50 cursor-pointer hover:opacity-90 hover:animate-bounce'><i className="fa-solid fa-angles-left mr-2"></i>Tiếp tục mua hàng </h1>
        </Link>
    </div>
  )
}
