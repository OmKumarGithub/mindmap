import React, { useContext, useEffect, useState } from 'react'
import { useReactFlow } from 'reactflow';



function Text() {
  const instance = useReactFlow();
  const [text,settext]=useState()


  useEffect(() => {
    window.addEventListener("resize", instance.fitView);

    return () => {
      window.removeEventListener("resize", instance.fitView);
    };
  })

  function createSibling(){

  }


useEffect(()=>{

})



  function textToGraph(){
    createSibling()
  }

  return (
    <>
        
        <button onClick={textToGraph} className='border border-black m-8'>
          hidkcnjd
        </button>
     
      
    </>
  )
}

export default Text