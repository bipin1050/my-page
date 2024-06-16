import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const MessageList = () => {
  const messageRef = collection(db, "message");
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div className="w-full px-4 xl:w-[1200px] mx-auto py-10">
      {messages.map((message, index) => (
        <div
          className="border-[#ccc] border-[2px] rounded-lg p-3 mb-3"
          key={index}
        >
          <div className="flex flex-col sm:flex-row sm:items-center mb-2">
            <h4 className="font-bold mr-3">{message.name}</h4>
            <p className="text-black text-opacity-80">{message.email}</p>
          </div>
          <p className="message-text">{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
