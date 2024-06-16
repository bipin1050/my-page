import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-10 justify-center items-center text-center text-5xl font-bold text-black text-opacity-60">
      <div>
        <div className="text-7xl">Error 404!</div>
        <div className="text-5xl">Page not found</div>
      </div>
      <div className="text-lg cursor-pointer hover:text-primary">
        <Link to="/">{"<< Back to homepage"}</Link>
      </div>
    </div>
  );
};

export default Error;
