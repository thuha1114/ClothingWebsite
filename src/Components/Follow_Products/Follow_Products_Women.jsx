import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ValueContext } from '../../Provider/ProviderContent'

export const Follow_Products_Women = () => {

    const all_products = useContext(ValueContext)
  

    const list = useMemo(()=>{
        const random = Math.floor(Math.random() * 6)
        const results = all_products.filter(item => item.category === 'women').slice(random,random + 4)
        return results
    },[])

      const [index, setIndex] = useState(0);
      const length = 3; // number of items in the carousel

    const handlePrevious = () => {
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? length - 1 : newIndex);
    };
  
    const handleNext = () => {
      const newIndex = index + 1;
      setIndex(newIndex >= length ? 0 : newIndex);
    };
    return (
        <div className='mb-24'>
          <div className='text-center text-3xl my-16 font-bold font-rowdies text-cyan-700'>Theo dõi các sản phẩm trên trang Instagram của chúng tôi!</div>
          <div className='grid grid-cols-4 gap-8 mx-32'>
            {list.map(item => (
              <div key= {item.id} className='cursor-pointer bg-white py-4 border-2 rounded-md shadow-xl hover:scale-110 hover:opacity-85 transition ease-in-out duration-300'>
                <img src={item.image[0]} alt="" className='w-3/4 mx-auto'/>
              </div>
            ))}
          </div>
        </div>
    )
}
