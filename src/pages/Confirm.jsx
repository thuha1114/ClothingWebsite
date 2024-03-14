import React from 'react'
import { BannerForCart } from '../Components/Banner/BannerForCart'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'
import { PaymentConfirm } from '../Components/PaymentConfirm/PaymentConfirm'

export const Confirm = () => {
  return (
    <div>
        <Navbar />
        <BannerForCart />
        <PaymentConfirm />
        <Footer />
    </div>
  )
}
