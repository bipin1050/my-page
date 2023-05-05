import {Route, Routes} from "react-router-dom"
import Error from "./components/error";
import Profile from "./components/profile";
import Resume from "./components/resume";
 
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="resume" element={<Resume />} />
        <Route path="*" element={<Error />} />
        {/* <Route path="addproduct" element={<Addproduct />} /> */}
      </Routes>
    </div>
  );
}

export default App;
