import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isDark, setisDark] = useState(false);
  const [Mobile, setMobile] = useState(false)
  const bodyref = useRef(document.body);

  const changeColor = () => {
    setisDark(!isDark);
    if (isDark) {
      bodyref.current.classList.remove("dark");
    } else {
      bodyref.current.classList.add("dark");
    }
  };

  return (
    <nav id="nav"
      className={`flex justify-between items-center w-full h-[10%] p-4 ${
        isDark ? "bg-gray-900" : "bg-green-50"
      } transition-all duration-300`}
    >
      <h1 className="text-3xl font-bold text-green-600 p-2 font-serif italic">
        Learn-Lang
      </h1>
      <div className="flex gap-10 text-[15px] mr-16 ">
        <Link to="/Dashboard" className="text-green-600 md:flex hidden cursor-pointer">Home</Link>
        <Link to="/Quiz " className="text-green-600  md:flex hidden cursor-pointer">Quiz</Link>
        <Link to="/Words " className="text-green-600 md:flex hidden cursor-pointer">Saved Words</Link>

        <i
          className={`fa-solid fa-moon  cursor-pointer py-[6px] ${
            isDark ? "hidden" : "md:flex hidden"
          }`}
          onClick={changeColor}
        ></i>
        <i
          className={`fa-solid fa-sun  cursor-pointer py-[6px] ${
            isDark ? "md:flex hidden" : "hidden"
          }`}
          onClick={changeColor}
        ></i>
      </div>

      <div
        className="md:hidden flex items-center"
        onClick={() => setMobile(!Mobile)}
      >
        <i className="fa-solid fa-bars text-green-600 text-2xl"></i>
      </div>

      <div
        className={`${
          Mobile ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 w-64 h-full bg-green-50 p-8 transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-between items-center mb-4">

          <i
            className="fa-solid fa-xmark text-green-600 text-2xl top-6 right-5 absolute cursor-pointer"
            onClick={() => setMobile(false)}
          ></i>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            to="/Dashboard"
            className="text-green-600 text-xl"
            onClick={() => setMobile(false)}
          >
            Home
          </Link>
          <Link
            to="/Quiz"
            className="text-green-600 text-xl"
            onClick={() => setMobile(false)}
          >
            Quiz
          </Link>
          <Link
            to="/Words"
            className="text-green-600 text-xl"
            onClick={() => setMobile(false)}
          >
            Saved Words
          </Link>
          <div className="flex items-center gap-4">
            <i
              className={`fa-solid fa-moon cursor-pointer py-[6px] ${
                isDark ? "hidden" : ""
              }`}
              onClick={changeColor}
            ></i>
            <i
              className={`fa-solid fa-sun cursor-pointer py-[6px] ${
                isDark ? "" : "hidden"
              }`}
              onClick={changeColor}
            ></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
