import { Link } from "react-router-dom"
import { Navbar } from "../Components/Navbar"

export const Signup = () => {
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
            type="text"
            placeholder="Username"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none "
          />
        
        
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none "
          />
         
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          />
          
          <select
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          
          <button
            type="submit"
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
