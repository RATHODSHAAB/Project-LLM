import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { useState } from "react";
import axios from "axios";

export const AddLesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams(); // ✅ correct place

  const [postInputs, setPostInputs] = useState({
    title: "",
    description: "",
    videoURL: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", postInputs.title);
      formData.append("description", postInputs.description);
      formData.append("video", postInputs.videoURL); // ✅ backend expects "video"

      const response = await axios.post(
        `http://localhost:5000/api/lessons/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Success:", response.data);
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "videoURL") {
      setPostInputs((prev) => ({
        ...prev,
        videoURL: files[0]
      }));
    } else {
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
            Add Lesson
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="title"
              value={postInputs.title}
              onChange={handleChange}
              type="text"
              placeholder="Lesson Title"
              required
              className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            />

            <textarea
              name="description"
              value={postInputs.description}
              onChange={handleChange}
              placeholder="Lesson Description"
              required
              className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            />

            <label className="flex text-white flex-col items-center px-1 py-2 bg-gray-800 rounded-lg border-2 border-gray-600 cursor-pointer hover:border-blue-500">
              <span className="text-sm font-semibold mb-2">Upload lesson video</span>
              <input
                onChange={handleChange}
                name="videoURL"
                type="file"
                accept="video/*"
                required
                className="hidden"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Lesson
            </button>
          </form>

        </div>
      </div>
    </>
  );
};
