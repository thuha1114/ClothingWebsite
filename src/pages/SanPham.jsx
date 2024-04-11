import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import all_product from '../Components/Assets/all_product'

export const SanPham = () => {
  return (
    <div>
        {all_product.map(item => (
            <div key={item.id}>
                <Formik
                    initialValues={{
                        id:item.id,
                        name:item.name,
                        new_price:item.new_price
                    }}

                    validationSchema={Yup.object({
                        id: Yup.string().required('ID không được để trống'),
                        name: Yup.string().required('Tên không được để trống'),
                        new_price: Yup.string().required('Giá không được để trống'),
                    })}

                    onSubmit = {(values, {setSubmitting}) =>{
                        //Xử lý dữ liệu sao khi các input hợp lệ
                    }}
                >
                    <Form>
                        {/* ID */}
                        <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                            <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field type="text" name="id" className='outline-none pl-5 text-blue-400 font-semibold' />
                            <ErrorMessage name="id" component="div" className="text-red-500" />
                        </div>
                        {/* Tên */}
                        <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                            <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field type="text" name="name" className='outline-none pl-5 text-blue-400 font-semibold' />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        {/* ID */}
                        <div className="border-2 rounded-lg mx-24 h-10 border-blue-200">
                            <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                            <Field type="text" name="new_price" className='outline-none pl-5 text-blue-400 font-semibold' />
                            <ErrorMessage name="new_price" component="div" className="text-red-500" />
                        </div>
                        <button
                            className='px-auto h-10 border-2 rounded-md text-center my-5 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                            type="submit"
                        >Đăng ký</button>
                    </Form>
                </Formik>
            </div>

        ))}
    </div>
  )
}
