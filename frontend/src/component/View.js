import React, { useContext, useEffect } from "react";
import Flow from "./Flow";
import Text from "./Text";
import { ischecked } from "../redux/actions/TogglebuttonSlice";
import { useDispatch, useSelector } from "react-redux";
import { Download } from "./Download";

function View() {
  const dispatcher = useDispatch();
  const updatedvalue = useSelector((state) => state.toggle);
  const onchange = () => {
    dispatcher(ischecked());
  };
  var display = null;
  var width = null;
  if (updatedvalue) {
    display = "block";
    width = "w-1/2";
  } else {
    display = "hidden";
    width = "w-[100vw]";
  }

  return (
    <>
    
      
        <div
          className={`w-full   h-[89vh] `}
        >
          <Flow className="overflow-hidden"></Flow>
         
        </div>
    </>
  );
}

export default View;
