import { Link , useNavigate } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { useState } from "react";
import axios from 'axios';

export const Signup = () => {
  const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
          username : "",
          email: "",
          password : "",
          role: "",
    });

    const handleSubmit =  async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          postInputs
        );
      const jwt = response.data.jwt;
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

      <div className="w-90 bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">

        <h1 className="text-white text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form className="flex flex-col gap-4">
            <input
            value={postInputs.username}
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none "
          />
        
        
          <input
          value={postInputs.email}
          onChange={handleChange}
          name="email"
            type="email"
            placeholder="Email"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none "
          />
         
          <input
          value={postInputs.password}
          onChange={handleChange}
          name="password"
            type="password"
            placeholder="Password"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          />
          
          <select name="role"
          value={postInputs.role}
          onChange={handleChange}
          
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:cursor-pointer transition"
          >
            Sign Up
          </button>

        </form>
        <div
            className="text-white text-md font-semibold text-center mt-2 "> 
            Already have an account ? <Link to={"/login"} className="text-blue-600">Login</Link>
        </div>
      </div>
    </div>
        </>
    )
}
