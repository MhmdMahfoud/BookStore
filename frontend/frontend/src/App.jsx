import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import AddBooks from "./components/admin/AddBooks";
import AdminLayout from "./components/admin/AdminLayout";
import AllBooks from "./components/admin/AllBooks";
import { LogIn } from "lucide-react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  const location = useLocation();
  const hideHader = /^\/admin(\/|$)/.test(location.pathname);
  return (
    <>
      {!hideHader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login /> } />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="AddBooks" element={<AddBooks />} />
          <Route path="AllBooks" element={<AllBooks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
