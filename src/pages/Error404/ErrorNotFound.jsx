import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { IoMdArrowBack } from "react-icons/io";
import image404 from "../../assets/404-pages.jpg";

const ErrorNotFound = () => {
   const navigate = useNavigate();
  
    const handleBack = () => {
      navigate("/dashboard");
    }
  return (
    <div>
      <div className='bg-white flex items-center justify-between relative px-6 py-2 drop-shadow z-100'>
        <h2 className="font-medium text-xl text-black py-2">Notes</h2>
      </div>
      <div>
        <div className='relative w-full h-lvh -mt-[80px] flex justify-center items-center'>
          <div className='absolute top-[98px] left-5 bg-white border border-blue-500 cursor-pointer duration-200 hover:bg-blue-500 px-3 py-2 rounded-lg' onClick={handleBack}>
            <span className='flex items-center justify-center gap-1 text-slate-600 hover:text-white'><IoMdArrowBack /> Trang chủ</span>
          </div>
          <div>
            <img src={image404}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorNotFound
