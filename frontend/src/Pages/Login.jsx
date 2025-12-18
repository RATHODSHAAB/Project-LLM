import { Link } from "react-router-dom"
import { Navbar } from "../Components/Navbar"

export const Login = () => {
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
                    type="text"
                    placeholder="Email"
                    className="text-white border border-gray-700 outline-none px-4 py-3 rounded-lg" />

                     <input 
                    type="password"
                    placeholder="Password"
                    className="text-white border border-gray-700 outline-none px-4 py-3 rounded-lg" />

                    
                    <button 
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