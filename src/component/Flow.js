import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect } from "react";
import "reactflow/dist/style.css";
import FlowBlockTemplate from "./FlowBlockTemplate";

import ReactFlow, {
  Controls,
  Panel,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  // applyEdgeChanges
  // ******************************************* I *** spent 6 hrs just bcoz i made up a same name of reducer which was already there in reactflow library,
} from "reactflow";
import { applyNodeChanges, applyEdgeChanges } from "../features/flow/NewBoxSlice";


const nodeTypes = {
  mindmap: FlowBlockTemplate,
};


function Flow() {
  const initialNodes = useSelector((state) => state.rf.nodes);
  const initialEdges = useSelector((state) => state.rf.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const instance = useReactFlow();
  const dispatch =useDispatch()
  
 
  function om (){
    console.log(initialNodes,initialEdges)
  }



  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      className="overflow-hidden "
    >
      {" "}
      <Panel position="top-right"></Panel>
      <Controls showInteractive={true} />
      <Background></Background>
      
      <Panel position="top-right">
        <button onClick={om}>om</button>
        {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
