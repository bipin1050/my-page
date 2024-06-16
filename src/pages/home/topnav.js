import React from "react";
import headerphoto from "../../imgs/avatar1.jpg";
import headerbg from "../../imgs/header.jpg";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <div>
      <header>
        <div className="relative">
          <div className="w-full bg-black">
            <img
              src={headerbg}
              alt="avatar"
              className="opacity-40 backdrop-blur-lg max-h-[700px] min-h-[600px] w-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 sm:left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 text-center sm:text-left">
            <h4 className="text-2xl md:text-4xl text-white">Hello, I am</h4>
            <h1 className="text-7xl md:text-9xl uppercase font-bold text-[#d1d0d0]">
              Bipin Khanal
            </h1>
            <h3 className="text-xl md:text-3xl text-white tracking-widest">
              Computer Engineer, IOE Pulchowk
            </h3>
          </div>
          <div className="fixed right-4 top-5 md:right-20 md:top-10 z-20">
            <Link to={"/resume"}>
              <button className="py-2 px-5 text-lg bg-primary hover:bg-secondary text-white rounded-lg">
                Resume
              </button>
            </Link>
          </div>
        </div>
        <div className="pt-2 w-full px-4 xl:w-[1200px] mx-auto flex justify-center relative">
          <div className="bg-white bg-opacity-60 p-2 w-fit rounded-full absolute -top-32 z-10">
            <img
              src={headerphoto}
              alt="avatar"
              className="rounded-full w-64 h-64"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopNav;
