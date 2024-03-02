import React, { createContext } from 'react'
import all_product from '../Components/Assets/all_product'

const ValueContext = createContext()

const ProviderContent = ({children}) => {
  return (
    <ValueContext.Provider value={all_product}>
        {children}
    </ValueContext.Provider>
  )
}

export {ProviderContent, ValueContext}

