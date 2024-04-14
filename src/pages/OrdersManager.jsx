import React from 'react'
import { orders } from '../Components/Assets/orders'
import { Orders } from '../Components/Orders/Orders'
import { Admin } from './Admin'

export const OrdersManager = () => {


  return (
      <div>
       <div className='relative'>
            <Admin />
            <div className='absolute left-72 top-0 overflow-y-auto h-full pr-10'>
                <Orders />
            </div>
       </div>
        
      </div>
    )
}
