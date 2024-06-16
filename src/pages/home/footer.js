import React from "react";
import facebook from "../../imgs/icons/facebook.png";
import instagram from "../../imgs/icons/instagram.png";
import twitter from "../../imgs/icons/twitter.png";
import linkedin from "../../imgs/icons/linkedin.png";

const Footer = () => {
  return (
    <footer className="px-4 py-5 bg-[#17263c] text-slate-300">
      <div className="w-full xl:w-[1200px] mx-auto">
        <div className="flex flex-col text-lg">
          <p className="medium mb-0 text-light">Social Links</p>
          <div className="flex flex-row gap-3">
            <a
              href="https://facebook.com/bipin.khanal1050"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebook} width="30px" alt="facebook" />{" "}
            </a>
            <a
              href="https://www.instagram.com/_bip_in_/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} width="30px" alt="instagram" />{" "}
            </a>
            <a
              href="https://twitter.com/bpin_khanal"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} width="30px" alt="twitter" />{" "}
            </a>
            <a
              href="https://www.linkedin.com/in/bipin-khanal-66a082244/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedin} width="30px" alt="linkedin" />{" "}
            </a>
          </div>
        </div>
        <br />
        <p className="mb-0 text-base">&copy; 2022, Bipin</p>
      </div>
    </footer>
  );
};

export default Footer;
