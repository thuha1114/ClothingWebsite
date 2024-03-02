import React from 'react'

export const Category = () => {

    const companyLogo = [
        {id:1, img:'/company/brand1.png'},
        {id:2, img:'/company/brand2.png'},
        {id:3, img:'/company/brand3.png'},
        {id:4, img:'/company/brand4.png'},
        {id:5, img:'/company/brand5.png'}
    ]
    return (
        <div className='flex justify-between mx-48 my-20'>
            {companyLogo.map(item=>(
                <img key={item.id} src={item.img} className='w-36'/>
            ))}
        </div>
    )
}
