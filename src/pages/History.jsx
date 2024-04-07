import React, { useMemo, useState } from 'react'
import { HistoryOrders } from '../Components/HistoryOrders/HistoryOrders'
import {Navbar} from '../Components/NavBar/Navbar'
import {Footer} from '../Components/Footer/Footer'

export const History = () => {
    return (
        <div>
            <Navbar />
            <HistoryOrders />
            <Footer />
        </div>
    )
}
