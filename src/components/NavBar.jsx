import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import cross from "../assets/cross.svg";
import menu from "../assets/menu.svg";

export default function NavBar() {
  const [nav, setNav] = useState(false);

  function toggleNav(e) {
    nav ? setNav(false) : setNav(true);
  }

  function close() {
    setNav((prev) => !prev);
  }

  return (
    <nav className="font-[Ubuntu] bg-[#14171c] flex items-center justify-between h-[60px] p-5 cursor-pointer  md:sticky md:top-0">
      <div className=" flex items-center relative  z-20">
        <img src={logo} alt="logo" className="w-[40px]  " />
        <Link to="/">
          {" "}
          <p className="font-bold text-2xl pl-1 text-[whitesmoke]">Crypto</p>
        </Link>
        <span className="text-[#307F98] text-3xl font-bold">X</span>
      </div>

      <div
        className={`absolute duration-500 md:duration-0 bg-[#14171c] min-h-[200px] left-0  w-full flex items-center px-5 md:gap-[4vw] md:static md:min-h-fit md:ml-[40vw] lg:ml-[55vw] xl:ml-[65vw] ${
          nav ? "top-[7%]" : "top-[-100%]"
        } `}
      >
        <ul className="text-[whitesmoke] flex md:flex-row flex-col  md:items-center gap-10 text-[19px] pl-[38%] md:pl- text-center">
          <li
            className="hover:text-[#307F98] active:text-[#307F98] "
            onClick={close}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="hover:text-[#307F98] active:text-[#307F98]"
            onClick={close}
          >
            <Link to="/about">About</Link>
          </li>
        </ul>{" "}
      </div>

      <div>
        <img
          src={nav ? cross : menu}
          alt=""
          className={`w-[35px] md:hidden duratio`}
          onClick={toggleNav}
        />
      </div>
    </nav>
  );
}
