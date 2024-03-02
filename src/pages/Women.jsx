import React, { useState } from 'react'
import { Navbar } from '../Components/NavBar/Navbar'
import { BannerForWomen } from '../Components/Banner/BannerForWomen'
import { WomensProducts } from '../Components/Products/WomensProducts'
import { ProviderContent } from '../Provider/ProviderContent'
import { Follow_Products_Women } from '../Components/Follow_Products/Follow_Products_Women'
import { Footer } from '../Components/Footer/Footer'

export const Women = () => {
  return (
    <>
      <Navbar />
      <BannerForWomen />
      <WomensProducts />
      <Follow_Products_Women />
      <Footer />
    </>
  )
}
