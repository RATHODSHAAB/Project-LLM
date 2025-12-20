import { Link } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { useState } from "react"


export const AddCourse = () => {
    const [postInputs, setPostInputs] = useState({
        Username : "",
        Email: "",
        Password : "",
    });
    
    return (
        <>
        <Navbar></Navbar>
        
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
            <div className="w-105 bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">

                <h1 className="text-white text-2xl font-bold text-center mb-6">
                    Add Course
                </h1>

                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none "
                    />
                    
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none "
                    />
                    
                    <label className="flex text-white flex-col items-center px-1 py-2 bg-gray-800 rounded-lg border-2 border-gray-600 cursor-pointer ">
                        <span className="text-sm font-semibold  mb-2">Upload the file</span>
                        <span className="text-xs text-gray-300">
                            Click to upload .png or .jpg (max 1MB)
                        </span>
                        <input
                            type="file"
                            accept=".png,.jpg"
                            className="hidden"
                            
                        />
                     </label>

                     <select className="bg-gray-800 text-white px-3 py-2 pl-2 rounded-lg outline-none">
                        <option value="">Course</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Dsa">Dsa</option>
                        <option value="Blockchain">Blockchain</option>
                     </select>
                    
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:cursor-pointer transition">
                        Create course
                    </button>
                </form>
                
         </div>
        </div>
        </>
    )
}