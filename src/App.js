import './App.css';
import ReactDOM from "react-dom/client";
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
  const [token, setToken] = useState(() => {
    const info = localStorage.getItem("token");
    const init = JSON.parse(info);
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
          <Route path="/login" element={token != 0 ? <Login setToken={setToken}/> : <Navigate to="/home" />}/>
          <Route path="/signup" element={<Signup setToken={setToken}/>} />
          <Route path ="/" element={token == 0 ? <Overhead /> : <Navigate to="/login"/>}>
            <Route path="" element={<Navigate to="/home"/>} />
            {/* home directory takes the token so the user can log out, will likely change to another page */}
            <Route path="home" element={<Home setToken={setToken}/>}/>
            <Route path="uploads" element={<Uploads />}/>
            <Route path="create" element={<Create />}/>
            <Route path="profile" element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


