import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Overhead from "./pages/Overhead";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Uploads from "./pages/Uploads";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";


export default function App() {
  // Retrieves "token" in localStorage if there is previous information
  // username needs to be saved in localstorage and return needs to be fixed
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(() => {
    const init = JSON.parse(localStorage.getItem("token"));
    return init || 1;
  });

  console.log(token);

  // Sets the "token" based on login info
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* login and root directory will redirect to each other depending on the
              current value of the token. If the token is any value except 0, it will
              not be valid and prevent the user from entering
          */}
          <Route path="/login" element={token !== 0 ? <Login username={username} setUsername={setUsername} setToken={setToken}/> : <Navigate to="/home" />}/>
          <Route path="/signup" element={<Signup username={username} setUsername={setUsername} setToken={setToken}/>} />
          <Route path ="/" element={token === 0 ? <Overhead username={username}/> : <Navigate to="/login"/>}>
            <Route path="" element={<Navigate to="/home"/>} />
            {/* home directory takes the token so the user can log out, will likely change to another page */}
            <Route path="home" element={<Home />}/>
            <Route path="uploads" element={<Uploads />}/>
            <Route path="create" element={<Create username={username}/>}/>
            {/* profile should have username and user statistics displayed */}
            <Route path={`profile/${username}`} element={<Profile username={username} setToken={setToken}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


