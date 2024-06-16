import { Route, Routes } from "react-router-dom";
import Error from "./pages/error";
import Resume from "./pages/resume/resume";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/home";
import MessageList from "./pages/message/messageList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<Home />} />
        <Route path="resume" element={<Resume />} />
        <Route path="viewallmessage" element={<MessageList />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
