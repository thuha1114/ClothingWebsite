import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { json, Link, useNavigate } from 'react-router-dom'
import logo from '/images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import all_product from '../Assets/all_product'


export const Navbar = () => {

    const navItems = [
        {title:'Đồ nữ', path:'/women'},
        {title:'Đồ nam', path:'/men'},
        {title:'Đồ trẻ em', path:'/kids'}
    ]

    const [cartList, setCartList] = useState(() => {
        var storage = JSON.parse(localStorage.getItem('cartList'))
        return storage ? storage : []
    })

    const handleToTop = () => {
        window.scrollTo({top: '0', behavior:'smooth'})
    }

    const [ currentAcc, setCurrentAcc] = useState(()=>{
        const currentAcc = JSON.parse(localStorage.getItem('currentAcc'))
        return currentAcc ? currentAcc : false
    })

    console.log(currentAcc)

    const [isAcc, setIsAcc] = useState(()=>{
        return currentAcc ? true : false
    })

    const navigate = useNavigate()

    const notify = () => {
        toast.error('Phải đăng nhập để có thể xem được giỏ hàng!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                fontWeight: 'lighter'
            }
        });
    };

    const handleCart = () => {
        if(isAcc)
            navigate('/cart')
        else
            notify()
    }

    useEffect(()=>{
        if(!isAcc)
            setCartList([])
    },[isAcc])

    const handleLogOut = () => {
        localStorage.removeItem('currentAcc')
        setIsAcc(false)
        navigate('/')
    }

    const [input, setInput] = useState('')
    const [searchItem, setSearchItem] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)

    console.log(input)

    useEffect(()=>{
        if(input === '' || !showSearchResults)
            setSearchItem([])
        else {
            const result = all_product.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
            setSearchItem(result)
        }
    },[input])

    return (
        <>
            <header className='flex px-32 text-blue-900 fixed top-0 mb-96 ht-32 bg-blue-200/90 z-10 w-full font-semibold '>
                    
                <Link to="/">
                    <img src={logo} alt='Logo for Website' className='size-32 flex-none cursor-pointer'/>
                </Link>
                <ul className='flex justify-between flex-1 mx-20 m-auto w-28'>
                    {navItems.map(({title, path, category}) =>(
                        <li key={title} className="hover:border-b-4 hover:border-red-400 transition ease-in-out duration-300 hover:font-bold" >
                            <Link to={path} onClick={handleToTop}>{title}</Link>
                        </li>
                    ))}
                </ul>
                {/* Thanh tìm kiếm */}
                <div className=' relative m-auto'>
                    <input  
                        className='border-2 rounded-full border-slate-400 w-60 h-8 pl-8 text-sm font-normal border-sky-700 focus:outline-none'
                        placeholder='Nhập nội dung tìm kiếm ...'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onFocus = {() => setShowSearchResults(true)}
                        onBlur= {() => setShowSearchResults(false)}
                    />
                    <i className="fa-solid fa-magnifying-glass cursor-pointer absolute left-2 top-2"></i>
                    {/* Sản phẩm liên quan đến từ khóa tìm kiếm */}
                    <div className='absolute bg-white shadow-custom-shadow rounded-md overflow-y-auto max-h-96 overflow-hidden top-9'>
                        {searchItem.map(item => (
                            <Link to={`/detail/${item.id}`} key={item.id}>
                                <div  className='px-3 border-b-2 flex w-96 cursor-pointer hover:bg-blue-100'>                           
                                    <img src={item.image[0]} alt="Hỉnh ảnh sản phẩm" className='w-16 h-16 my-3' />                               
                                    <div className='my-auto ml-5 w-3/4'>
                                        <h1 className='truncate'>{item.name}</h1>
                                        <div className='flex justify-between w-24'>
                                            <h1 className='line-through '>{item.old_price}</h1>
                                            <h1 className='text-red-500 font-bold'>{item.new_price}</h1>
                                        </div>
                                    </div>                 
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                
                {/* <Link to="/cart" className=' mx-10 m-auto cursor-pointer relative hover:opacity-85'> */}
                <div 
                    className=' mx-10 m-auto cursor-pointer relative hover:opacity-85'
                    onClick={handleCart}>
                    <i className="fa-solid fa-cart-shopping">
                        <span className='w-4 h-4 rounded-full bg-red-400 text-xs absolute bottom-3 left-2 text-center'>{isAcc ? cartList.length : 0}</span>
                    </i>
                </div>
                <ToastContainer />
                {/* </Link> */}
                {isAcc ? (
                    <div className="mx-4 m-auto flex">
                        <i className="fa-solid fa-circle-user text-2xl mx-3 text-blue-700"></i>
                        <h1 className='text-lg group relative cursor-pointer'>{currentAcc.username}
                            <ul className='text-base absolute w-40 bg-white rounded-lg shadow-custom-shadow hidden group-hover:block'>
                                <li className='py-1 border-b-2 pl-3 cursor-pointer hover:font-bold'>Tài khoản cá nhân</li>
                                <li className='py-1 border-b-2 pl-3 cursor-pointer hover:font-bold'>Lịch sử đơn hàng</li>
                                <li 
                                    className='py-1 pl-3 cursor-pointer hover:font-bold'
                                    onClick={handleLogOut}>Đăng xuất</li>
                            </ul>
                        </h1>
                    </div>
                ) : (              
                    <div className='mx-4 m-auto'>
                        <Link to='/login'>
                            <button className='border-2 border-sky-700 rounded-full w-28 h-10 mr-4 hover:bg-sky-500 hover:text-slate-50 hover:font-semibold'>Đăng nhập</button>
                        </Link>
                        <Link to='/signup'>
                            <button className='border-2 border-sky-700 rounded-full w-28 h-10 hover:bg-sky-500 hover:text-slate-50 hover:font-semibold'>Đăng ký</button>
                        </Link>
                    </div>
                )}
            </header>
            <Carousel>

            </Carousel>
        </>
    )
}
