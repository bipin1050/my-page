import React, { useState } from 'react'
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const messageRef = collection(db, "message");

const addMessage = (newMessage) => {
  return addDoc(messageRef, newMessage)
}

const Contact = () => {
  const [user, setUser] = useState({
    name : "",
    email : "",
    message : ""
  });

  const handleChange = (e) =>{
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    const newMessage = {
      name : user.name,
      email : user.email,
      message : user.message
    }
    try{
      const res = await addMessage(newMessage);
      if (res){
        console.log(res)
        setUser({name: "", email: "", message: ""})
        toast("Message sent successfully")
      }
    }catch(err){
      console.log(err)
      toast("Failed to sent")
    }
  }

  return (
    <div>
      <div className="section contact" id="contact">
        <div id="map" className="map"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact-form-card">
                <h4 className="contact-title">Send a message</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name='name'
                      value={user.name}
                      onChange={handleChange}
                      placeholder="Name *"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      name='email'
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name='message'
                      value={user.message}
                      onChange={handleChange}
                      placeholder="Message *"
                      rows="7"
                      required></textarea>
                  </div>
                  <div className="form-group ">
                    <button
                      type="submit"
                      className="form-control btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-card">
                <h4 className="contact-title">Get in touch</h4>
                <div className="row mb-2">
                  <div className="col-1 pt-1 mr-1">
                    <i className="ti-mobile icon-md"></i>
                  </div>
                  <div className="col-10 ">
                    <h6 className="d-inline">
                      Phone : <br />{" "}
                      <span className="text-muted">+977 9863490911</span>
                    </h6>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-1 pt-1 mr-1">
                    <i className="ti-map-alt icon-md"></i>
                  </div>
                  <div className="col-10">
                    <h6 className="d-inline">
                      Address :<br />{" "}
                      <span className="text-muted">Syangja, Nepal</span>
                    </h6>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-1 pt-1 mr-1">
                    <i className="ti-envelope icon-md"></i>
                  </div>
                  <div className="col-10">
                    <h6 className="d-inline">
                      Email :<br />{" "}
                      <span className="text-muted">
                        bipin.khanal1050@gmail.com
                      </span>
                    </h6>
                  </div>
                </div>
                <ul className="social-icons pt-4">
                  <li className="social-item">
                    <a className="social-link text-dark" href="#">
                      <i className="ti-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="social-item">
                    <a className="social-link text-dark" href="#">
                      <i className="ti-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="social-item">
                    <a className="social-link text-dark" href="#">
                      <i className="ti-google" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="social-item">
                    <a className="social-link text-dark" href="#">
                      <i className="ti-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="social-item">
                    <a className="social-link text-dark" href="#">
                      <i className="ti-github" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact