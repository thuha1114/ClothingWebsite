import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {ValueContext} from '../../Provider/ProviderContent'
import not_found from '/images/not_found.png'

export const WomensProducts = () => {
  
  const all_products = useContext(ValueContext)

  const [optionFilter, setOptionFilter] = useState('')
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState(false)

  const list = useMemo( () => {
    const result = all_products.filter(item => item.category === 'women')
    setProducts(result)
    return result
  },[] )

  useEffect(() => {
    if(optionFilter === 'low-to-high'){
      const sorted = list.sort((a,b) => b.new_price - a.new_price)
      setProducts(sorted)
    }
    else if(optionFilter === 'high-to-low'){
      const sorted = list.sort((a,b) => a.new_price - b.new_price)
      setProducts(sorted)
    }
  },[optionFilter, list])

  useEffect( () => {
    if(category === 'jacket'){
      const sorted = list.filter(item => item.sub_category === 'jacket')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'shirt'){
      const sorted = list.filter(item => item.sub_category === 'shirt')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'skirt'){
      const sorted = list.filter(item => item.sub_category === 'skirt')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'trouser'){
      const sorted = list.filter(item => item.sub_category === 'trouser')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'sweater'){
      const sorted = list.filter(item => item.sub_category === 'sweater')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'T-shirt'){
      const sorted = list.filter(item => item.sub_category === 'T-shirt')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'dress'){
      const sorted = list.filter(item => item.sub_category === 'dress')
      setProducts(sorted)
      if(sorted.length === 0){
        setMessage('Rất tiếc, không tìm thấy sản phẩm!')
      }
      else{
        setMessage(false)
      }
    }
    else if (category === 'all'){
      setProducts(list)
      setMessage(false)
    }
  },[category])

  const handleToTop = () => {
    window.scrollTo({top: '0', behavior:'smooth'})
  }
  return (
    <>
      <div className='grid'>
        <h1 className='text-center uppercase text-3xl mb-10 font-rowdies border-b-4 border-red-400 w-1/4 mx-auto text-sky-700 pt-16'>Tất cả sản phẩm</h1> 
        <div className='flex justify-between text-blue-900'>
          {/* Lọc theo danh mục */}
          <div className='ml-36 border-slate-400 my-auto'>
            <ul className='flex justify-between flex-1 mx-5 '>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer " onClick={() => setCategory('all')}>Tất cả</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('jacket')}>Áo khoác</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('shirt')}>Áo sơ mi</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('skirt')}>Váy</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('trouser')}>Quần dài</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('sweater')}>Sweater</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('T-shirt')}>Áo thun</li>
              <li className="hover:border-b-4 mx-5 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold  font-semibold cursor-pointer" onClick={() => setCategory('dress')}>Đầm</li>
            </ul>
          </div>
          {/* Lọc theo giá */}
          <div className='w-[150px]  mr-32 '>
            <div className='border-2 rounded border-slate-400 py-2 px-4 cursor-pointer group relative' >
              <i className="fa-solid fa-filter pr-2 "></i>
              <span className='font-semibold'>Lọc theo giá</span>
              <div className='absolute top-8 right-0 w-full h-8 '></div>
              <ul className='border-2 border-slate-400 rounded absolute w-44 right-0 mt-3 hidden group-hover:block z-10 bg-white'>
                <li className='border-b-2 border-slate-300 px-4 py-1 hover:font-semibold' onClick={() => setOptionFilter('low-to-high')}>Thấp đến cao</li>
                <li className='pl-4 py-1 hover:font-semibold' onClick={() => setOptionFilter('high-to-low')}>Cao đến thấp</li>
              </ul>
            </div>
          </div>

        </div>
        <div className='grid grid-cols-4 gap-8 mx-32 my-12'>
          {products.map(product =>(
            <div key={product.id} className='group relative bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:opacity-75 transition ease-in-out duration-200'>
              <div className="">
                <Link to={`/detail/${product.id}`} onClick = {handleToTop}>
                  <img src={product.image[0]}/>
                  <div className='mx-4 my-2 font-semibold truncate'>{product.name}</div>
                  <div className='flex justify-between px-4 pb-4 text-lg'>
                      <h4 className='font-bold line-through'>{product.old_price}</h4>
                      <h4 className='font-bold text-red-500'>{product.new_price}</h4>
                  </div>

                </Link>
              </div>
              <i className="fa-solid fa-eye absolute top-48 left-1/2 text-3xl hidden group-hover:block cursor-pointer text-slate-800"></i>
            </div>
            
          ))}
        </div>
        {message ? (
            <div className='text-center w-full'>
              <div className='font-bold text-lg text-red-500'>{message}</div>
              <img src={not_found} className="w-1/2 mx-auto"/>
            </div>
          ) : false}
      </div>
    </>
  )
}
