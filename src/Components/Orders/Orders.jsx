import { saveAs } from 'file-saver'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { orders } from '../Assets/orders'
import empty_order from '../../../public/images/empty_orders.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Orders = () => {

    const getStatusColor = (status_order) => {
        if (status_order === 'xác nhận')
            return 'bg-green-500'
        else
            return 'bg-orange-500'
    }

    const [selectedOrder, setSelectedOrder] = useState()
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [updatedOrders, setUpdatedOrders] = useState(orders)
    const [optionFilter, setOptionFilter] = useState('')
    const [showTable, setShowTable] = useState(true)

    const handleEdit = (id) => {
        console.log("selected id product is: ", id)
        const result = orders.filter(item => item.orderID === id)
        setSelectedOrder(result)
        setShow(true)
    }

    const handleHide = () => {
        setShow(false)
    }

    useEffect(() => {
        if (selectedOrder !== undefined && status) {
            const updatedOrder = selectedOrder[0];
            updatedOrder.status_order = status;
    
            const updatedOrdersList = orders.map(order => {
                if (order.orderID === updatedOrder.orderID) {
                    return updatedOrder;
                }
                return order;
            });
    
            setUpdatedOrders(updatedOrdersList);
        }
    }, [status, selectedOrder, orders]);

    const notify = () => {
        toast.success('Xác nhận thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'notify',
            style: {
                color: 'green', 
            },
        });
    };

    const saveOrderToFile = () => {
        const data = `let orders = ${JSON.stringify(updatedOrders, null, 2)};\n\nexport { orders };`;
        const blob = new Blob([data], { type: 'text/javascript;charset=utf-8' });
        const ordersFile = new File([blob], "orders.js", { type: 'text/javascript;charset=utf-8' });
    
        saveAs(ordersFile)
    };

    useEffect(()=>{
        if(optionFilter === 'confirmed'){
            const result = orders.filter(item => item.status_order === 'xác nhận')
            if(result.length === 0)
                setShowTable(false)
            else{
                setUpdatedOrders(result)
                setShowTable(true)
            }
           
        }
        if(optionFilter === 'wait-for-confirm'){
            const result = orders.filter(item => item.status_order === 'chờ xác nhận')
            setUpdatedOrders(result)
            if(result.length === 0)
                setShowTable(false)
            else{
                setUpdatedOrders(result)
                setShowTable(true)
            }
        }
        if(optionFilter === 'all'){
            setUpdatedOrders(orders)
            setShowTable(true)
        }
    }, [optionFilter, orders])


    console.log('lựa chọn là: ', optionFilter)
    console.log('đơn hàng là: ', updatedOrders)


  return (
      <div className='mt-10 ml-5 relative '>
            <div className='uppercase font-bold border-l-4 border-red-500 pl-3 text-cyan-700 text-lg'>Danh sách đơn hàng</div>
            {/* Lọc theo trạng thái đơn hàng*/}
            <div className='w-60 mr-14 bg-white my-5 text-cyan-800'>
                <div className='border-2 rounded border-slate-400 py-2 px-4 cursor-pointer group relative' >
                <i className="fa-solid fa-filter pr-2 "></i>
                <span className='font-semibold'>Trạng thái đơn hàng</span>
                <div className='absolute top-8 right-0 w-full h-8 '></div>
                <ul className='border-2 border-slate-400 rounded absolute w-60 right-0 mt-3 hidden group-hover:block z-10 bg-white'>
                    <li className='border-b-2 border-slate-300 px-4 py-1 hover:font-semibold' onClick={() => setOptionFilter('confirmed')}>Xác nhận</li>
                    <li className='border-b-2 border-slate-300 pl-4 py-1 hover:font-semibold' onClick={() => setOptionFilter('wait-for-confirm')}>Chờ xác nhận</li>
                    <li className='pl-4 py-1 hover:font-semibold' onClick={() => setOptionFilter('all')}>Tất cả</li>
                </ul>
                </div>
            </div>
            {showTable ? (
                <table className='mt-5 table-auto divide-y divide-gray-500 rounded-t-lg overflow-hidden rounded-b-lg mb-20 text-cyan-700'>
                    <thead className='divide-x divide-gray-500 bg-cyan-600 text-gray-100' >
                        <tr className='h-12'>
                        <th className='px-12'>Mã</th>
                        <th className='pl-3'>Thông Tin Người Nhận</th>
                        <th>Sản Phẩm</th>
                        <th className='w-40'>Trạng Thái</th>
                        <th className='w-28'>Tháo tác</th>
                        </tr>
                    </thead>
                    <tbody className=" divide-gray-300 bg-stone-100 ">
                        {updatedOrders.map(item => (
                            <tr key={item.orderID} className='divide-x divide-gray-500 border-b-2 border-slate-300'>
                                <td className='text-center font-semibold uppercase'>{item.orderID}</td>
                                <td>
                                    <div className='mx-5 py-5'>
                                        <div><b>Tài khoản:</b> {item.username}</div>
                                        <div><b>Tên:</b> {item.fullname}</div>
                                        <div><b>SĐT:</b> {item.phone_number}</div>
                                        <div className='w-48'><b>Địa chỉ:</b> {item.address}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        {item.products.map(sp => (
                                            <div key={sp.id} className='flex items-center border-b-2 border-slate-300 last:border-none'>
                                                <img src={sp.image[0]} className='w-32 h-32 my-5 ml-5 bg-white p-2 shadow-2xl rounded-lg' />
                                                <div className='ml-7 w-96 '>
                                                    <div><b>Tên sản phẩm:</b> {sp.name}</div>
                                                    <div><b>Số lượng:</b> {sp.quantity}</div>
                                                    <div><b>Kích thước:</b> {sp.size}</div>
                                                    <div><b>Giá:</b> {sp.total.toLocaleString('us-en')}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className={`text-center font-semibold border-2 rounded-xl text-white py-2 mx-2 capitalize ${getStatusColor(item.status_order)}`}>{item.status_order}</div>
                                </td>
                                <td 
                                    className='text-center'
                                >
                                    <i 
                                        className="fa-regular fa-pen-to-square cursor-pointer hover:opacity-80 text-xl"
                                        onClick={() => handleEdit(item.orderID)}
                                    ></i>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            ): (
                <div className="flex justify-center items-center ">
                    <img src={empty_order} className="" alt="Empty Order" />
                </div>
                // <h1>Không có dữ liệu</h1>
            )}
                        
            {/* Form sửa thông tin */}
            {show && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <i 
                        className="fa-solid fa-x top-5 left-3/4 ml-10 absolute text-xl cursor-pointer font-bold"
                        onClick={handleHide}
                    ></i>
                    <div className='w-1/2 bg-white py-10 rounded-xl overflow-auto h-5/6'>
                        <div className='text-center uppercase font-bold text-xl pb-7 text-cyan-500'>Form cập nhật trạng thái đơn hàng</div>
                        <Formik
                            initialValues={{
                                orderID : '',
                                username: '',
                                fullname: '',
                                phone_number: '',
                                address: '',
                                products:'',
                                status_order: '',
                            }}
                            onSubmit= {(value, {setSubmitting}) => {
                                saveOrderToFile()
                                notify()
                            }}
                        >
                            <Form>
                                {/* Mã đơn hàng */}
                                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200 mb-5">
                                    <i className=" text-cyan-800 fa-solid fa-key w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                    <Field type="text" name="orderID" value={`${selectedOrder === undefined ? '' : selectedOrder[0].orderID}`} placeholder="Mã đơn hàng ..." className='outline-none w-3/4 pl-5 text-blue-400 font-semibold uppercase' />
                                </div>
                                {/* Tài khoản */}
                                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200 mb-5">
                                    <i className=" text-cyan-800 fa-solid fa-user w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                    <Field type="text" name="username" value={`${selectedOrder === undefined ? '' : selectedOrder[0].username}`} placeholder="Mã đơn hàng ..." className='outline-none w-3/4 pl-5 text-blue-400 font-semibold' />
                                </div>
                                {/* Họ Tên */}
                                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200  mb-5">
                                    <i className=" text-cyan-800 fa-solid fa-file-signature w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                    <Field type="text" name="fullname" value={`${selectedOrder === undefined ? '' : selectedOrder[0].fullname}`} placeholder="Mã đơn hàng ..." className='outline-none w-3/4 pl-5 text-blue-400 font-semibold capitalize' />
                                </div>
                                {/* Số điện thoại */}
                                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200  mb-5">
                                    <i className=" text-cyan-800 fa-solid fa-phone w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                    <Field type="text" name="phone_number" value={`${selectedOrder === undefined ? '' : selectedOrder[0].phone_number}`} placeholder="Mã đơn hàng ..." className='outline-none w-3/4 pl-5 text-blue-400 font-semibold capitalize' />
                                </div>
                                {/* Địa chỉ */}
                                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200  mb-5">
                                    <i className=" text-cyan-800 fa-solid fa-map w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                    <Field type="text" name="address" value={`${selectedOrder === undefined ? '' : selectedOrder[0].address}`} placeholder="Mã đơn hàng ..." className='outline-none w-3/4 pl-5 text-blue-400 font-semibold capitalize' />
                                </div>
                                {/* Sản phẩm */}
                                <div className='mx-24'>
                                    <div className='font-bold text-lg uppercase'>Sản phẩm</div>
                                    {
                                        selectedOrder[0].products.map(sp =>(
                                            <div key={sp.id} className='flex items-center border-b-2 border-slate-300 last:border-none'>
                                                <img src={sp.image[0]} className='w-32 h-32 my-5 ml-5 bg-white p-2 shadow-2xl rounded-lg' />
                                                <div className='ml-7 '>
                                                    <div><b>Tên sản phẩm:</b> {sp.name}</div>
                                                    <div><b>Số lượng:</b> {sp.quantity}</div>
                                                    <div><b>Kích thước:</b> {sp.size}</div>
                                                    <div><b>Giá:</b> {sp.total.toLocaleString('us-en')}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* Trạng thái đơn hàng */}
                                <div className="border-2 rounded-lg mx-24 h-10 border-blue-200  mb-5 mt-5">
                                    <i className="text-cyan-800 fa-solid fa-pen w-10 h-full text-xl pt-1 text-center my-auto border-r-2 border-blue-200 opacity-70 align-middle"></i>
                                    <Field as="select" name="status_order" className='outline-none pl-5 text-blue-400 font-semibold capitalize w-5/6' onChange={(e) => setStatus(e.target.value)}>
                                        {/* <option value="">Chọn trạng thái</option> */}
                                        <option value={`${selectedOrder === undefined ? '' : selectedOrder[0].status_order}`}>{`${selectedOrder === undefined ? '' : selectedOrder[0].status_order}`}</option>
                                        <option value="xác nhận">xác nhận</option>
                                        <option value="chờ xác nhận">chờ xác nhận</option>
                                    </Field>
                                </div>
                                {/* Nút xác nhận */}
                                <div className='w-full flex justify-center'>
                                    <button
                                        className='px-auto h-10 border-2 rounded-md text-center my-5 font-semibold text-lg cursor-pointer border-blue-200 bg-blue-600 text-white hover:opacity-90 w-full mx-24  '
                                        type="submit"
                                    >Xác nhận</button>

                                </div>
                            </Form>

                        </Formik>
                        <ToastContainer />
                    </div>
                </div>
            )}
        </div>
    )
}
