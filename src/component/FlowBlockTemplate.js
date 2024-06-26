// first commit
import Dagre from "@dagrejs/dagre";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChildNode,
  updateNodeLabel,
  applyEdgeChanges,
  applyNodeChanges,
} from "../features/flow/NewBoxSlice";
import { Handle, Position, useReactFlow } from "reactflow";



//ye id jo hum parameter mein de rhe hein wo reactflow khud detect kar rha hai
//......reactflow ke andar ek parameter pass kr rkha hai nodetypes naam ka aur wo ek object leta hai
//jismein flowblocktemplate ki value hai
export function FlowBlockTemplate({ id, data }) {


  const dispatch = useDispatch();
  const nodes = (useSelector(state => state.rf.nodes));
  const edges =(useSelector(state => state.rf.edges));

  var [count, setcount] = useState(1);
  var [inputDataValue , SetInputDataValue]=useState(data.value)
 
  





  const onclickHandle = () => {
    // console.log(id);
 


dispatch(addChildNode({parentid:id}))








    // const presentnodeid = id;
    // const node = nodes.find((node) => node.id === presentnodeid);
    // const position = node.position;
    // console.log(position);
    // const parentx = position.x;
    // const parenty = position.y;
    // // LogicNodes(presentnodeid, count, parentx, parenty);
    // dispatch(
    //   addChildNode({
    //     parentid: presentnodeid,
    //     position: { x: parentx + 150, y: parenty },
    //   })
    // );
 


    console.log(nodes)
  };
  
  
  
  
  const onChange = (evt) => {
    SetInputDataValue(evt.target.value)
    dispatch(updateNodeLabel( { nodeId:id, label:inputDataValue }));
for(let i=0;i<nodes.length;i++){
  if(nodes[i].id==id){
    console.log(nodes[i].data)
  }
}


  };

  return (
    <>
      <div className=" border p-1 rounded-lg">
        <div>
               <input id="text" value={inputDataValue}  name="text" onChange={onChange} className="nodrag" />
        </div>
        
        <Handle
          type="target"
          position={Position.Left}
          // onClick={onclickHandle}
        ></Handle>

        
        
        <Handle
          type="source"
          position={Position.Right}
          onClick={onclickHandle}
        ></Handle></div>
     
    </>
  );
}

export default FlowBlockTemplate;
