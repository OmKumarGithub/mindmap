import React, { useContext, useEffect } from "react";
import Flow from "./Flow";
import Text from "./Text";
import { ischecked } from "../features/navbar/Togglebutton";
import { useDispatch, useSelector } from "react-redux";
import { Download } from "./Download";
import Leftbar from "./Leftbar";

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
    
      <div className="flex  space-x-1 overflow-hidden">
        <div className={`${display} w-1/2 m-1 shadow-2xl delay-50 `}>
          <Text></Text>
          {/* <Download></Download> */}
        </div>
        {/* u need to define flow height bcoz it reactflow which cannot be rendered without  width and height */}
        <div
          className={`${width} m-1 drop-shadow-md h-[89vh] delay-50 shadow-2xl overflow-hidden`}
        >
          <Flow className="overflow-hidden"></Flow>
          <Leftbar></Leftbar>
          <Download></Download>
        </div>
      </div>
    </>
  );
}

export default View;
