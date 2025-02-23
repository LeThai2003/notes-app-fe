import React, { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

const PasswordInput = ({onChange, value, placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className='flex items-center bg-transparent border-[1.5px] rounded px-5 py-3 border-gray-200 mb-3'>
            <input 
                value={value}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Mật khẩu"}
                className='w-full outline-none text-sm'
                onChange={onChange}
            />
            {   isShowPassword ?
                <FaRegEye
                    size={20}
                    className='text-primary cursor-pointer'
                    onClick={() => toggleShowPassword()}
                /> 
                : 
                <FaRegEyeSlash
                    size={20}
                    className='text-slate-400 cursor-pointer'
                    onClick={() => toggleShowPassword()}
                />
            }
        </div>

        
    )
}

export default PasswordInput
