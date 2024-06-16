import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const messageRef = collection(db, "message");

const addMessage = (newMessage) => {
  return addDoc(messageRef, newMessage);
};

const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newMessage = {
      name: user.name,
      email: user.email,
      message: `${user.message} @ ${new Date().toLocaleString()}`,
    };
    try {
      const res = await addMessage(newMessage);
      if (res) {
        setLoading(false);
        setUser({ name: "", email: "", message: "" });
        toast("Message sent successfully");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Failed to sent");
    }
  };

  return (
    <div className="px-4 w-full xl:w-[1200px] mx-auto py-32 flex flex-col lg:flex-row gap-16">
      <div className="basis-2/3">
        <div className="flex flex-col gap-1 pb-4 text-2xl">
          <h3 className="text-3xl">Send a Message</h3>
          <div className="w-10 h-[2px] bg-primary" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <input
              className="w-full border-[2px] border-slate-300 focus:border-secondary rounded-lg focus:outline-none px-5 py-3"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name *"
              required
            />
          </div>
          <div>
            <input
              className="w-full border-[2px] border-slate-300 focus:border-secondary rounded-lg focus:outline-none px-5 py-3"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email *"
              required
            />
          </div>
          <div>
            <textarea
              className="w-full border-[2px] border-slate-300 focus:border-secondary rounded-lg focus:outline-none px-5 py-3"
              name="message"
              value={user.message}
              onChange={handleChange}
              placeholder="Message *"
              rows="5"
              required
            ></textarea>
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 px-5 text-lg bg-primary hover:bg-secondary disabled:bg-opacity-50 text-white rounded-lg"
            >
              {loading ? "Loading..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
      <div className="basis-1/3">
        <div className="flex flex-col gap-1 pb-4 text-2xl">
          <h3 className="text-3xl">Get in touch</h3>
          <div className="w-10 h-[2px] bg-primary" />
        </div>
        <div className="text-lg flex flex-col gap-3">
          <div>
            <h4>
              <span className="font-bold">Phone: </span>
              <span className="text-black text-opacity-80">
                +977 9863490911
              </span>
            </h4>
          </div>
          <div>
            <h4>
              <span className="font-bold">Address: </span>
              <span className="text-black text-opacity-80">
                Kathmandu, Nepal
              </span>
            </h4>
          </div>
          <div>
            <h4>
              <span className="font-bold">Permanent Address: </span>
              <span className="text-black text-opacity-80">Syangja, Nepal</span>
            </h4>
          </div>
          <div>
            <h4>
              <span className="font-bold">Email: </span>
              <span className="text-black text-opacity-80">
                bipin.khanal1050@gmail.com
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
