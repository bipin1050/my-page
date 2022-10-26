import {Route, Routes} from "react-router-dom"
import Error from "./components/error";
import Profile from "./components/profile";
 
function App() {
  return (
    <div className="App">
        <Routes>
          <Route index element={<Profile />}/>
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        {/* <Route path="addproduct" element={<Addproduct />} /> */}
      </Routes>
    </div>
  );
}

export default App;
