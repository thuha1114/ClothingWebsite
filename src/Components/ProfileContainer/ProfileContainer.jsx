import { saveAs } from 'file-saver';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { setItem } from 'localforage';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import {users} from '../Assets/user.js'

export const ProfileContainer = () => {

    const [acc, setAcc] = useState(()=>{
        const storage = JSON.parse(localStorage.getItem('currentAcc'))
        return storage ? storage : []
    })

    const [avatar, setAvatar ] = useState(() => {
        return acc.avt === undefined ? "" : acc.avt
    })

    const handleChangeAvatar = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // Cập nhật state với đường dẫn của ảnh mới
                setAvatar(reader.result);
    
                // Cập nhật state `acc` với đường dẫn của ảnh mới
                setAcc(prevState => ({
                    ...prevState,
                    avt: reader.result
                }));
            };
            
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            // Không có tập tin nào được chọn, không cần thực hiện thêm các thao tác liên quan đến việc cập nhật avatar và thông tin tài khoản
        }
    }
    
    const handleChooseImage = () => {
        const fileInput = document.getElementById('avt');
        fileInput.click(); // Kích hoạt sự kiện click trên input type "file"
    };

    const saveUsersToFile = (users) => {
        localStorage.setItem('currentAcc', JSON.stringify(acc))
        const data = `let users = ${JSON.stringify(users, null, 2)};\n\nexport { users };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const usersFile = new File([blob], "user.js", { type: 'text/javascript;charset=utf-8' });
        saveAs(usersFile);
        // notify()
    }; 

    const notify = () => {
        toast.success('Cập nhật thông tin thành công!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'notifyEdit',
        });
    };

    console.log("tài khoản?", acc)

    return (
        <div className='mt-48 mb-20 mx-32'>
            <div className='uppercase font-bold text-2xl border-l-4 border-red-500 pl-3 text-cyan-700'>Thông tin cá nhân</div>

            <Formik
                initialValues={{
                    username: acc.username,
                    avt: acc.avt ? acc.avt : '',
                    password: acc.password,
                    repass: acc.password,
                    fullname: acc.fullname,
                    phone_number: acc.phone_number,
                    address: acc.address,
                }}
                validationSchema={Yup.object({
                    password: Yup.string().required('Trường này không được để trống!').min(6,'Mật khẩu phải có 6 ký tự!'),
                    repass: Yup.string().required('Trường này không được để trống!')
                                .test('check','Mật khẩu không khớp!', function(value) {
                                    const {password} = this.parent;
                                    return value === password;
                                }),
                    fullname: Yup.string().required('Trường này không được để trống!'),
                    phone_number: Yup.string().required('Trường này không được để trống!').matches( /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
                    address: Yup.string().required('Trường này không được để trống!'),
                })}
                onSubmit= {(values, {setSubmitting}) => {                     
                    
                    const result = {
                        id: acc.id,
                        avt: avatar,
                        username: acc.username,
                        password: values.password,
                        fullname: values.fullname,
                        phone_number: values.phone_number,
                        address: values.address,
                    }
                    setAcc(result)
                    console.log('tài khoản: ', acc)

                    const updatedUsers = users.map(user => {
                        if (user.id === acc.id) {
                            return {
                                ...user,
                                avt: avatar,
                                password: values.password,
                                fullname: values.fullname,
                                phone_number: values.phone_number,
                                address: values.address,
                            };
                        }
                        return user;
                    });
                
                    //bị lỗi chỗ gọi hàm
                    // Gọi hàm `saveUsersToFile` chỉ khi thông tin cá nhân đã được cập nhật thành công
                    saveUsersToFile(updatedUsers);
                    console.log(updatedUsers);

                }}
            >
                <Form>
                    <div className='flex mx-32'>
                        {/* Ảnh đại diện */}
                        <div className='rounded-full basis-1/4 flex flex-col justify-center items-center'>
                            {avatar ? (
                                <img src={avatar || ''} alt="Avatar" className='w-48 h-48 bg-green-500 rounded-full border-2 border-cyan-600 '/>
                            ): (
                                <i className="fa-regular fa-circle-user text-9xl text-cyan-700 "></i>
                            )}
                            <input type="file" name="avt" id="avt" accept="image/*" className="absolute -top-full opacity-0" onChange={handleChangeAvatar} style={{ display: 'none' }}/>
                            <button 
                                    className='h-10 w-36 rounded-lg font-bold text-white bg-blue-600 hover:opacity-80 mt-10' 
                                    onClick={handleChooseImage}> Chọn ảnh </button>
                        </div>
                        {/* Thông tin */}
                        <div className='basis-3/4'>
                            {/* Tên đăng nhập */}
                            <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                                <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="username" value={acc.username} placeholder="Tên đăng nhập ..." className='outline-none pl-5 text-blue-400 font-semibold' />
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
                                <Field type="text" name="fullname" placeholder="Nhập họ tên ..." className='outline-none pl-5 text-blue-400 font-semibold w-5/6 capitalize' />
                                <ErrorMessage name="fullname" component="div" className="text-red-500" />
                            </div>
                            {/* Số điện thoại */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-phone w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="phone_number" placeholder="Nhập số điện thoại ..." className='outline-none pl-5 text-blue-400 font-semibold' />
                                <ErrorMessage name="phone_number" component="div" className="text-red-500" />
                            </div>
                            {/* Địa chỉ */}
                            <div className="border-2 rounded-lg mx-24 h-10 mt-5 border-blue-200">
                                <i className="text-cyan-800 fa-solid fa-location-dot w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                <Field type="text" name="address" placeholder="Nhập địa chỉ ..." className='outline-none pl-5 text-blue-400 font-semibold w-5/6 capitalize' />
                                <ErrorMessage name="address" component="div" className="text-red-500" />
                            </div>
                            {/* Nút Đăng ký */}
                            <div className='w-full flex justify-center'>
                                <button
                                    className='px-auto h-10 border-2 rounded-md text-center my-8 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                                    type="submit"
                                >Cập nhật thông tin</button>
                            </div>
                        </div>
                    </div>
                    
                </Form>
            </Formik>
        </div>
    )
}
