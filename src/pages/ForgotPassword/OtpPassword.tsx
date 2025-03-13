import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { validateOTP } from '../../utils/helper';
import Navbar from '../../components/Navbar/Navbar';
import { IoMdArrowBack } from "react-icons/io";
import CoundownTime from '../../components/CoundownTime/CoundownTime';
import Toast from '../../components/ToastMessage/Toast';

const OtpPassword = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    type: "add",
    message: ""
  })
  
  const navigate = useNavigate();
  const params = useParams();

  const {email} = params;

  const handleBack = () => {
    navigate(-1);
  }

  const handleShownToast = (type, message) => {
    setShowToastMessage({isShown: true, message: message, type: type});
  }

  const handleCloseToast = () => {
    const type = showToastMessage.type;
    setShowToastMessage({isShown: false, message: "", type: type});  // để khỏi đổi mày khi tắt
  }

  const handleOtpPassword = async (e) => {
    e.preventDefault();

    if(!otp)
    {
      setError("Vui lòng nhập mã OTP.");
      return;
    }

    if(!validateOTP(otp))
    {
      setError("Vui lòng nhập đúng định dạng mã OTP.");
      return;
    }

    setError("");

    // fetch API
    try {
      const response = await axiosInstance.post("users/password/otp", {
        otp
      })

      if(response.data && !response.data.error)
      {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/reset-password")
      }
      else if(response.data && response.data.error)
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

  const onLoadAgain = async () => {
    try {

      setOtp("");

      const response = await axiosInstance.post("users/password/forgot", {
        email
      })

      if(response.data && !response.data.error)
      {
        handleShownToast("add", "Mã OTP đã được gửi vào Email.")
      }
      if(response.data && response.data.error)
      {
        handleShownToast("delete", response.data.message)
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
          <form onSubmit={handleOtpPassword}>
            <h4 className='text-2xl mb-7'>Nhập Mã OTP</h4>

            <input 
              type="number" 
              placeholder='OTP'
              className='input-box'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className='text-sm text-red-500 pb-1'>{error}</p>}

            <button type='submit' className="btn-primary mt-2 mb-3" disabled={!otp}>Đặt Lại Mật Khẩu</button>

            <CoundownTime time={300} onLoadAgain={onLoadAgain}/>
          </form>
        </div>
      </div>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </div>
  )
}

export default OtpPassword
