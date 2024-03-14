import { Link } from "react-router-dom"
import confirm_shopping from "../../../public/images/confirm_shopping.png"
export const PaymentConfirm = () => {
    return (
      <div >
          {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 ">
            <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{width: '100%'}}
            ></div>
        </div>
        <div className="mt-10">
            <h1 className="text-emerald-600 font-bold text-center text-xl pb-10 w-1/2 mx-auto">Chúc mừng bạn đã đặt hàng thành công! Chúc bạn có những trải nghiệm mua sắm thú vị và hài lòng với sản phẩm của chúng tôi.</h1>
            <img src={confirm_shopping} alt="" className="w-1/5 mx-auto opacity-85" />
        </div>
        <Link to='/'>
            <h1 className=' h-2 text-lg font-bold text-center text-blue-700 pt-16 pb-24 cursor-pointer hover:opacity-80 animate-bounce'><i className="fa-solid fa-angles-left mr-2"></i>Trở về trang chủ </h1>
        </Link>
      </div>
    )
  }