import React, { useEffect, useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useParams } from 'react-router-dom'
import all_product from '../Assets/all_product';
import { CartList } from '../Cart/CartList';

export const ProductDetail_Info = () => {

    const {id} = useParams();

    const product = useMemo(()=>{
        const result = all_product.filter(item => item.id == id)
        return result
    },[id])


    const [selectedProduct, setSelectedProduct] = useState()

    const sizes = ['XS', 'S', 'M', 'L', 'XL']

    const [selectedSize, setSelectedSize] = useState('')

    const [cartList, setCartList] = useState(() => {
        var storage = JSON.parse(localStorage.getItem('cartList'))
        return storage ? storage : []
    })

    //sử dụng useEffect để SelectedProduct không bị undefined trong lần đầu tiên.
    useEffect(() => {
        setSelectedProduct(product)
    },[product])
    
    const addToCart = () => {

        setCartList(prevCartList => {
            const selected = {...product[0],quantity: 1, size: selectedSize, total: product[0].new_price}
            var update = [...prevCartList, selected]
            localStorage.setItem('cartList', JSON.stringify(update))
            return update
        })
    }


    return (
        <div className='mt-36 mx-24 bg-white shadow-2xl flex'>
            <div className='rounded-lg overflow-hidden cursor-pointer flex-1 pt-10' >
                <div className="w-3/4 pl-32">
                    <Carousel className="">
                        {product[0].image.map((item, index) => (
                            <img key={index} src={item} alt="Images of Product" />
                        ))}
                    </Carousel>                                      
                </div>
            </div>
            <div className='flex-1 mx-4'>
                <div className=' my-2 font-semibold text-xl'>{product[0].name}</div>
                <div className='flex justify-between px-4 pb-4 text-lg w-36'>
                    <h4 className='font-bold line-through'>{product[0].old_price}</h4>
                    <h4 className='font-bold text-red-500'>{product[0].new_price}</h4>
                </div>
                <div>
                    <h1 className='text-xl font-semibold'>Kích thước sản phẩm</h1>
                    <ul className='flex gap-4 py-5'> 
                        {sizes.map( (size, index) => (
                            <li key={index} 
                                //Đổi màu khi click chọn size
                                className={`border-2 h-11 pt-2 w-16 text-center align-middle font-bold rounded-lg inline-block cursor-pointer hover:opacity-90 ${selectedSize === size ? 'bg-cyan-500 text-white' : ''}`}  
                                onClick={() => setSelectedSize(size)}
                                
                            >{size}</li>
                        
                        ))}
                    </ul>
                    <Link to='/cart'>
                        <button 
                            className='border-2 rounded-md h-11 w-96 text-center align-middle pt-1 cursor-pointer bg-cyan-600 text-white font-semibold hover:opacity-90' 
                            onClick={() => addToCart()}
                            >
                        Thêm vào giỏ hàng</button>
                    </Link>
                    <h1 className='text-xl py-5 font-semibold'>Mô tả sản phẩm</h1>
                    <h1 className='text-justify mr-16 leading-7'>{product[0].description}</h1>
                </div>
            </div>
        </div>
    )
}
