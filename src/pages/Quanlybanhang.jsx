import React from 'react'
import { orders } from '../Components/Assets/orders'
import { Orders } from '../Components/Orders/Orders'
import Header from '../Components/Header/Header'
import { Admin } from './Admin'

export const Quanlybanhang = () => {


  return (
      <div>
       <div className='relative'>
            <Admin />
            <div className='absolute left-0 top-0'>
                <Orders />
            </div>
       </div>
        
      </div>
    )
}
