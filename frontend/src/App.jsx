import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/Signup'
import { Login } from './Pages/Login'
import { CourseList } from './Pages/CourseList'
import { AddCourse } from './Pages/AddCourse'
import { AddLesson } from './Pages/AddLesson'
import { CourseDetails } from './Pages/CourseDetails'
import { LessonPlayer } from './Pages/LessonPlayer'

function App() {
 return (
  <>
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/courselist' element={<CourseList></CourseList>}></Route>
            <Route path='/addcourse' element={<AddCourse></AddCourse>}></Route>
            <Route path='/courses/:courseId/add-lesson' element={<AddLesson></AddLesson>}></Route>
            <Route path='/courses/:courseId' element={<CourseDetails></CourseDetails>}></Route>
            <Route path="/lessons/:lessonId" element={<LessonPlayer />} />
        </Routes>
    </BrowserRouter>
  </>
 )
}

export default App
