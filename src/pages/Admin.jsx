
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import React from 'react'
import mainImage from '../../public/images/adminpage.jpg';

export const Admin = () => {
  return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			
			<div className="flex flex-col flex-1">
				<div className="flex items-center justify-end py-2">
					<div className="overflow-hidden w-full h-1200 rounded-lg border border-gray-300">
						<img
						src={mainImage}
                        alt="Main Image"
                        className="object-cover w-full h-full"
                        />
                    </div>
                </div>
				
				
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
    )
}


  