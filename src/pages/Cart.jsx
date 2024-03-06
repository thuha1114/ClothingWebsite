import React from 'react'
import { BannerForCart } from '../Components/Banner/BannerForCart'
import { CartList } from '../Components/Cart/CartList'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'

export const Cart = () => {
  return (
    <div>
        <Navbar />
        <BannerForCart />
        <CartList />
        <Footer />
    </div>
  )
}
