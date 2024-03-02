import React from 'react'
import { ProductDetail_Info } from '../Components/Detail/ProductDetail_Info'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'
import { RelatedProduct } from '../Components/RelatedProduct/RelatedProduct'

export const ProductDetail = () => {
  return (
      <>
        <Navbar />
        <ProductDetail_Info />
        <RelatedProduct />
        <Footer />
      </>
  )
}
