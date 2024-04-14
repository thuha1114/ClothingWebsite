import React from 'react'
import { Link } from 'react-router-dom'
import forget_banner from '../../public/images/forget_banner.jpg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import {users} from '../Components/Assets/user'
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';

export const ForgetPass = () => {

    const saveUserToFile = (updatedUser) => {
        localStorage.setItem('updatedUser', JSON.stringify(updatedUser));
        const data = `let users = ${JSON.stringify(updatedUser, null, 2)};\n\nexport { users };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const userFile = new File([blob], "user.js", { type: 'text/javascript;charset=utf-8' });
        saveAs(userFile)
    };  

    const notify = () => {
        toast.success('Cập nhật mật khẩu thành công!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'notify',
        });
    };

    return (
        <div className='flex'>
            <div className='flex-1'>
                <img src={forget_banner} alt="" className='h-dvh w-full relative'/>
                <Link to='/'>
                    <div className='absolute left-0 top-10 mx-10 cursor-pointer h-10 hover:animate-bounce font-bold text-slate-100'><i className="fa-solid fa-angles-left pr-3"></i>Quay lại trang chủ</div>
                </Link>
            </div>
            <div className='flex-1'>
                <Formik
                    initialValues={{
                        username: '',
                        password:'',
                        repass:''
                    }}
                    validationSchema={Yup.object({
                        username:Yup.string().required('Trường này không được để trống!')
                                    .test('is-unique', 'Tên đăng nhập không tồn tại!', function (value) {
                                        // const { users } = this.options.context;
                                        return users.some(item => item.username === value); // Kiểm tra xem username đã tồn tại trong mảng users hay không
                        }),
                        password:Yup.string().required('Trường này không được để trống!').min(6,'Mật khẩu phải tối thiểu 6 ký tự!'),
                        repass:Yup.string().required('Trường này không được để trống!')
                                    .test('checkpass','Mật khẩu không khớp', function(value){
                                        const {password} = this.parent
                                        return value === password
                                    })
                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        const result = users.map(item => {
                            if(item.username === values.username){
                                return {...item, password: values.password}
                            }
                            return item
                        })
                        saveUserToFile(result)
                        notify()
                        console.log('ok')
                    }}
                >
                    <Form >                  
                        <div className='border-2 rounded-2xl m-10 shadow-2xl mx-16 my-32 pb-10'>
                            <h1 className='text-2xl font-bold text-center uppercase mb-8 text-cyan-700 pt-16'>Quên mật khẩu</h1>

                            {/* Tên đăng nhập */}
                            <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                                <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="username" placeholder="Tên đăng nhập ..." className='outline-none  pl-5 text-blue-400 font-semibold w-5/6' />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Mật khẩu */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-6 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="password" name="password" placeholder="Mật khẩu ..." className='outline-none  pl-5 text-blue-400 font-semibold w-5/6' />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Xác nhận mật khẩu */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-6 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-lock w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="password" name="repass" placeholder="Nhập lại mật khẩu ..." className='outline-none  pl-5 text-blue-400 font-semibold capitalize w-5/6' />
                                <ErrorMessage name="repass" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Nút xác nhận */}
                            <div className='w-full flex justify-center pt-5'>
                                <button
                                    className='px-auto h-10 border-2 rounded-md text-center my-5 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                                    type="submit"
                                >Xác nhận</button>
                            </div>
                        </div>
                    </Form>
                </Formik>

                <ToastContainer />
            </div>
        </div>
    )
}
