import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useState } from "react";
import mainImage from '../../../public/images/logo.png';
import { useNavigate } from 'react-router-dom'

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [currentAcc, setCurrentAcc] = useState(()=>{
    const acc = JSON.parse(localStorage.getItem('currentAcc'))
    return acc ? acc : ''
  })

  console.log('nguời dùng hiện tại: ', currentAcc)

  const navigate = useNavigate()
  
  const handleLogOut = () => {
    localStorage.removeItem('currentAcc')
		navigate('/login')
	}
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={mainImage}
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
          <li className="mb-3">
            <Link to="/admin/products_manager" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <span>Quản lý sản phẩm</span>
              <span>+</span>
            </Link>
          </li>
          
          <li>
            <Link to="/admin/orders_manager" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <span>Quản lý đơn hàng</span>
              <span>→</span>
            </Link>
          </li>
        </ul>

        <div 
          className='ml-5 mb-5 font-semibold flex cursor-pointer hover:opacity-90'
          onClick={handleLogOut}>
            <i className="fa-solid fa-arrow-left mr-3 my-auto"></i>
            <h1 >Thoát</h1>
        </div>
        <div className="border-t flex p-3">
          <i className="fa-solid fa-user-tie text-2xl"></i>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold"><b>Admin:</b> {currentAcc.username}</h4>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

