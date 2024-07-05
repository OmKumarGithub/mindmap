"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import {File} from '../component/File'

function Mindmaps() {
  const [openModal, setOpenModal] = useState(false);
  const [mindmapName, setmindmapName] = useState("");
  const [showfile , setshowfile] = useState(false)
  const [filenames,setfilenames] =useState(['name1' ,'name2' , 'name3'])

  function onCloseModal() {
    setOpenModal(false);
    // setmindmapName("");
    if(mindmapName ==""){
     return}
    setfilenames((prev)=> [...prev , mindmapName])
    console.log("fvnkjdsbkj");
    setmindmapName("");
  }

  

  function addmindmapFile() {
     if(mindmapName !=""){
      onCloseModal()}
  }

  return (
    <>
    {/* ************modal */}
    <div class="flex justify-center items-center z-10">
      <Modal show={openModal}  className="w-1/3 absolute center bottom-10"size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Mindmap Name
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Text" value="Your Mindmap Name" />
              </div>
              <TextInput
                id="Text"
                placeholder="Mindmap Name"
                value={mindmapName}
                className=" "
                onChange={(event) => setmindmapName(event.target.value)}
                required
              />
            </div>
            <div className="">
              <Button onClick={addmindmapFile}>Add Mindmap</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>



{/* ***********************************modal ends **************************** */}


      <div className="h-screen w-screen bg-gradient-to-r dark:from-gray-700 dark:to-gray-500">
      {/* *************panel starts************************** */}
        <div
          id="panel"
          className="sticky relative cursor-pointer hover:scale-105 p-2  bg-blue-700 hover:bg-blue-700 inline-block  m-2 box-shadow-md rounded-md border-black"
        >
          <svg
            onClick={() => setOpenModal(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
{/* *************panel ends************************** */}



        <div className=" h-96 border shadow-white shadow-md bg-zinc-100 mx-20 rounded-lg bg-gray-300 overflow-auto flex-wrap">
        {filenames.map((name) => (
    <File key={name} demo={name} />
  ))}
        </div>
      </div>
    </>
  );
}

export default Mindmaps;
