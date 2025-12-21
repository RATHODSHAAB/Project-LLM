import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Components/Navbar";

export const CourseDetails = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/lessons/course/${courseId}`
      );
      setLessons(res.data.lessons);
    };

    fetchLessons();
  }, [courseId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-black p-6">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </>
  );
};


function LessonCard({ lesson }) {
  return (
    <Link
      to={`/lessons/${lesson._id}`}
      className="block w-full p-4 bg-gray-800 rounded-2xl hover:bg-gray-700 text-white"
    >
      <h2 className="font-semibold text-lg">{lesson.title}</h2>
      <p className="text-sm text-gray-300">{lesson.description}</p>
    </Link>
  );
}
