import React, { useEffect } from "react";

const Resume = () => {
  useEffect(() => {
    document.title = "Resume - Bipin";
  }, []);

  return (
    <div className="w-full m-auto">
      <iframe
        width="100%"
        height="800"
        src="https://bipin1050.github.io/resume/"
        title="Resume"
        frameborder="0"
        style={{ overflow: "hidden" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
};

export default Resume;
