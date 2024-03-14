import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import empty_cart from "/images/empty_cart.png"

export const PaymentCart = () => {

    const [showCart, setShowCart] = useState(true)

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

      const [num, setNum] = useState()

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
            <table className='table-fixed mt-16 mb-16 mx-auto rounded-t-lg rounded-b-2xl relative overflow-hidden'>
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
                        <div className="flex justify-between mx-8">
                        <h1 className='text line-through'>{item.old_price}</h1>
                        <h1 className='font-bold text-red-500'>{item.new_price}</h1>
                        </div>
                    </td>
                    {/* Tổng cộng */}
                    <td className='w-32 text-center text-lg'>{item.total}</td>
                    {/* Xóa sản phẩm */}
                    <td className='w-32 text-center'>
                        <i className="fa-solid fa-trash cursor-pointer hover:opacity-80" onClick={() => setItemDelete(item.id)} ></i>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='flex justify-between border-t-2 border-slate-400 mx-32 pb-20'>
                <h1 className='text-xl pt-10 flex ml-16'><h1 className='font-semibold mr-3'>Thành tiền: </h1>{total}</h1>
                <Link to="/confirm">
                    <h1 className='text-lg font-semibold px-16 mr-16 mt-8 h-12 bg-cyan-600 align-middle my-auto rounded-lg text-white pt-3 cursor-pointer hover:opacity-90' >Xác nhận</h1>
                </Link>
            </div>

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
