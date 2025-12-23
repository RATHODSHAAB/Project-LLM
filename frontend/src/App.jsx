import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/Signup'
import { Login } from './Pages/Login'
import { CourseList } from './Pages/CourseList'
import { AddCourse } from './Pages/AddCourse'
import { AddLesson } from './Pages/AddLesson'
import { CourseDetails } from './Pages/CourseDetails'
import { LessonPlayer } from './Pages/LessonPlayer'
import { Dashboard } from './Pages/Dashborad'
import { ProtectedRoute } from './Components/ProtectedRoute'

function App() {
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/courselist"
        element={
          <ProtectedRoute>
            <CourseList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addcourse"
        element={
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:courseId/add-lesson"
        element={
          <ProtectedRoute>
            <AddLesson />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lessons/:lessonId"
        element={
          <ProtectedRoute>
            <LessonPlayer />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
 )
}

export default App
