import React from 'react'
import all_products from '../Components/Assets/all_product'
import { BannerForKid } from '../Components/Banner/BannerForKid'
import { Follow_Products_Kids } from '../Components/Follow_Products/Follow_Products_Kids'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/Navbar/Navbar'
import { KidsProducts } from '../Components/Products/KidsProducts'

export const Kids = () => {
  return (
    <>
    <Navbar />
    <BannerForKid />
    <KidsProducts />
    <Follow_Products_Kids />
    <Footer />
    </>
  )
}
