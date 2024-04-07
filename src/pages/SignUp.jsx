import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signup_banner from '../../public/images/signup_banner.jpg'
import {users} from '../Components/Assets/user.js'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { saveAs } from 'file-saver';

export const SignUp = () => {

    const [userData, setUserData] = useState(users);

    const addUser = (user) => {
        const updatedUsers = [...userData, user]; // Thêm người dùng mới vào mảng dữ liệu người dùng
        saveUsersToFile(updatedUsers); // Lưu dữ liệu người dùng mới vào file user.js
        setUserData(updatedUsers); // Cập nhật state với dữ liệu người dùng mới
    };

    const saveUsersToFile = (usersData) => {
        // const usersFilePath = 'D:\\DACN\\Project\\ecommerce-project\\src\\Components\\Assets\\user.js';
        const data = `let users = ${JSON.stringify(usersData, null, 2)};\n\nexport { users };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const usersFile = new File([blob], "user.js", { type: 'text/javascript;charset=utf-8' });
    
        saveAs(usersFile);
    };

    const navigate = useNavigate()

    return (
        <div className='flex'>
            <div className='flex-1'>
                <img src={signup_banner} alt="" className='h-dvh w-full relative'/>
                <Link to='/'>
                    <div className='absolute left-0 top-10 mx-10 cursor-pointer h-10 hover:animate-bounce font-bold text-white'><i className="fa-solid fa-angles-left pr-3"></i>Quay lại trang chủ</div>
                </Link>
            </div>
            <div className='flex-1'>
                <div className='border-2 rounded-2xl m-10 shadow-2xl mx-16 py-4'>
                    <h1 className='text-2xl font-bold text-center uppercase text-cyan-700 my-3'>Đăng ký tài khoản</h1>
                    <h1 className='mx-24 my-4 font-semibold text-cyan-800'>Thông tin đăng nhập: </h1>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            repass: '',
                            name: '',
                            phoneNumber: '',
                            address: ''
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string().required('Tên đăng nhập không được để trống'),
                            password: Yup.string().required('Mật khẩu không được để trống'),
                            repass: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
                            name: Yup.string().required('Họ và tên không được để trống').matches(/^[\p{L}\s']+$/u, 'Họ và tên không hợp lệ'),
                            phoneNumber: Yup.string().required('Số điện thoại không được để trống').matches(/^(0|\+84)(\d{9,10})$/, 'Số điện thoại không hợp lệ'),
                            address: Yup.string().required('Địa chỉ không được để trống')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            const existingUser = users.find(item => item.username === values.username)
                            if (existingUser) {
                                alert('Tên đăng nhập đã tồn tại');

                            } else {
                                const user = { id: Math.floor(Math.random() * 1000), username: values.username, password: values.password, role: 'user', fullname: values.name, phone_number: values.phoneNumber, address: values.address }
                                addUser(user);
                                localStorage.setItem('currentAcc', JSON.stringify({username: user.username}))
                                navigate('/')
                            }
                        
                        }}
                    >
                    <Form>
                            {/* Tên đăng nhập */}
                            <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                                <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="username" placeholder="Tên đăng nhập ..." className='outline-none pl-5 text-blue-400 font-semibold' />
                                <ErrorMessage name="username" component="div" className="text-red-500" />
                            </div>

                            {/* Mật khẩu */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="password" name="password" placeholder="Mật khẩu ..." className='outline-none pl-5 text-blue-400 font-semibold' />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            {/* Nhập lại mật khẩu */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="password" name="repass" placeholder="Nhập lại mật khẩu ..." className='outline-none pl-5 text-blue-400 font-semibold' />
                                <ErrorMessage name="repass" component="div" className="text-red-500" />
                            </div>
                            <h1 className='mx-24 my-4 font-semibold text-cyan-800'>Thông tin liên lạc: </h1>
                            {/* Họ và tên */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-pen w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="name" placeholder="Nhập họ tên ..." className='outline-none pl-5 text-blue-400 font-semibold w-96' />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>
                            {/* Số điện thoại */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-phone w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="phoneNumber" placeholder="Nhập số điện thoại ..." className='outline-none pl-5 text-blue-400 font-semibold' />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                            </div>
                            {/* Địa chỉ */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-location-dot w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="address" placeholder="Nhập địa chỉ ..." className='outline-none pl-5 text-blue-400 font-semibold' />
                                <ErrorMessage name="address" component="div" className="text-red-500" />
                            </div>
                            {/* Nút Đăng ký */}
                            <div className='w-full flex justify-center'>
                                <button
                                    className='px-auto h-10 border-2 rounded-md text-center my-5 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                                    type="submit"
                                >Đăng ký</button>

                            </div>
                        </Form>
                    </Formik>

                    <Link to='/login'>
                        <h1 className='text-blue-600 font-semibold text-center hover:opacity-80 mb-2'>Bạn đã có tài khoản rồi?</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}
