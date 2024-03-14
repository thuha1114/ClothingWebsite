import React from 'react'
import { BannerForCart } from '../Components/Banner/BannerForCart'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'
import { PaymentCart } from '../Components/PaymentCart/PaymentCart'

export const Payment = () => {
  return (
    <div>
        <Navbar />
        <BannerForCart />
        <PaymentCart />
        <Footer />
    </div>
  )
}
