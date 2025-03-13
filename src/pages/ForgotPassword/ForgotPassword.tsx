import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if(!validateEmail(email))
    {
      setError("Vui lòng nhập đúng định dạng email.");
      return;
    }

    setError("");

    // fetch API
    try {
      const response = await axiosInstance.post("users/password/forgot", {
        email
      })

      if(response.data && !response.data.error)
      {
        navigate(`/otp-password/${email}`)
      }
      if(response.data && response.data.error)
      {
        setError(response.data.message);
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message)
      {
        setError(error.response.data.message);
      }
      else
      {
        setError("Đã có lỗi không mong muốn, vui lòng thử lại");
      }
    }
  }

  return (
    <div>
      <Navbar/>
      
      <div className='relative w-full h-lvh -mt-[80px] flex justify-center items-center'>
        <div className='absolute top-[98px] left-5 bg-white border border-blue-500 cursor-pointer duration-200 hover:bg-blue-500 px-3 py-2 rounded-lg' onClick={handleBack}>
          <span className='flex items-center justify-center gap-1 text-slate-600 hover:text-white'><IoMdArrowBack /> Trở lại</span>
        </div>

        <div className='w-96 border border-gray-300 rounded bg-white px-7 py-10'>
          <form onSubmit={handleForgotPassword}>
            <h4 className='text-2xl mb-7'>Lấy Lại Mật Khẩu</h4>

            <input 
              type="email" 
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className='text-sm text-red-500 pb-1'>{error}</p>}

            <button type='submit' className='btn-primary mt-4'>Lấy Mã OTP</button>

            <p className='text-center mt-2 text-sm'><i><b>Lưu ý: </b> mã OTP sẽ được gửi qua email của bạn!</i></p>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword
