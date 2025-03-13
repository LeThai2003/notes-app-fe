import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail, validateName } from '../../utils/helper';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name)
        {
            setError("Vui lòng nhập họ và tên.");
            return;
        }
        else if(!validateName(name))
        {
            setError("Vui lòng nhập đúng định dạng tên.");
            return;
        }

        if(!validateEmail(email))
        {
            setError("Vui lòng nhập đúng định dạng email.");
            return;
        }

        if(!password)
        {
            setError("Vui lòng nhập mật khẩu.");
            return;
        }

        setError("");

        // ---
        try {
            const response = await axiosInstance.post("users/create-account", {
                name, email, password
            });

            if(response.data && response.data.error)
            {
                setError(response.data.message);
            }

            if(response.data && response.data.accessToken)
            {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message)
            {
                setError(error.response.data.message)
            }
            else
            {
                setError("Đã có lỗi không mong muốn, vui lòng thử lại");
                console.log(error);
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border border-gray-300 bg-white px-7 py-10 rounded'>
                    <form onSubmit={handleSignUp}>
                        <h4 className='text-2xl mb-7'>Đăng Ký</h4>

                        <input
                            type='text'
                            placeholder="Họ và tên"
                            className='input-box'
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />

                        <input
                            type='email'
                            placeholder="Email"
                            className='input-box'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />

                        <PasswordInput 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />

                        {error && <p className='text-red-500 text-xs'>{error}</p>}

                        <button type='submit' className='btn-primary'>Tạo Tài Khoản</button>

                        <p className='text-center text-sm mt-4'>
                            Đã có tài khoản? {" "}
                            <Link to='/login' className='underline font-medium text-primary'>Đăng nhập</Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
