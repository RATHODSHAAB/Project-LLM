import { Navbar } from "../Components/Navbar"
import recImage from "../Components/react.png";
import recImage1 from "../Components/javImage.png";

export const CourseList = () => {
    const courses = [
    {
      id: 1,
      title: "React for Beginners",
      description: "Learn React from scratch",
      thumbnail : recImage,
    },
    {
      id: 2,
      title: "Node.js Mastery",
      description: "Build backend apps",
      thumbnail: recImage1,
    },
    {
      id: 3,
      title: "Node.js Mastery",
      description: "Build backend apps",
      thumbnail: recImage1,
    },
    {
      id: 3,
      title: "Node.js Mastery",
      description: "Build backend apps",
      thumbnail: recImage1,
    },
    
  ];
    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-black">
            <div className="flex justify-around items-center text-white">
                <h1 className="text-2xl mt-13">
                    All Courses 
                </h1>
                <select className="bg-gray-800  px-3 py-2 pl-2 rounded-lg outline-none mt-15 ml-12">
                    <option value="">Course</option>
                    <option value="Full Stack">Full Stack</option>
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
 

function CourseCard({ course }) {
  return (
    <div className="border border-gray-800 rounded-lg p-6">
      <img className="h-50 w-full object-cover rounded-md" src={course.thumbnail} alt={course.title} /> 
      <h2 className="text-lg font-bold">{course.title}</h2> 
      <p>{course.description}</p>
     <button className="w-full bg-gray-900  py-2 rounded-lg font-medium mt-1 hover:cursor-pointer">
          Visit Course
        </button>
    </div>
  );
}

export default CourseCard;