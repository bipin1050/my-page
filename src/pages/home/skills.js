import React from "react";

const Skills = () => {
  return (
    <div className="px-4 w-full xl:w-[1200px] mx-auto py-32">
      <div className="flex flex-col gap-1 pb-4 text-2xl ">
        <h3 className="text-3xl">Skills</h3>
        <div className="w-10 h-[2px] bg-primary" />
      </div>
      <div className="flex flex-row flex-wrap justify-start xl:justify-between">
        <div className="text-center shadow-md rounded-lg border-[1px] cursor-pointer hover:shadow-lg w-[350px]">
          <h2 className="text-xl py-5 px-12 border-b-[1px] font-bold hover:text-primary">
            Programming Language
          </h2>
          <div className="text-lg flex flex-col gap-2 py-5">
            <h3 className="hover:text-secondary">HTML/CSS</h3>
            <h3 className="hover:text-secondary">Javascript</h3>
            <h3 className="hover:text-secondary">Python</h3>
            <h3 className="hover:text-secondary">C/C++</h3>
          </div>
        </div>
        <div className="text-center shadow-md rounded-lg border-[1px] cursor-pointer hover:shadow-lg w-[350px]">
          <h2 className="text-xl py-5 px-12 border-b-[1px] font-bold hover:text-primary">
            Framework
          </h2>
          <div className="text-lg flex flex-col gap-2 py-5">
            <h3 className="hover:text-secondary">React</h3>
            <h3 className="hover:text-secondary">Next</h3>
            <h3 className="hover:text-secondary">Node</h3>
            <h3 className="hover:text-secondary">Django</h3>
          </div>
        </div>
        <div className="text-center shadow-md rounded-lg border-[1px] cursor-pointer hover:shadow-lg w-[350px]">
          <h2 className="text-xl py-5 px-12 border-b-[1px] font-bold hover:text-primary">
            Human Language
          </h2>
          <div className="text-lg flex flex-col gap-2 py-5">
            <h3 className="hover:text-secondary">English</h3>
            <h3 className="hover:text-secondary">Nepali</h3>
            <h3 className="hover:text-secondary">Sanskrit</h3>
            <h3 className="hover:text-secondary">Hindi</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
