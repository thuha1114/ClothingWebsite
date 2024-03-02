import React from 'react'
import bannerImg from '/images/banner.png'

export const Banner = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-300 via-sky-200 to-purple-200 relative mt-32'>
      <img src={bannerImg} alt="Banner Image" className='w-80 ml-24' />
      <div className='absolute top-28 left-96 pl-48'>
          <div className='w-3/4'>
              <h2 className='uppercase font-semibold text-3xl font-rowdies pb-4 text-blue-800'>Hãy cùng khám phá bộ sưu tập mới của chúng tôi</h2>
              <span className='font-gowun text-lg text-blue-900 font-semibold' >Thời trang là vĩnh cửu. Quần áo sành điệu là thức uống được giới trẻ ưa chuộng. Có nhiều cách để bạn có thể tìm được 
                  Quần áo sành điệu theo nhu cầu của bạn. Đó là cơ hội tốt nhất dành cho bạn, hãy khám phá cùng chúng tôi nhé!</span>
          </div>
          <button className='mx-72 mt-10 font-gowun w-48 h-12 border-2 rounded-full bg-blue-600 text-white hover:scale-105 font-bold motion-safe:animate-bounce'>Xem thêm<i className="ml-2 fa-solid fa-angles-right"></i></button>
      </div>
    </div>
  )
}
