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
      <IndexNavbar fixed />
      <section
        className={`header relative pt-16 items-center flex h-screen max-h-860-px bg-cover bg-no-repeat bg-center`}
        style={{ backgroundImage: `url(${backGround}) ` }}
      >
        <LastOffers/>
      </section>

      

      
      <Footer />
    </>
  );
}
