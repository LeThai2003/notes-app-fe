import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { login } from "../../services/user";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email))
        {
            setError("Vui lòng nhập đúng định dạng email.");
            return;
        }

        if(!password)
        {
            setError("Vui lòng điền mật khẩu.")
            return;
        }

        setError("");

        // -------
        try {
            const response = await axiosInstance.post("users/login", {
                email, password
            });

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
            }
        }

    }

    return(
        <>
            <Navbar/>

            <div className="flex item-center justify-center mt-28">
                <div className="w-96 border border-gray-300 rounded bg-white px-7 py-10" >
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Đăng Nhập</h4>

                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="input-box" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}    
                        />

                        <p className="text-sm text-right">
                            <Link to={"/forgot-password"} className="text-xs text-primary hover:underline">Bạn quên mật khẩu?</Link>
                        </p>

                        {error && <p className="text-xs text-red-500 pb-1">{error}
                        </p>}

                        <button type="submit" className="btn-primary mt-4">Đăng Nhập</button>

                        <p className="text-sm text-center mt-4">
                            Chưa có tài khoản?{" "}
                            <Link to={"/signup"} className="font-medium text-primary underline">Tạo tài khoản</Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;