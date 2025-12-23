import { Link , useNavigate } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { useState } from "react";
import axios from "axios";
import { API } from "../api";

export const Login = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        username: "",
        password : "",
    });

    const handleSubmit =  async (e) => {
      e.preventDefault();

      try {
        const response = await API.post(
          "/api/auth/signin",
          postInputs
        );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/courselist");
        console.log("Success : " , response.data)
      } catch (error) {
        console.log(
          error.response?.data?.message || "Signup Failed"
        );
      }
    }

    const handleChange = (e) => {
      const { name , value } = e.target; //destructuring the value fomm e.target
      setPostInputs((prev) => ({
        ...prev,
        [name] : value,
      }));
    };
    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
            <div className="w-90 border border-gray-700 rounded-2xl p-6">
                <h1 className="text-white text-center text-2xl font-bold mb-6">
                    Login to your account
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                    onChange={handleChange}
                    name="username"
                    value={postInputs.username}
                    type="text"
                    placeholder="Email"
                    className="text-white border border-gray-700 outline-none px-4 py-3 rounded-lg" />

                     <input 
                     onChange={handleChange}
                     name="password"
                     value={postInputs.password}
                    type="password"
                    placeholder="Password"
                    className="text-white border border-gray-700 outline-none px-4 py-3 rounded-lg" />

                    
                    <button 
                    onClick={handleSubmit}
                    type="submit"
                    className="bg-blue-600 text-white border border-gray-700 rounded-lg px-4 py-3 hover:cursor-pointer">
                        Login
                    </button>
                </form>
                <div
                    className="text-white text-md font-semibold text-center mt-2 "> 
                    Don't have an account ? <Link to={"/signup"} className="text-blue-600">Sign Up</Link>
                </div>
            </div>
        </div>
 
    </>
    )
}