import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { useState } from "react"
import axios from "axios";
import { API } from "../api";

export const AddCourse = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    title: "",
    description: "",
    thumbnail: null,  // Changed to null for file
    category: ""
  });
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    
    
    const formData = new FormData();
    formData.append("title", postInputs.title);
    formData.append("description", postInputs.description);
    formData.append("category", postInputs.category);
    formData.append("thumbnail", postInputs.thumbnail);

    console.log("Headers being sent:", {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    });

    const response = await API.post(
      "/api/courses",
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );
    navigate("/courselist");
    console.log("Success:", response.data);
  } catch (error) {
    console.log("Error:", error.response?.data);
  }
};
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "thumbnail") {
      // For file input, store the File object
      setPostInputs((prev) => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      // For text inputs
      setPostInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
        <div className="w-105 bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">

          <h1 className="text-white text-2xl font-bold text-center mb-6">
            Add Course
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="title"
              value={postInputs.title}
              onChange={handleChange}
              type="text"
              placeholder="Title"
              required
              className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            />

            <textarea
              name="description"
              value={postInputs.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            />

            <label className="flex text-white flex-col items-center px-1 py-2 bg-gray-800 rounded-lg border-2 border-gray-600 cursor-pointer hover:border-blue-500">
              <span className="text-sm font-semibold mb-2">Upload the file</span>
              <span className="text-xs text-gray-300">
                Click to upload .png or .jpg (max 1MB)
              </span>
              <input
                onChange={handleChange}
                name="thumbnail"
                type="file"
                accept=".png,.jpg"
                required
                className="hidden"
              />
            </label>

            <select
              onChange={handleChange}
              name="category"
              value={postInputs.category}
              required
              className="bg-gray-800 text-white px-3 py-2 pl-2 rounded-lg outline-none"
            >
              <option value="">Select Course</option>
              <option value="full stack">Full Stack</option>
              <option value="dsa">DSA</option>
              <option value="blockchain">Blockchain</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:cursor-pointer transition"
            >
              Create course
            </button>
          </form>

        </div>
      </div>
    </>
  );
};