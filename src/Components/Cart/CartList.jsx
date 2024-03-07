import React, { useEffect, useState } from 'react'
import empty_cart from "/images/empty_cart.png"

export const CartList = () => {

  const [cartList, setCartList] = useState(() => {
    var storage = JSON.parse(localStorage.getItem('cartList'))
    return storage ? storage : []
  })

    const [showCart, setShowCart] = useState(true)
    const [num, setNum] = useState(1)
    const [itemDelete, setItemDelete] = useState()

  const handleDecrease = (itemId) => {
    setCartList(prevCartList => {
      const updateCart = prevCartList.map(item => {
        if(item.id === itemId && item.quantity > 1){
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      localStorage.setItem('cartList',JSON.stringify(updateCart))
      return updateCart
    })
  };

  const handleIncrease = (itemId) => {
    setCartList(prevCartList => {
      const updateCart = prevCartList.map(item => {
        if(item.id === itemId && item.quantity < 10){
            return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      localStorage.setItem('cartList', JSON.stringify(updateCart));
      return updateCart
    })
  };

    //không render được cartList khi xóa sp, phải reload lại trang mới cập nhật.
    useEffect(() => {
      if (itemDelete) {
        setCartList(prevCartList => {
          const updatedCartList = prevCartList.filter(item => item.id !== itemDelete);
          localStorage.setItem('cartList', JSON.stringify(updatedCartList));
          return updatedCartList;
        });
      }
    }, [itemDelete]);

    useEffect(()=> {
      if(cartList.length > 0)
        setShowCart(true)
      else if(cartList.length == 0)
        setShowCart(false)
    },[cartList])
    
  return (
    //border radius table
    <div>
      {showCart ? (
        <div>
          <table className='table-fixed mt-16 mb-10 mx-auto rounded-t-lg rounded-b-2xl relative overflow-hidden'>
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
              {cartList.map(item => (
                <tr key={item.id} className='bg-amber-50 h-44 border-b-2'>
                  <td className='w-20'>
                    <input type="checkbox" className='ml-8' />
                  </td>
                  {/* Sản phẩm */}
                  <td>
                    <div className='flex'>
                      <img src={item.image[0]} alt="Image Product" className='w-28'/>
                      <div className='my-auto mx-10'>
                        <h1 className='mb-3 font-semibold text-lg'>{item.name}</h1>
                        <h1>Phân loại: S</h1>
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
                  <td className='w-32 text-center text-lg'>100.000đ</td>
                  {/* Xóa sản phẩm */}
                  <td className='w-32 text-center'>
                    <i className="fa-solid fa-trash cursor-pointer hover:opacity-80" onClick={() => setItemDelete(item.id)} ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-between border-t-2 mx-32 pb-20'>
            <h1 className='text-xl font-semibold pt-10 '>Thành tiền: 100.000đ</h1>
            <h1 className='text-lg font-semibold px-10 mt-8 h-12 bg-cyan-600 align-middle my-auto rounded-lg text-white pt-3 cursor-pointer hover:opacity-90'>Tiến hành thanh toán</h1>
          </div>

        </div>
      ) : (
        <div className='my-20 mx-32'>
          <h1 className='font-bold text-xl text-center text-red-500'>Không tồn tại sản phẩm nào trong giỏ hàng!</h1>
          <img src={empty_cart} alt='Picture Empty Cart' className='w-1/4 mx-auto'/>
        </div>
      )}

    </div>
  )
}
