import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import all_product from '../Assets/all_product'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export const RelatedProduct = () => {
    const {id} = useParams()

    const product = useMemo(()=>{
        const result = all_product.filter(item => item.id == id)
        return result
    },[id])

    const category = product[0].category;
    const sub_category = product[0].sub_category;

    const relatedPrducts = useMemo(() => {
        const result = all_product.filter(item => item.category == category && item.sub_category == sub_category)
        return result
    },[category, sub_category])


    const handleToTop = () => {
        window.scrollTo({top: '0', behavior: 'smooth'})
    }
    return (
        <div className='mx-32 mb-32'>
            <h1 className='text-center uppercase text-3xl mb-10 font-rowdies border-b-4 border-red-400 w-1/3 mx-auto text-sky-700 pb-5 pt-24'>Sản phẩm liên quan</h1>
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
                {relatedPrducts.map(product => (
                    <SwiperSlide key={product.id}>
                        <Link to={`/detail/${product.id}`} onClick={handleToTop}>
                            <div className='group relative bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:opacity-75 transition ease-in-out duration-200 h-[400px]'>
                                <div>
                                    <img src={product.image[0]} className=' w-full h-[330px] '/>
                                    <div className='mx-4 my-2 font-semibold '>{product.name}</div>
                                </div>
                                <i className="fa-solid fa-eye absolute top-32 left-1/2 text-3xl hidden group-hover:block cursor-pointer text-slate-800"></i>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        
    )
}
