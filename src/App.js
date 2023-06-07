import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Overhead from "./pages/Overhead";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Uploads from "./pages/Uploads";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState, useEffect } from "react";


export default function App() {
  // Retrieves "token" in localStorage if any
  const [token, setToken] = useState(() => {
    const info = localStorage.getItem("token");
    const init = JSON.parse(info);
    return init || false;
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
          <Route path="/login" element={!token ? <Login setToken={setToken}/> : <Navigate to="/home" />}/>
          <Route path ="/" element={token ? <Overhead /> : <Navigate to="/login"/>}>
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


