import React from "react";
import { Outlet } from "react-router-dom";

// components
import AuthNavbar from "@components/Navbars/AuthNavbar.jsx";
import FooterSmall from "@components/Footers/FooterSmall.jsx";

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
          <Outlet />
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
