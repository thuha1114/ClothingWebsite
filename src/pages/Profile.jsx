import React from 'react'
import { Footer } from '../Components/Footer/Footer'
import { Navbar } from '../Components/NavBar/Navbar'
import { ProfileContainer } from '../Components/ProfileContainer/ProfileContainer'

export const Profile = () => {
  return (
    <div>
        <Navbar />
        <ProfileContainer />
        <Footer />
    </div>
  )
}
