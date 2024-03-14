import React, { useEffect, useState } from 'react'

export const BtnGoUp = () => {

    const [showBtn, setShowBtn] = useState(false)

    const handleScroll = () => {
        if(window.scrollY >= '800')
            setShowBtn(true)
        else
            setShowBtn(false)
    }
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    },[])

    const handleScrollToTop = () => {
        window.scrollTo({top: '0', behavior: 'smooth'})
    }

    return (
        <>
            {showBtn && (
                <i 
                    className="fa-solid fa-arrow-up fixed bottom-10 left-10  cursor-pointer text-2xl hover:opacity-85 text-slate-700"
                    onClick = {handleScrollToTop}
                ></i>
            )}
        </>
    )
}
