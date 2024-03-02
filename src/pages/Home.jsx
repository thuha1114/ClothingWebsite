import React from 'react'
import { Banner } from '../Components/Banner/Banner'
import { BestSeller } from '../Components/BestSeller/BestSeller'
import { Category } from '../Components/Category/Category'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'
import { NewCollection } from '../Components/NewCollection/NewCollection'

export const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Category />
      <NewCollection />
      <BestSeller />
      <Footer />
    </>
  )
}
