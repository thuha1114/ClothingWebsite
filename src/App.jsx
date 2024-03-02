import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './Components/NavBar/Navbar'
import { Banner } from './Components/Banner/Banner'
import { Category } from './Components/Category/Category'

import { Home } from './pages/Home'
import { Kids } from './pages/Kid'
import { Men } from './pages/Men'
import { Women } from './pages/Women'

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <Outlet/>
    </>
  )
}

export default App
