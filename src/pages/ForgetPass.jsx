import React from 'react'
import { Link } from 'react-router-dom'
import forget_banner from '../../public/images/forget_banner.jpg'


export const ForgetPass = () => {
  return (
    <div className='flex'>
        <div className='flex-1'>
            <img src={forget_banner} alt="" className='h-dvh w-full relative'/>
            <Link to='/'>
                <div className='absolute left-0 top-10 mx-10 cursor-pointer h-10 hover:animate-bounce font-bold text-slate-100'><i className="fa-solid fa-angles-left pr-3"></i>Quay lại trang chủ</div>
            </Link>
        </div>
        <div className='flex-1'>
            <div className='border-2 rounded-2xl m-10 shadow-2xl mx-16 my-32'>
                <h1 className='text-2xl font-bold text-center uppercase mb-8 text-cyan-700 pt-16'>Quên mật khẩu</h1>
                {/* Tên đăng nhập */}
                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                    <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                    <input 
                        type="text"
                        placeholder='Tên đăng nhập ...' 
                        className='outline-none pl-5 text-blue-400 font-semibold '/>
                </div>

                {/* Mật khẩu */}
                <div className="border-2 rounded-lg mx-24 h-10 mt-6 border-blue-200">
                    <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                    <input 
                        type="password"
                        placeholder='Mật khẩu mới ...' 
                        className='outline-none pl-5 text-blue-400 font-semibold '/>
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="border-2 rounded-lg mx-24 h-10 mt-6 border-blue-200">
                    <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                    <input 
                        type="password"
                        placeholder='Nhập lại mật khẩu ...' 
                        className='outline-none pl-5 text-blue-400 font-semibold '/>
                </div>

                <div className='h-10 border-2 rounded-md text-center mx-24 my-10 pt-1 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90'>Xác nhận</div>
            </div>
        </div>
    </div>
  )
}
