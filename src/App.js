import {Route, Routes} from "react-router-dom"
import Error from "./components/error";
import Profile from "./components/profile";
import Resume from "./components/resume";
import MessageList from "./components/messageList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="resume" element={<Resume />} />
        <Route path="viewallmessage" element={<MessageList />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
