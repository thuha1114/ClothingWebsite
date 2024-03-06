import React from 'react'
import { CartList } from '../Components/Cart/CartList'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'

export const Cart = () => {
  return (
    <div>
        <Navbar />
        <CartList />
        <Footer />
    </div>
  )
}
