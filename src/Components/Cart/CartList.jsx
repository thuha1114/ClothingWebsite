import React, { useEffect, useState } from 'react'

export const CartList = () => {

  const [cartList, setCartList] = useState(() => {
    var storage = JSON.parse(localStorage.getItem('cartList'))
    return storage ? storage : []
})

    const [num, setNum] = useState(1)
    const [itemDelete, setItemDelete] = useState()

    const handleDecrease = () => {
      setNum(num - 1)
      if(num === 0)
        setNum(0)
    }

    const handleIncrease = () => {
      setNum(num + 1)
      if(num === 10)
        setNum(10)
    }

    //không render được cartList khi xóa sp, phải reload lại trang mới cập nhật.
    useEffect(() => {
      const result = cartList.filter(item => item.id !== itemDelete)
      localStorage.setItem('cartList',  JSON.stringify(result))
      setCartList(result)
    },[itemDelete])
  return (
    //border radius table
    <table className='table-fixed mt-40 mb-20 mx-auto rounded-t-lg rounded-b-2xl relative overflow-hidden'>
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
                  onClick={handleDecrease}>
                </i>
                <input 
                  className='w-8 mr-3 ml-5 bg-transparent text-xl'
                  value={num}
                  type="number" 
                  onChange={e => setNum(e.target.value)} />
                <i 
                  className="fa-solid fa-plus cursor-pointer my-auto"
                  onClick={handleIncrease}></i>
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
              {/* <i className="fa-solid fa-trash cursor-pointer hover:opacity-80" onClick={handleDelete(item.id)} ></i> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
