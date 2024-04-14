import React, { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import empty_cart from "/images/empty_cart.png"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { saveAs } from 'file-saver';
import {orders} from '../Assets/orders'

export const PaymentCart = () => {

    const [showCart, setShowCart] = useState(true)
    const [num, setNum] = useState()

    const [cartPayment, setCartPayment] = useState(() => {
        const cart = JSON.parse(localStorage.getItem('cartPayment'))
        return cart ? cart : []
    })

    useEffect(()=> {
        if(cartPayment.length > 0)
          setShowCart(true)
        else if(cartPayment.length == 0)
          setShowCart(false)
      },[cartPayment])

    console.log('cart payment: ', cartPayment)

    const [itemDelete, setItemDelete] = useState()

    useEffect(() => {
        if (itemDelete) {
          setCartPayment(prevCartList => {
            const updatedCartList = prevCartList.filter(item => item.id !== itemDelete);
            localStorage.setItem('cartPayment', JSON.stringify(updatedCartList));
            return updatedCartList;
          });
        }
    }, [itemDelete]);

    const total = useMemo(()=>{
        const result = cartPayment.reduce((total, item) => (total + item.total), 0)
        return result
      },[cartPayment])

    const handleDecrease = (itemId) => {
      setCartPayment(prevCartList => {
        const updateCart = prevCartList.map(item => {
          if(item.id === itemId && item.quantity > 1){
            const quantity = item.quantity - 1
            const total = item.new_price * quantity
            return {...item, quantity: quantity, total: total}
          }
          return item
        })
        localStorage.setItem('cartList',JSON.stringify(updateCart))
        return updateCart
      })
    };
  
    const handleIncrease = (itemId) => {
      setCartPayment(prevCartList => {
        const updateCart = prevCartList.map(item => {
          if(item.id === itemId && item.quantity < 10){
              const quantity = item.quantity + 1
              const total = item.new_price * quantity
              return {...item, quantity: quantity, total: total}
          }
          return item
        })
        localStorage.setItem('cartList', JSON.stringify(updateCart));
        return updateCart
      })
    };

    const [currentAcc, setCurrentAcc] = useState(()=>{
      const result = JSON.parse(localStorage.getItem('currentAcc'))
      return result ? result : {}
  })

  const [infoOrder, setInfoOrder] = useState(orders);

    const addOrder = (info) => {
        const updatedOrder = [...infoOrder, info]; // Thêm người dùng mới vào mảng dữ liệu người dùng
        saveOrderToFile(updatedOrder); // Lưu dữ liệu người dùng mới vào file Order.js
        setInfoOrder(updatedOrder); // Cập nhật state với dữ liệu người dùng mới
    };

    const saveOrderToFile = (info) => {
        const data = `let orders = ${JSON.stringify(info, null, 2)};\n\nexport { orders };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const ordersFile = new File([blob], "orders.js", { type: 'text/javascript;charset=utf-8' });
    
        saveAs(ordersFile);
    };

    const navigate = useNavigate()

      
  return (
    <div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 ">
            <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{width: '66%'}}
            ></div>
        </div>
        {showCart ? (
            <div>
              {/* <InfoClient /> */}
              <h1 className='text-2xl font-bold text-upper pt-10 pb-7 text-blue-600 mx-60'>Thông tin khách hàng</h1>
              <Formik 
                  initialValues={{
                      fullName: currentAcc.fullname || '',
                      phoneNumber: currentAcc.phone_number || '',
                      address: currentAcc.address || '',
                  }}
                  validationSchema={Yup.object({
                      fullName: Yup.string().required('Thông tin không được để trống').matches(/^([\p{L}\s]+)+$/u, 'Họ tên không hợp lệ!'),
                      phoneNumber: Yup.string().required('Thông tin không được để trống').matches(/^(0|\+84)((3[2-9]|5[6-9]|7[0|6-9]|8[1-9]|9[0-9])(\d{7}))$/, 'Số điện thoại không hợp lệ!'),
                      address: Yup.string().required('Thông tin này không được để trống!'),
                  })}
                  onSubmit={(values, {setSubmitting}) => {
                    const info = {orderID:  Math.random().toString(36).substr(2, 9),username: currentAcc.username, fullname: values.fullName, phone_number: values.phoneNumber, address: values.address, status_order: 'chờ xác nhận', products: [...cartPayment]}
                    addOrder(info)
                    console.log('thông tin đơn hàng:', info )
                    navigate('/confirm')
                  }}
              >
                <Form >
                  <div className="mx-60">
                    {/* Họ tên */}
                    <div className='relative'>
                      <i className=" absolute left-0 top-0 text-cyan-800 fa-solid fa-pen w-10 h-10 text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                      <Field type='text' name='fullName'  placeholder="Nhập tên của bạn ..." className=" pl-12 mb-3 outline-none h-10 border-solid border-blue-300 border-2 rounded-lg text-slate-600 font-semibold w-1/2" />
                      <ErrorMessage name='fullName' component="div" className='text-red-500 pb-3'  />
                    </div>
                    {/* Số điện thoại */}
                    <div className='relative'>
                      <i className="text-cyan-800 fa-solid fa-phone w-10 h-10 absolute left-0 top-0 text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                      <Field type='text' name='phoneNumber' placeholder='Nhập số điện thoại của bạn ...' className='pl-12 mb-3 outline-none h-10 border-solid border-blue-300 border-2 rounded-lg text-slate-600 font-semibold w-1/2' />
                      <ErrorMessage name='phoneNumber' component="div" className='text-red-500 pb-3' />
                    </div>
                    {/* Địa chỉ */}
                    <div className='relative'>
                      <i className="text-cyan-800 fa-solid fa-location-dot w-10 h-10 absolute left-0 top-0 text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                        <Field type='text' name='address' placeholder='Nhập địa chỉ của bạn ...' className='pl-12 mb-3 outline-none h-10 border-solid border-blue-300 border-2 rounded-lg text-slate-600 font-semibold w-1/2' />
                        <ErrorMessage name='address' component="div" className='text-red-500 pb-3' />
                    </div>
                  </div>
                    <h1 className='text-2xl font-bold text-upper pt-5 text-blue-600 mx-60'>Thông tin giỏ hàng</h1>
                    <table className='table-fixed mt-10 mb-16 mx-auto rounded-t-lg rounded-b-2xl relative overflow-hidden'>
                        <thead className='bg-amber-200 h-12 text-slate-900 text-lg'>
                        <tr>
                            <th></th>
                            <th>Sản phẩm</th>
                            <th className='w-32'>Số lượng</th>
                            <th className='w-32'>Giá</th>
                            <th className='w-32'>Tổng cộng</th>
                            <th className='w-32'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartPayment.map(item => (
                            <tr key={item.id} className='bg-amber-50 h-44 border-b-2'>
                                <td className='w-20'></td>
                            {/* Sản phẩm */}
                            <td>
                                <div className='flex'>
                                <img src={item.image[0]} alt="Image Product" className='w-28'/>
                                <div className='my-auto mx-10'>
                                    <h1 className='mb-3 font-semibold text-lg'>{item.name}</h1>
                                    <h1>Phân loại: {item.size}</h1>
                                </div>
                                </div>
                            </td>
                            {/* Số lượng */}
                            <td className='w-32  '>
                                <div className='flex justify-center h-10 border-2 rounded-lg'>
                                <i 
                                    className="fa-solid fa-minus cursor-pointer my-auto"
                                    onClick={() => handleDecrease(item.id)}>
                                </i>
                                <input 
                                    className='w-10 mr-1 ml-5 bg-transparent text-xl'
                                    value={item.quantity}
                                    type="number" 
                                    onChange={e => setNum(e.target.value)} />
                                <i 
                                    className="fa-solid fa-plus cursor-pointer my-auto"
                                    onClick={() => handleIncrease(item.id)}></i>
                                </div>
                            </td>
                            {/* Giá */}
                            <td className='w-44 text-lg'>
                                <div className="flex justify-between mx-8 w-32">
                                <h1 className='text line-through'>{item.old_price.toLocaleString('en-us')}</h1>
                                <h1 className='font-bold text-red-500'>{item.new_price.toLocaleString('en-us')}</h1>
                                </div>
                            </td>
                            {/* Tổng cộng */}
                            <td className='w-32 text-center text-lg'>{item.total.toLocaleString('en-us')}</td>
                            {/* Xóa sản phẩm */}
                            <td className='w-32 text-center'>
                                <i className="fa-solid fa-trash cursor-pointer hover:opacity-80" onClick={() => setItemDelete(item.id)} ></i>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className='flex justify-between border-t-2 border-slate-400 mx-32 pb-20'>
                        <h1 className='text-xl pt-10 flex ml-16'><h1 className='font-semibold mr-3'>Thành tiền: </h1>{total.toLocaleString('en-us')}</h1>
                        <h1 className='text-xl pt-10 flex ml-16'><h1 className='font-semibold mr-3'>Phí vận chuyển:</h1>30,000</h1>
                        <h1 className='text-xl pt-10 flex ml-16'><h1 className='font-semibold mr-3'>Tổng cộng: </h1>{(total+30000).toLocaleString('en-us')}</h1>
                        <button 
                          className='text-lg font-semibold px-16 mr-16 mt-8 h-12 bg-cyan-600 align-middle my-auto rounded-lg text-white pt-2 cursor-pointer hover:opacity-90' 
                          type='submit'
                        >Xác nhận</button>
                    </div>
                </Form>
              </Formik>

            </div>

        ): (
            <div className='my-20 mx-32'>
                <h1 className='font-bold text-xl text-center text-red-500'>Không có sản phẩm nào được thanh toán!</h1>
                <img src={empty_cart} alt='Picture Empty Cart' className='w-1/4 mx-auto'/>
            </div>
        )}
    </div>
  )
}
