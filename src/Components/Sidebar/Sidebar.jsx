// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
// import { useContext, createContext, useState } from "react";
// import mainImage from '../../../public/images/logo.png';


// const SidebarContext = createContext();

// export default function Sidebar({ children }) {
//   const [expanded, setExpanded] = useState(true);
  
//   return (
//     <aside className="h-screen">
//       <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//         <div className="p-4 pb-2 flex justify-between items-center">
//           <img
//             src={mainImage}
//             className={`overflow-hidden transition-all ${
//               expanded ? "w-20" : "w-0"
//             }`}
//             alt=""
//           />
//           <button
//             onClick={() => setExpanded((curr) => !curr)}
//             className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
//           >
//             {expanded ? <ChevronFirst /> : <ChevronLast />}
//           </button>
//         </div>

//         <SidebarContext.Provider value={{ expanded }}>
//           <ul className="flex-1 px-3">{children}</ul>
//         </SidebarContext.Provider>

//         <div className="border-t flex flex-col p-3">
//           <div className="flex items-center mb-3">
//             <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
//               <span>Thêm sản phẩm</span>
//               <span>+</span>
//             </button>
//           </div>
//           <div className="flex items-center mb-3">
//             <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
//               <span>Sửa sản phẩm</span>
//               <span>✎</span>
//             </button>
//           </div>
//           <div className="flex items-center mb-3">
//             <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
//               <span>Xóa sản phẩm</span>
//               <span>×</span>
//             </button>
//           </div>
//           <div className="flex items-center">
//             <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
//               <span>Chi tiết đơn hàng</span>
//               <span>→</span>
//             </button>
//           </div>
//         </div>
        
//         <div className="border-t flex p-3">
//           <img
//             src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
//             alt=""
//             className="w-10 h-10 rounded-md"
//           />
//           <div
//             className={`
//               flex justify-between items-center
//               overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
//           `}
//           >
//             <div className="leading-4">
//               <h4 className="font-semibold">John Doe</h4>
//               <span className="text-xs text-gray-600">johndoe@gmail.com</span>
//             </div>
//             <MoreVertical size={20} />
//           </div>
//         </div>
//       </nav>
//     </aside>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useState } from "react";
import mainImage from '../../../public/images/logo.png';

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  
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
            <Link to="/them-san-pham" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <span>Quản lý sản phẩm</span>
              <span>+</span>
            </Link>
          </li>
          
          <li>
            <Link to="/chi-tiet-don-hang" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <span>Quản lý bán hàng</span>
              <span>→</span>
            </Link>
          </li>
        </ul>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

