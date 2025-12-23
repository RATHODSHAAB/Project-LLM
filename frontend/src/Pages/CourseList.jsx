import { useState } from "react";
import { Navbar } from "../Components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../api";


export const CourseList = () => {
  const [category, setCategory] = useState("");
  const [courses, setCourses] = useState([]);
  
  
  useEffect(()=> {
    const fetchCourses = async () => {
     try {
      console.log("Token in localStorage:", localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirect to login");
        return ;
      } // optional safety

      const response = await API.get("/api//courses", {
        headers: { Authorization: `Bearer ${token}` },
        params: { category },
      });
      setCourses(response.data.courses);
     } catch (error) {
      console.error("Error fetching courses", error);
     };
    };
    fetchCourses();
  },[category])
    
    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-black">
            <div className="flex justify-around items-center text-white">
                <h1 className="text-2xl mt-13">
                    All Courses 
                </h1>
                <select
                value={category} 
                onChange={(e)=> setCategory(e.target.value)}
                className="bg-gray-800  px-3 py-2 pl-2 rounded-lg outline-none mt-15 ml-12">
                    <option value="">Course</option>
                    <option value="full Stack">Full Stack</option>
                    <option value="Dsa"> Dsa </option>
                    <option value="Blockchain"> Blockchain </option>
                </select>

            </div>
            <div className="text-white flex  flex-col gap-12 place-items-center  p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />

                    ))}
                </div>
            </div>
        </div>
        </>
    )
}
 
//The link in the button will lead to that specific course => it will take to course details page where we 
//can see the rectangle box ! showing title and lilltle bit description ! 
function CourseCard({ course }) {

  return (
    <div className="border border-gray-800 rounded-2xl p-6 backdrop-blur-xl bg-gray-800/5">

      <img className="h-50 w-full object-cover rounded-lg" src={course.thumbnail} alt={course.title} /> 
      <h2 className="text-lg font-bold">{course.title}</h2> 
      <p>{course.description}</p>
     <button className="w-full bg-gray-900  py-2 rounded-lg font-medium mt-1 hover:cursor-pointer">
        <Link to={`/courses/${course._id}`}>Visit Course</Link>  
        </button>
    </div>
  );
}

export default CourseCard;