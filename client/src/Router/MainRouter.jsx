import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import Profile from "../Pages/ProfilePage/Profile";
import Layout from "../Components/Layout/Layout";

function MainRouter(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRouter;
