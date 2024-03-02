import React from 'react'

export const CartList = () => {

    const cartList = JSON.parse(localStorage.getItem('cartList'))
    console.log(cartList)
  return (
    <div>
        <h1>{cartList.length}</h1>
        {cartList.map(item => (
            <li key={item.id}>
                <h1>{item.id}</h1>
                <h1>{item.name}</h1>
                <h1>{item.category}</h1>
                <h1>{item.new_price}</h1>
                <h1>{item.old_price}</h1>
            </li>
        ))}

    </div>
  )
}
