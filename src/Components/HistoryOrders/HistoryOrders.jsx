import React, { useEffect, useMemo, useState } from 'react'
import {orders} from '../Assets/orders'

export const HistoryOrders = () => {

    const [currentAcc, setCurrentAcc] = useState(()=>{
        const accStorage = JSON.parse(localStorage.getItem('currentAcc'))
        const acc = accStorage.username
        return acc
    })

    const historyOrders = useMemo(()=>{
        const result = orders.filter(item => item.username === currentAcc)
        return result
    })

    //đổi màu tùy vào trạng thái đơn hàng
    const getStatusColor = (status_order) => {
        if (status_order === 'xác nhận')
            return 'bg-green-500'
        else
            return 'bg-orange-500'
    }

    return (
        <div className='mt-48 mx-32'>
            <div className='uppercase font-bold text-2xl border-l-4 border-red-500 pl-3 text-cyan-700'>Lịch sử đơn hàng</div>
            <table className='mt-10 w-full table-auto divide-y divide-gray-500 rounded-t-lg overflow-hidden rounded-b-lg mb-20 text-cyan-700'>
                <thead className='divide-x divide-gray-500 bg-cyan-600 text-gray-100' >
                    <tr className='text-lg h-12'>
                        <th className='px-5'>Mã Đơn Hàng</th>
                        <th className='pl-8'>Thông Tin Người Nhận</th>
                        <th>Sản Phẩm</th>
                        <th className='w-40'>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody className=" divide-gray-300 bg-stone-100 ">
                    {historyOrders.map(item => (
                        <tr key={item.orderID} className='divide-x divide-gray-500 border-b-2 border-slate-300'>
                            <td className='text-center text-lg font-semibold uppercase'>{item.orderID}</td>
                            <td>
                                <div className='mx-5 py-5 w-72'>
                                    <div><b>Tên:</b> {item.fullname}</div>
                                    <div><b>SĐT:</b> {item.phone_number}</div>
                                    <div><b>Địa chỉ:</b> {item.address}</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    {item.products.map(sp => (
                                        <div key={sp.id} className='flex items-center border-b-2 border-slate-300 last:border-none'>
                                            <img src={sp.image[0]} className='w-32 h-32 my-5 ml-5 bg-white p-2 shadow-2xl rounded-lg' />
                                            <div className='ml-7 '>
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
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}
