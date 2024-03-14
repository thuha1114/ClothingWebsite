import React from 'react'
import { BannerForMen } from '../Components/Banner/BannerForMen'
import { Navbar } from '../Components/Navbar/Navbar'
import all_products from '../Components/Assets/all_product'
import { MensProducts } from '../Components/Products/MensProducts'
import { Footer } from '../Components/Footer/Footer'
import { Follow_Products_Men } from '../Components/Follow_Products/Follow_Products_Men'

export const Men = () => {
  return (
    <>
      <Navbar />
      <BannerForMen />
      <MensProducts />
      <Follow_Products_Men />
      <Footer />
    </>
  )
}
