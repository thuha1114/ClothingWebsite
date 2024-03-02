import React from 'react'
import logo from '/images/logo.png'

export const Footer = () => {
  return (
    <div className='grid grid-cols-12 gap-8 px-36 bg-blue-200/80 py-5 text-blue-900'>
        <div className='col-span-5 my-auto'>
            <img src={logo} alt='Logo Website' className='w-1/4 -translate-y-5' />
            <h1 className='pr-10 -translate-y-3 font-semibold'>Chào bạn đã đến với Dress Distinct, chúng tôi hi vọng bạn sẽ có trải nghiệm mua hàng tốt nhất khi đến
            website của chúng tôi! Chúc bạn một ngày tốt lành!</h1>
            {/* Follow Social */}
            <div>
                <h1 className='text-xl font-bold my-4'>Theo dõi chúng tôi</h1>
                <ul className='flex gap-12 text-2xl'>
                    <i className=" hover:opacity-80 opacity-90 cursor-pointer fa-brands fa-facebook"></i>
                    <i className=" hover:opacity-80 opacity-90 cursor-pointer fa-brands fa-square-twitter"></i>
                    <i className=" hover:opacity-80 opacity-90 cursor-pointer fa-brands fa-square-instagram"></i>
                    <i className=" hover:opacity-80 opacity-90 cursor-pointer fa-brands fa-pinterest"></i>
                </ul>
            </div>
        </div>
        <div className="col-span-7 my-auto mt-10">
            <div className='grid grid-cols-2' >
                <div className="col-span-1 ml-10">
                    <h1 className='text-xl font-bold mb-6'>VỀ CHÚNG TÔI</h1>
                    <ul>
                        <li className='cursor-pointer font-semibold hover:font-bold hover:opacity-80 my-2 duration-100 ease '>Giới thiệu</li>
                        <li className='cursor-pointer font-semibold hover:font-bold hover:opacity-80 my-2 duration-100 ease'>Thông tin cửa hàng</li>
                        <li className='cursor-pointer font-semibold hover:font-bold hover:opacity-80 my-2 duration-100 ease'>Điều khoản</li>
                    </ul>
                </div>
                <div className="col-span-1 ml-16">
                    <h1 className='text-xl font-bold mb-6'>DỊCH VỤ KHÁCH HÀNG</h1>
                    <ul>
                        <li className='cursor-pointer font-semibold hover:font-bold hover:opacity-80 my-2 duration-100 ease'>Chăm sóc khách hàng</li>
                        <li className='cursor-pointer font-semibold hover:font-bold hover:opacity-80 my-2 duration-100 ease'>Hình thức giao hàng</li>
                        <li className='cursor-pointer font-semibold hover:font-bold hover:opacity-80 my-2 duration-100 ease'>Hình thức thanh toán</li>
                    </ul>
                </div>
            </div>
            <div className=' flex place-content-center align-middle pt-16'>
                <div className='text-xl font-bold '>Liên hệ với chúng tôi: </div>
                <div className='relative ml-4 pb-8'>
                    <input  
                        className='border-2 rounded-lg border-slate-400 w-64 h-8 pl-4 text-sm font-normal border-sky-700 focus:outline-none'
                        placeholder='Nhập email của bạn ...'
                    />
                    <i className="fa-solid fa-paper-plane cursor-pointer absolute right-2 top-2 text-blue-900 hover:opacity-90"></i>
                </div>
            </div>
        </div>
    </div>
  )
}
