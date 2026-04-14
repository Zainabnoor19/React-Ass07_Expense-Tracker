import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Logout from "../auth/Logout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        {/* Main page */}
        <Route path="/home" element={<Home />} />

        {/* 404 page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;