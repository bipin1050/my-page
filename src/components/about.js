import React from 'react'

const About = () => {
  return (
    <div>
        <div className="container-fluid">
            <div id="about" className="row about-section">
                <div className="col-lg-4 about-card">
                    <h3 className="font-weight-light">Who am I ?</h3>
                    <span className="line mb-5"></span>
                    <h5 className="mb-3">A Web Designer / Developer Located In Our Lovely Earth</h5>
                    <p className="mt-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit.sit amet, Qui deserunt consequatur fugit repellendusillo voluptas?</p>
                    {/* <button className="btn btn-outline-danger"><i className="icon-down-circled2 "></i>Download My CV</button> */}
                </div>
                <div className="col-lg-4 about-card">
                    <h3 className="font-weight-light">Personal Info</h3>
                    <span className="line mb-5"></span>
                    <ul className="mt40 info list-unstyled">
                        <li><span>Birthdate</span> : 11/28/2001</li>
                        <li><span>Email</span> : bipin.khanal1050@gmail.com</li>
                        <li><span>Phone</span> : +977 9863490911</li>
                        <li><span>Address</span> :  Syangja, Nepal</li>
                    </ul>
                </div>
                <div className="col-lg-4 about-card">
                    <h3 className="font-weight-light">Enrollment</h3>
                    <span className="line mb-5"></span>
                    <div className="row">
                        <div className="col-1 text-danger pt-1"><i className="ti-widget icon-lg"></i></div>
                        <div className="col-10 ml-auto mr-3">
                            <h6>UX Design</h6>
                            <p className="subtitle"> exercitat Repellendus,  corrupt.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 text-danger pt-1"><i className="ti-paint-bucket icon-lg"></i></div>
                        <div className="col-10 ml-auto mr-3">
                            <h6>Web Development</h6>
                            <p className="subtitle">Lorem ipsum dolor sit consectetur.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 text-danger pt-1"><i className="ti-stats-up icon-lg"></i></div>
                        <div className="col-10 ml-auto mr-3">
                            <h6>Digital Marketing</h6>
                            <p className="subtitle"> !Best</p>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About