import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ison } from "../functions/navbar/hamburgerslice";
import TogglerSwitch from "./TogglerSwitch";
import {Link,NavLink} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const dispatcher = useDispatch();
  const { loginWithRedirect ,isAuthenticated,logout,user} = useAuth0();
  const updatedvalue = useSelector((state) => state.togglehamburger);

  useEffect(() => {
    // only runs when updatevalue changes and then the component re render
    //  so that dom manipulation can be done by conditional rendering+
  }, [updatedvalue]);

  const onclickhamburger = () => {
    dispatcher(ison());
    console.log(updatedvalue);
  };
  // console.log(display)

  return (
    <>
      <nav className="drop-shadow-md bg-white border-gray-200 dark:bg-gray-800 sticky top-0 left-0 z-50  ">
        {/* navbar first div starts */}
        <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex space-x-5">
            {/* logo and website name */}
            {/* <NavLink
              to="https://flowbite.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            > */}
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                MindMap
              </span>
            {/* </NavLink> */}

            {/* left side */}
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className={({isActive})=>`block py-2 px-3 md:p-0 rounded ${isActive?"text-blue-500":"text-black  dark:text-white"}
                    text-black hover:text-blue-400 
                     dark:hover:text-blue-400 `}
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({isActive})=>`block py-2 px-3 md:p-0 rounded ${isActive?"text-blue-500":"text-black  dark:text-white"}
                    text-black hover:text-blue-400 
                     dark:hover:text-blue-400 `}
                  >
                    About
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Services
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/Contact"
                    className={({isActive})=>`block py-2 px-3 md:p-0 rounded ${isActive?"text-blue-500":"text-black  dark:text-white"}
                    text-black hover:text-blue-400 
                     dark:hover:text-blue-400 `}
                  >
                    Contact
                  </NavLink>
                </li>
                {
                  isAuthenticated?( <li>
                  <NavLink
                    to="/dashboard"
                    className={({isActive})=>`block py-2 px-3 md:p-0 rounded ${isActive?"text-blue-500":"text-black  dark:text-white"}
                    text-black hover:text-blue-400 
                     dark:hover:text-blue-400 `}
                  >
                    Dashboard                  
                    </NavLink>
                </li>):(<> </>)
                }
              </ul>
            </div>
          </div>
          {/* right side starts*/}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* get started start */}
         


{isAuthenticated?(
<span className="p-1 font-semibold border shadow-md rounded-md mr-2 pr-2 pl-2 dark:text-white dark:border-white cursor-pointer">
<FontAwesomeIcon className=" pr-2" icon={faUser} /> 
{user.name}

 
</span>):<></>
}      
            <li className=" list-none">

{
  isAuthenticated?(
    <button 
                    className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  ):(
         <button 
                    className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={() => loginWithRedirect()}>Log In</button>
  )
}
            
            
                </li>




            {/* get started ends */}

            {/* hamburger starts */}

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
              onClick={onclickhamburger}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            {/* hamburger ends */}
          </div>{" "}
          {/* right side end */}
        </div>{" "}
        {/* navbar first div ends */}
        {/* hamburger condition starts here */}
        {updatedvalue ? (
          <div className={`delay-150 w-full`} id="navbar-hamburger">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  about
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Services
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/Contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
        {/* hamburger condition ends */}
      </nav>
    </>
  );
}

export default Navbar;
