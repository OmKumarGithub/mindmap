import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder,faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Folder = (props) => {
  const navigate = useNavigate()
  const [name, setname] = useState("");
  const [issubmit,setissubmit]=useState(false)
  const [showDiv, setShowDiv] = useState(true);


const count =props.count 
  const handleInputChange = (e) => {
    setname(e.target.value);
    if(e.target.value==""){
      console.log("fvkorjnf")
    }
    
  };
  // console.log(issubmit) 
  props.getdata(issubmit)

  const linker =()=>{
    navigate("/mindmaps")
  }
  const handleSubmit=(e)=>{
    e.preventDefault();setissubmit(true)
 
  setTimeout(() => {setShowDiv(!showDiv);}, 1000); 

  const data = {
    name,

  };
  
  
  
  axios
    .post('http://localhost:5000/api/folder', data)
    .then((response) => {
  
      if(response.data.msg == "success"){
         
      console.log("ok")
      }
      else if (response.data.msg == "fail" ){
          // setfail(true)
      }
  
      // if (response.data.success) {
      //   setResponseMessage('Form submitted successfully');
      //   setSuccess(true)
      // } else {
      //   setResponseMessage('Form submission failed');
      // }
    })
    .catch((error) => {
      console.error(error);
      
    }
    );
  }
  return (
    <>
      <div  className="flex items-center flex-col justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 cursor-pointer">
        <p className="text-2xl text-gray-400 dark:text-gray-500 ">
        
         
         
         
    {issubmit && showDiv?(      <span class="relative flex h-3 w-3 mb-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75 "><FontAwesomeIcon  icon={faCheck} /></span>
  </span>
    ):(
      <FontAwesomeIcon onClick={linker} icon={faFolder} className='scale-[2]'/>


    )}

        </p>
        {/* <span className='mt-2 dark:text-white '>New Folder {count}</span> */}
        <form 
        className='flex gap-2 '
        onSubmit={handleSubmit}
        >
        <label htmlFor="foldername"></label>
        <input
          className={`block text-base py-1 px-4 rounded-lg mt-4 w-36  bg-white border-2  text-center focus:border cursor-pointer  }`}
          type="text"
          autoComplete="off"
          required
          value={name}
          onChange={handleInputChange}
          placeholder='Folder Name'
     
        />
    
        <button 
       
        className='p-1 text-sm  border-2  rounded-md mt-3 l-3 cursor-pointer bg-blue-600 text-white'>save</button>
        </form>
      </div>
    </>
  );
}

export default Folder;