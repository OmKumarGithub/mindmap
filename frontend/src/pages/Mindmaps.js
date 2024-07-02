import React, { useEffect, useState } from "react";
// import Folder from "../Components/Folder";
import File from "../component/File";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Mindmaps = () => {
  const [count, setCount] = useState(0);
  const [toadd, setToAdd] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [issubmit, setIsSubmit] = useState(false);
  const [array, setArray] = useState([{ id: 0, name: "" }]);

  // useEffect(() => {
  //   // Fetch the array from the database
  //   fetch("http://localhost:5000/api/user")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       // setArray(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //     });
  // }, []);

  const getdata = (e) => {
    console.log(e);
    setIsSubmit(e);
  };

  const onclick = () => {
    setToAdd(!toadd);

    if (issubmit && toadd) {
      const updatedArray = [...array];
      const num = updatedArray.length;
      updatedArray.push({ id: num + 1 });
      setCount(count + 1);
      setArray(updatedArray);
    } else {
      setTimeout(() => {
        setShowDiv(!showDiv);
      }, 2000);
    }
  };

  return (
    <>
      {!issubmit && toadd && showDiv ? (
        <div
          className="p-4 mb-4 text-sm z-50 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Wrong Name!</span>
          Give file a proper Name.
        </div>
      ) : (
        <></>
      )}
      <div className="bg-gradient-to-r from-gray-50 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-500 h-screen">
        <div className="text-xl   cursor-pointer p-2 m-5 border-gray-300 border-2 shadow-md">
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faArrowLeft} /> Go back To Dashboard
          </Link>{" "}
        </div>
        <div className="flex justify-center items-center ">
          <div className="p-4 border-2 border-gray-800 border-dashed rounded-lg dark:border-white">
            <div className="grid grid-cols-2 gap-4">
              {array.map((arr) => (
                <File getdata={getdata}></File>
              ))}
              <div
                onClick={onclick}
                className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 cursor-pointer hover:"
              >
                <p className=" flex flex-col items-center gap-3 text-2xl text-gray-400 dark:text-gray-500">
                  <div>Add new file </div>
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mindmaps;
