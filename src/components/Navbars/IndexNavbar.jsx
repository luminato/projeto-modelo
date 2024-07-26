/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import supabase from '@supabasePath/supabaseClient';
import { FaSignInAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'; 

import noPhoto from "@img/no-photo.webp";

const UserDropdown = ({ user, logout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const openDropdown = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownVisible(true);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverDropdownRef.current &&
        !popoverDropdownRef.current.contains(event.target) &&
        !btnDropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Dropdown Button */}
      <a
        className="lg:flex items-center cursor-pointer"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownVisible ? closeDropdown() : openDropdown();
        }}
      >
        <img
          src={user?.user_metadata.photoURL || noPhoto}
          alt="Profile"
          className="rounded-full"
          width="30"
          height="30"
        />
      </a>
      {/* Dropdown Menu */}
      <div
        ref={popoverDropdownRef}
        className={`${
          dropdownVisible ? "block" : "hidden"
        } bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48 lg:right-auto right-0`}
      >
        <div className="flex flex-col items-start">
          <div className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400">
            {user?.user_metadata.firstName} {user?.user_metadata.lastName}
          </div>
          <div className="h-0 mx-2 my-2 border border-solid border-blueGray-100" />
          <Link
            to="/admin/settings"
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          >
            <FaCog className="inline-block mr-2" /> Configurações
          </Link>
          <div className="h-0 mx-2 my-2 border border-solid border-blueGray-100" />
          <button
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            onClick={logout}
          >
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default function IndexNavbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const redirectToLogin = () => {
    navigate("/auth/login");
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setUser(null);
      navigate('/');
    }
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Vupt!
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/offers"
                  className="bg-teal-500 text-white active:bg-teal-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                >
                  Ofertas
                </Link>
              </li>
              {user ? (
                <>
                  <li className="flex items-center">
                    <Link
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                      to="/announce"
                    >
                      Anunciar
                    </Link>
                  </li>
                  <li className="flex items-center lg:hidden">
                    <Link
                      to="/admin/settings"
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                    >
                      <FaCog className="inline-block mr-2" /> Configurações
                    </Link>
                  </li>
                  <li className="flex items-center lg:hidden">
                    <button
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      onClick={logout}
                    >
                      <FaSignOutAlt className="inline-block mr-2" /> Logout
                    </button>
                  </li>
                  <li className="hidden lg:flex items-center">
                    <UserDropdown user={user} logout={logout} />
                  </li>
                </>
              ) : (
                <li className="flex items-center">
                  <button
                    onClick={redirectToLogin}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 flex items-center"
                  >
                    <FaSignInAlt className="mr-2" /> {/* Adicionando ícone de login */}
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
