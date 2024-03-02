import React from 'react'
import new_collection from '../Assets/new_collections'
export const NewCollection = () => {
  return (
    <>
        <h1 className='text-center uppercase text-3xl mb-10 font-rowdies border-b-4 border-red-400 w-1/4 mx-auto text-sky-700 pb-2'>Bộ sưu tập mới</h1>
        <div className='grid grid-cols-4 gap-8 mx-32 my-20'>
            {new_collection.map(item => (
                <div key={item.id} className='group relative bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:opacity-75 transition ease-in-out duration-200'>
                <div className="">
                  <img src={item.image} className='w-full h-80'/>
                  <div className='mx-4 my-2 font-semibold'>{item.name}</div>
                  <div className='flex justify-between px-4 pb-4 text-lg'>
                      <h4 className='font-bold line-through'>{item.old_price}</h4>
                      <h4 className='font-bold text-red-500'>{item.new_price}</h4>
                  </div>
                </div>
                <i className="fa-solid fa-eye absolute top-48 left-1/2 text-3xl hidden group-hover:block cursor-pointer text-slate-800"></i>
              </div>
            ))}
        </div>
    </>
  )
}
