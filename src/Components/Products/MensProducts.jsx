import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ValueContext } from '../../Provider/ProviderContent'
import all_products from '../Assets/all_product'

export const MensProducts = () => {
  const products = useContext(ValueContext)
  return (
    <>
      <div className='grid'>
        <h1 className='text-center uppercase text-3xl mb-10 font-rowdies border-b-4 border-red-400 w-1/4 mx-auto text-sky-700 pt-16'>Tất cả sản phẩm</h1> 
        <div className='w-[150px] place-self-end mr-32 '>
          <div className='border-2 rounded border-slate-400 py-2 px-4 cursor-pointer group relative' >
            <i className="fa-solid fa-filter pr-2 "></i>
            <span className='font-semibold'>Lọc theo giá</span>
            <div className='absolute top-8 right-0 w-full h-8 '></div>
            <ul className='border-2 border-slate-400 rounded absolute w-44 right-0 mt-3 hidden group-hover:block z-10 bg-white'>
              <li className='border-b-2 border-slate-300 px-4 py-1 hover:font-semibold'>Thấp đến cao</li>
              <li className='pl-4 py-1 hover:font-semibold'>Cao đến thấp</li>
            </ul>
          </div>
        </div>
        <div className='grid grid-cols-4 gap-8 mx-32 my-12'>
          {products.filter(item => item.category === 'men').map(product =>(
              <div key={product.id} className=' group relative'>
                <Link to={`${product.id}`}>
                  <div className="bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:opacity-75">
                  <img src={product.image} />
                  <div className='mx-4 my-2 font-semibold'>{product.name}</div>
                  <div className='flex justify-between px-4 pb-4 text-lg'>
                      <h4 className='font-bold line-through'>{product.old_price}</h4>
                      <h4 className='font-bold text-red-500'>{product.new_price}</h4>
                  </div>
                  </div>
                  <i className="fa-solid fa-eye absolute top-1/2 left-1/2 text-3xl hidden group-hover:block cursor-pointer text-slate-800"></i>
                </Link>
              </div>
          ))}
        </div>
      </div>
    </>
  )
}
