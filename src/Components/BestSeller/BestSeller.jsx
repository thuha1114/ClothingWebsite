import React, { useMemo } from 'react'
import all_product from '../Assets/all_product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export const BestSeller = () => {

    const result = useMemo(() => {
        const best_seller = all_product.filter(item => item.status === 'best-seller')
        return best_seller
    }, [])
    
    return (
        <div className='mx-24 mb-20'>
            <h1 className='text-center uppercase text-3xl mb-10 font-rowdies border-b-4 border-red-400 w-1/3 mx-auto text-sky-700 pb-2'>Sản phẩm bán chạy</h1>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation={true}
                pagination={true}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                history={{
                  key: 'slide',
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="mySwiper h-[450px]"
            >
                {result.map(product => (
                    <SwiperSlide key={product.id}>
                        <div className='group relative bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:opacity-75 transition ease-in-out duration-200 h-[400px]'>
                            <div>
                                <img src={product.image[0]} className=' w-full h-[330px] '/>
                                <div className='mx-4 my-2 font-semibold '>{product.name}</div>
                            </div>
                            <i className="fa-solid fa-eye absolute top-32 left-1/2 text-3xl hidden group-hover:block cursor-pointer text-slate-800"></i>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        
    )
}
