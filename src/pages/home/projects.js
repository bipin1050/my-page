import React from "react";

const Projects = () => {
  return (
    <div className="px-4 w-full xl:w-[1200px] mx-auto">
      <div className="flex flex-col gap-1 pb-4 text-2xl">
        <h3 className="text-3xl">Projects & Activities</h3>
        <div className="w-10 h-[2px] bg-primary" />
      </div>
      <div className="text-lg">
        <div>
          <h3>
            Find my projects here:{" "}
            <a
              href="https://www.github.com/bipin1050"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-secondary hover:text-primary"
            >
              github.com/bipin1050
            </a>
          </h3>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl">Work Experience </h2>
          <div className="flex flex-row flex-wrap justify-start gap-12 py-6">
            <div className="flex flex-col py-8 px-12 w-[350px] hover:text-primary cursor-pointer border-[1px] shadow-md text-center">
              <h3 className="text-xl font-bold">Full Stack Developer</h3>
              <h3 className="text-lg">Sandbox Software Pvt. Ltd.</h3>
              <h3 className="text-lg">React, Django, PostgreSQL</h3>
              <h3 className="text-lg">2023-2024</h3>
            </div>
            <div className="flex flex-col py-8 px-12 w-[350px] hover:text-primary cursor-pointer border-[1px] shadow-md text-center">
              <h3 className="text-xl font-bold">Full Stack Developer</h3>
              <h3 className="text-lg">Mach Records</h3>
              <h3 className="text-lg">React, Django, AWS, Nginx, PostgreSQL</h3>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl">Other Experience </h2>
          <div className="flex flex-row flex-wrap justify-start gap-12 py-6">
            <div className="flex flex-col py-8 px-12 w-[350px] hover:text-primary cursor-pointer border-[1px] shadow-md text-center">
              <h3 className="text-xl font-bold">Event Manager</h3>
              <h3 className="text-lg">LOCUS 2023</h3>
              <h3 className="text-lg">IOE, Pulchowk Campus</h3>
            </div>
            <div className="flex flex-col py-8 px-12 w-[350px] hover:text-primary cursor-pointer border-[1px] shadow-md text-center">
              <h3 className="text-xl font-bold">Program Coordinator</h3>
              <h3 className="text-lg">SXC Physics Club</h3>
              <h3 className="text-lg">St. Xavier College, Maitighar</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
