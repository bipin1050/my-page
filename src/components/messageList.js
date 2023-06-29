import React, { useEffect, useState } from "react";
import "./MessageList.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


const MessageList = () => {
  useEffect(()=>{
    getMessage()
  },[])

  const messageRef = collection(db, "message");
  const [messages, setMessages] = useState([]);

  // const getMessage = async () => {
  //   const data = await getDoc(messageRef);
  //   // setMessages(data.docs);
  //   console.log(data.docs)
  // };
  const getMessage = async () => {
    try {
      const querySnapshot = await getDocs(messageRef);
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push(doc.data());
      });
      setMessages(messagesData);
    } catch (error) {
      console.error("Error getting messages: ", error);
    }
  };
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div className="message" key={index}>
          <div className="message-details">
            <h4 className="message-name">{message.name}</h4>
            <p className="message-email">{message.email}</p>
          </div>
          <p className="message-text">{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
