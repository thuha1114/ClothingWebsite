import React from 'react'
import { Admin } from './Admin'
import {Products} from '../Components/Products/Products'

export const ProductsManager = () => {
  return (
    <div className='relative'>
        <Admin />
        <div className='absolute top-0 left-72 overflow-y-auto h-full pr-10'>
            <Products />
        </div>
    </div>
  )
}
