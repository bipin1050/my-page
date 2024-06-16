import React from "react";

const About = () => {
  return (
    <div>
      <div className="px-4 w-full xl:w-[1200px] mx-auto pt-44">
        <div className="flex flex-wrap justify-start xl:justify-between">
          <div className="w-[380px] border-[1px] px-10 py-16">
            <div className="flex flex-col gap-1 pb-4 text-3xl">
              <h3>Who am I ?</h3>
              <div className="w-10 h-[2px] bg-primary" />
            </div>
            <h5 className="text-lg">
              A Web Designer / Developer Located In Our Lovely Earth who knows
              the following statement
            </h5>
            <p className="mt-5 text-sm text-black/60">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.sit amet,
              Qui deserunt consequatur fugit repellendusillo voluptas?
            </p>
          </div>
          <div className="w-[380px] border-[1px] px-10 py-16">
            <div className="flex flex-col gap-1 pb-4 text-3xl">
              <h3>Personal Info</h3>
              <div className="w-10 h-[2px] bg-primary" />
            </div>
            <ul className="text-black/60 text-lg">
              <li>
                <span className="text-black w-64">Birthdate</span> : 11/28/2001
              </li>
              <li>
                <span className="text-black w-64">Email</span> :
                bipin.khanal1050@gmail.com
              </li>
              <li>
                <span className="text-black w-64">Phone</span> : +977 9863490911
              </li>
              <li>
                <span className="text-black w-64">Address</span> : Syangja,
                Nepal
              </li>
            </ul>
          </div>
          <div className="w-[380px] border-[1px] px-10 py-16">
            <div className="flex flex-col gap-1 pb-4 text-2xl">
              <h3 className="text-3xl">Enrollment</h3>
              <div className="w-10 h-[2px] bg-primary" />
            </div>
            <div className="py-2 shadow-sm shadow-slate-200">
              <div>
                <h3 className="text-lg">Web Development</h3>
                <p className="text-sm text-black/60">Expert :D</p>
              </div>
            </div>
            <div className="py-2 shadow-sm shadow-slate-200">
              <div>
                <h3 className="text-lg">UX Design</h3>
                <p className="text-sm text-black/60">Exploring !!</p>
              </div>
            </div>
            <div className="py-2 shadow-sm shadow-slate-200">
              <div>
                <h3 className="text-lg">Digital Marketing</h3>
                <p className="text-sm text-black/60">!Best</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
