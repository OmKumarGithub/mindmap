import React, { useEffect, useState } from "react";
import Folder from "../component/Folder";
import { useAuth0 } from "@auth0/auth0-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faNetworkWired,
  faHouse,
  faBuilding,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
const array = [{ id: 0, name: "" }];
const Dashboard = () => {
  const { user, logout } = useAuth0();

  const [count, setcount] = useState(0);
  const [showuser, setshowuser] = useState(false);
  const [showFolder, setshowFolder] = useState(true);
  const [showMindmaps, setshowMindmaps] = useState(false);
  const [toadd, settoadd] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [issubmit, setissubmit] = useState(false);

  useEffect(() => {}, [array]);

  const onclick = () => {
    settoadd(!toadd);

    if (issubmit && toadd) {
      const num = array.length;
      array.push({ id: num + 1 });
      setcount(count + 1);
    } else {
      setTimeout(() => {
        setShowDiv(!showDiv);
      }, 2000);
    }

    //       console.log(!issubmit)
    //  console.log(toadd)
    //  console.log(!showDiv)
  };
  useEffect(() => {
    if (!showFolder && !showMindmaps && !showuser) {
      setshowFolder(true);
      setshowuser(false);
      setshowMindmaps(false);
    }
  }, [showFolder]);

  const userhandler = () => {
    setshowuser(!showuser);
    setshowFolder(false);
    setshowMindmaps(false);
    console.log(`${showuser}____user `);
    console.log(`${showMindmaps}____mindmap `);
    console.log(`${showFolder}____folder `);
  };

  const Folderhandler = () => {
    setshowFolder(!showFolder);
    setshowuser(false);
    setshowMindmaps(false);
    console.log(`${showuser}____user `);
    console.log(`${showMindmaps}____mindmap `);
    console.log(`${showFolder}____folder `);
  };

  const Mindmapshandler = () => {
    setshowMindmaps(!showMindmaps);
    setshowuser(false);
    setshowFolder(false);
    console.log(`${showuser}____user `);
    console.log(`${showMindmaps}____mindmap `);
    console.log(`${showFolder}____folder `);
  };
  //  let issubmit=false
  const getdata = (e) => {
    setissubmit(e);
  };

  console.log(!issubmit);
  console.log(toadd);
  console.log(!showDiv);

  return (
    <>
      {!issubmit && toadd && showDiv ? (
        <div
          className="p-4 mb-4 text-sm z-50 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert">
          <span class="font-medium">Wrong Name!</span> 
          Give folder a proper Name.
        </div>
      ) : (
        <></>
      )}
      <div className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 h-[91vh]">
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 left-0 mt-20 z-30 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <div
                  onClick={Folderhandler}
                  className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faFolder} />
                  <span className="ms-3">Folder</span>
                </div>
              </li>
              <li>
                <div
                  onClick={Mindmapshandler}
                  className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faNetworkWired} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    MindMaps
                  </span>
                </div>
              </li>
              <li onClick={userhandler} className="cursor-pointer">
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <FontAwesomeIcon icon={faUser} />

                  <span className="flex-1 ms-3 whitespace-nowrap">User</span>
                </div>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faHouse} />

                  <span className="ms-3">Home</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/About"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faBuilding} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    About Us
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/Contact"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Contact us
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64 ">
          {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-white"> */}
          {showuser ? (
            <>
              <div className="flex justify-center text-3xl  mb-7 font-semibold ">
                User Details
              </div>
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-white">
                <img
                  src={user.picture}
                  height="100px"
                  width="100px "
                  className="hover:scale-110 cursor-pointer rounded-md mb-5"
                />

                <div>
                  Username is <span className="font-bold"> {user.name}</span>
                </div>
                <div>
                  Useremail is <span className="font-bold"> {user.email}</span>
                </div>

                <div>
                  Last Visited at{" "}
                  <span className="font-bold"> {user.updated_at}</span>
                </div>

                <button
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none mt-20 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </button>
              </div>
            </>
          ) : showFolder ? (
            <>
              <div className="flex justify-center text-3xl  mb-7 font-semibold dark:text-white ">
                Total folders : {count + 1}
              </div>
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-white">
                <div className="grid grid-cols-2 gap-4">
                  {array.map((arr) => (<Folder getdata={getdata}></Folder>))}

                  <div
                    onClick={onclick}
                    className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 cursor-pointer hover:"
                  >
                    <p className=" flex flex-col items-center gap-3 text-2xl text-gray-400 dark:text-gray-500">
                      {/* {count}
                       */}
                      <div>Add new folder </div>{" "}
                      <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : showMindmaps ? (
            <div className="flex justify-center text-3xl  mb-7 font-semibold ">
              Total Mindmaps
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default Dashboard;
