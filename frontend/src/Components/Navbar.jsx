import { Link } from "react-router-dom";

export const Navbar = ({ type }) => {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-4 bg-black text-white shadow-lg">
      
      {/* Logo */}
      <div
        id="nav-logo"
        className="text-2xl font-extrabold tracking-wide"
      >
        <a
          href="/"
          className="text-white hover:text-green-400 transition duration-300"
        >
          LLM
        </a>
      </div>

      {/* Navigation */}
      <div
        id="nav-section"
        className="flex items-center gap-10 text-base font-medium"
      >
        <a
          href="/"
          className="text-gray-300 hover:text-white transition duration-300"
        >
          Home
        </a>

        <a
          href="/courselist"
          className="text-gray-300 hover:text-white transition duration-300"
        >
          Courses
        </a>
        <Link to={type === "signin" ? "/signup" : "/login"} 
           className="bg-linear-to-r from-green-400 to-green-600 
                     text-black font-semibold px-7 py-2.5 rounded-full
                     shadow-md hover:shadow-green-500/40
                     transition transform hover:scale-105 ">
                {type === "signin" ? "Sign up" : "login"}
        </Link>
      </div>
    </nav>
  );
};
