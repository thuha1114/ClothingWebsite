import React from 'react'
import all_products from '../Components/Assets/all_product'
import { BannerForKid } from '../Components/Banner/BannerForKid'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/Navbar/Navbar'
import { KidsProducts } from '../Components/Products/KidsProducts'

export const Kids = () => {
  return (
    <>
    <Navbar />
    <BannerForKid />
    <KidsProducts />
    <Footer />
    </>
  )
}
