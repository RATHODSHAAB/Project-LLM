import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/Signup'
import { Login } from './Pages/Login'
import { CourseList } from './Pages/CourseList'

function App() {
 return (
  <>
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/courselist' element={<CourseList></CourseList>}></Route>

        </Routes>
    </BrowserRouter>
  </>
 )
}

export default App
