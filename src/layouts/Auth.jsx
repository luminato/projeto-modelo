import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import AuthNavbar from "@components/Navbars/AuthNavbar.jsx";
import FooterSmall from "@components/Footers/FooterSmall.jsx";

// views
import Login from "@views/auth/Login.jsx";
import Register from "@views/auth/Register.jsx";

import registerImg from "@img/register_bg_2.png";

export default function Auth() {
  return (
    <>
      <AuthNavbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + registerImg + ")",
            }}
          ></div>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/*" element={<Navigate to="/auth/login" />} />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
