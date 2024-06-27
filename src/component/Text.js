import React, { useContext, useEffect, useState } from 'react'
import { useReactFlow } from 'reactflow';



function Text() {
  const instance = useReactFlow();


  useEffect(() => {
    window.addEventListener("resize", instance.fitView);

    return () => {
      window.removeEventListener("resize", instance.fitView);
    };
  })

  return (
    <>
        <div contentEditable='false' >
        WRITE ANY THINGbnvbn
     
       </div> 
    </>
  )
}

export default Text