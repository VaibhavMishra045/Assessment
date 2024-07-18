import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import Home from "./components/Home";
import "./App.css";

function App() {
  const { isAuthorized } = useContext(Context);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/home" element={isAuthorized ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
