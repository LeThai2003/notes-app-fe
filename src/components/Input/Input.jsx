import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"

const Input = ({value, onChange, placeholder, lable, type}) => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <label htmlFor="" className='text-[14px] text-slate-800'>{lable}</label>
      <div className='input-box'>
        <input 
          type={type == "password" ? showPassword ? "text" : "password" : type} 
          placeholder={placeholder}
          className='w-full outline-none'
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            {showPassword ? <FaRegEye className="text-primary cursor-pointer" onClick={toggleShowPassword} size={22}/> : <FaRegEyeSlash className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} size={22}/>}
          </>
        )}
      </div>
    </div>
  )
}

export default Input
