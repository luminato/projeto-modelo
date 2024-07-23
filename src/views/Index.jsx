/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "@components/Navbars/IndexNavbar.jsx";
import Footer from "@components/Footers/Footer.jsx";
import LastOffers from "@components/Cards/LastOffers.jsx";

import backGround from "@img/backGround-index.jpg";

export default function Index() {
  return (
    <>
      <IndexNavbar />
      <section
        className={`header relative pt-16 items-center flex min-h-[calc(100vh-128px)] bg-cover bg-no-repeat bg-center px-4`}
        style={{ backgroundImage: `url(${backGround})`, paddingTop: '64px' }}
      >
        <LastOffers />
      </section>
      <section className="relative pt-16 pb-16 flex items-center justify-center px-4">
        <div className="text-center w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold">More Content Here</h2>
          <p className="mt-4">This is another section below the main section.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
