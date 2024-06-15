import React, { useEffect } from "react";

const Resume = () => {
  useEffect(() => {
    document.title = "Resume | Bipin Khanal";
  }, []);

  return (
    <div style={{width: "100%", height: "100vh", margin: "auto"}}>
      <iframe
        width="100%"
        height="100%"
        src="https://resume-nine-psi.vercel.app/"
        title="Resume"
        frameborder="0"
        style={{ overflow: "hidden" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
};

export default Resume;
