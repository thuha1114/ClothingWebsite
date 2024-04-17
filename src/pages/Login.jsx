import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login_banner from '../../public/images/login_banner.jpg'
import {users}  from '../Components/Assets/user.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [currentAcc, SetCurrentAcc] = useState([])

    const navigate = useNavigate()

    const notify = () => {
        toast.error('Thông tin đăng nhập không đúng, vui lòng nhập lại!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                fontWeight: 'bold'
            }
        });
    };

    const handleClick = () => {
        const result = users.filter(item => item.username === username && item.password === password)
        console.log("user: ", result[0])
        if(result.length > 0){
            if(result[0].role === 'user'){
                const currentAcc = result[0]
                localStorage.setItem('currentAcc', JSON.stringify(currentAcc))
                navigate('/')
            }
            if(result[0].role === 'admin'){
                const currentAcc = result[0]
                localStorage.setItem('currentAcc', JSON.stringify(currentAcc))
                navigate('/admin')
            }
        }
        else{
            notify()
            setUsername('')
            setPassword('')
        }
    }

    // console.log('current: ', currentAcc)
    
    return (
        <div className='flex'>
            <div className='flex-1'>
                <img src={login_banner} alt="" className='h-dvh w-full relative'/>
                <Link to='/'>
                    <div className='absolute left-0 top-10 mx-10 cursor-pointer h-10 hover:animate-bounce font-bold text-slate-100'><i className="fa-solid fa-angles-left pr-3"></i>Quay lại trang chủ</div>
                </Link>
            </div>
            <div className='flex-1'>
                <div className='border-2 rounded-2xl m-10 shadow-2xl mx-16 py-14'>
                    <h1 className='text-2xl font-bold text-center uppercase mb-16 text-cyan-700'>Đăng nhập tài khoản</h1>
                    {/* Tên đăng nhập */}
                    <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                        <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                        <input 
                            type="text"
                            placeholder='Tên đăng nhập ...' 
                            className='outline-none pl-5 text-blue-400 font-semibold '
                            onChange = {e => setUsername(e.target.value)}
                            value={username}
                            />
                    </div>

                    {/* Mật khẩu */}
                    <div className="border-2 rounded-lg mx-24 h-10 mt-6 border-blue-200">
                        <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                        <input 
                            type="password"
                            placeholder='Mật khẩu ...' 
                            className='outline-none pl-5 text-blue-400 font-semibold '
                            onChange = {e => setPassword(e.target.value)}
                            value={password}
                            />
                    </div>
                    <div className='border-2 my-10 mx-24'></div>
                    <h1 className='font-bold text-center my-6 text-cyan-700'>Đăng nhập bằng liên kết khác</h1>
                    <div className="text-center text-xl">
                        <i className="fa-brands fa-google mx-4 text-orange-600"></i>
                        <i className="fa-brands fa-facebook mx-4 text-blue-600"></i>
                    </div>
                    <div className='h-10 border-2 rounded-md text-center mx-24 my-10 pt-1 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90' onClick={handleClick}>Đăng nhập</div>
                    <div className='flex justify-between mx-32'>
                        <Link to='/forget-pass'>
                            <h1 className='text-red-500 font-semibold cursor-pointer hover:opacity-70'>Quên mật khẩu?</h1>
                        </Link>
                        <Link to='/signup'>
                            <h1 className='text-blue-600 font-bold cursor-pointer hover:opacity-70'>Đăng ký</h1>
                        </Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
