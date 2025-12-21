import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Components/Navbar";

export const LessonPlayer = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lessons/${lessonId}`
        );
        setLesson(res.data.lesson);
      } catch (error) {
        console.error("Error fetching lesson", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading lesson...
        </div>
      </>
    );
  }

  if (!lesson) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-white">
          Lesson not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-gray-900 to-black p-6">
        <div className="max-w-5xl mx-auto text-white">

          {/* Lesson Title */}
          <h1 className="text-2xl font-bold mb-4">
            {lesson.title}
          </h1>

          {/* Video Player */}
          <div className="w-full bg-black rounded-xl overflow-hidden">
            <video
              src={lesson.videoURL}
              controls
              className="w-full h-112.5"
            />
          </div>

          {/* Lesson Description */}
          <p className="mt-4 text-gray-300">
            {lesson.description}
          </p>

        </div>
      </div>
    </>
  );
};
