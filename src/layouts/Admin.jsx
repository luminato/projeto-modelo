import React from "react";
import { Outlet } from "react-router-dom";


// components

import AdminNavbar from "@components/Navbars/AdminNavbar.jsx";
import Sidebar from "@components/Sidebar/Sidebar.jsx";
import HeaderStats from "@components/Headers/HeaderStats.jsx";
import FooterAdmin from "@components/Footers/FooterAdmin.jsx";




// views

import Dashboard from "@views/admin/Dashboard.jsx";
import Maps from "@views/admin/Maps.jsx";
import Settings from "@views/admin/Settings.jsx";
import Tables from "@views/admin/Tables.jsx";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet/>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
