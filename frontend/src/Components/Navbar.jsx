import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ type }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  // Safely decode the token with error handling
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full flex justify-between items-center px-12 py-4 bg-black text-white shadow-lg">
      
      {/* Logo */}
      <div
        id="nav-logo"
        className="text-2xl font-extrabold tracking-wide"
      >
        <Link
          to="/"
          className="text-white hover:text-green-400 transition duration-300"
        >
          LLM
        </Link>
      </div>

     

      {/* Navigation */}
      <div
        id="nav-section"
        className="flex items-center gap-10 text-base font-medium"
      >
        <Link
          to="/"
          className="text-gray-300 hover:text-white transition duration-300"
        >
          Home
        </Link>

         {user?.role == "instructor" && (
            <Link to={'/addcourse'}>
            <button className= " text-white p-1.5 cursor-pointer">
              Add course
            </button>
          </Link>
          )}

        {/* ✅ Show Courses ONLY when logged in */}
        {token && (
          <Link
            to="/courselist"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Courses
          </Link>
        )}

        

        {/* 🔐 Auth Buttons */}
        {!token ? (
          <Link
            to={type === "signin" ? "/signup" : "/login"}
            className="bg-linear-to-r from-green-400 to-green-600 
                       text-black font-semibold px-7 py-2.5 rounded-full
                       shadow-md hover:shadow-green-500/40
                       transition transform hover:scale-105"
          >
            {type === "signin" ? "Sign up" : "Login"}
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-7 py-2.5 rounded-full
                       shadow-md hover:shadow-red-500/40
                       transition transform hover:scale-105"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
