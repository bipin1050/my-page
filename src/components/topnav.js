import React from 'react'
import headerphoto from "../imgs/avatar1.jpg"

const TopNav = () => {
  return (
    <div>
      <header className="header">
        <div className="container">
          {/* <ul className="social-icons pt-3">
                    <li className="social-item"><a className="social-link text-light" href="#"><i className="ti-facebook" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link text-light" href="#"><i className="ti-twitter" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link text-light" href="#"><i className="ti-google" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link text-light" href="#"><i className="ti-instagram" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link text-light" href="#"><i className="ti-github" aria-hidden="true"></i></a></li>
                </ul>   */}
          <div className="header-content">
            <h4 className="header-subtitle">Hello, I am</h4>
            <h1 className="header-title">Bipin Khanal</h1>
            <h3 className="header-mono">Computer Engineer, IOE Pulchowk</h3>
            {/* <button className="btn btn-primary btn-rounded"><i className="ti-printer pr-2"></i>Print Resume</button> */}
          </div>
        </div>
      </header>
      <nav
        className="navbar sticky-top navbar-expand-lg navbar-light bg-white"
        data-spy="affix"
        data-offset-top="510">
        <div className="container">
          <button
            className="navbar-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse mt-sm-20 navbar-collapse"
            id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="#home" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
            </ul>
            <ul className="navbar-nav brand">
              <img src={headerphoto} alt="" className="brand-img" />
              <li className="brand-txt">
                <h5 className="brand-title">Bipin Khanal</h5>
                <div className="brand-subtitle">Web Developer</div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#blog" className="nav-link">
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item last-item">
                <a href="/resume" target="_blank" norefferer noopener className="nav-link">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNav