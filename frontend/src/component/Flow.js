import { useDispatch, useSelector  } from "react-redux";
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
  MiniMap,
  BackgroundVariant,
  ControlButton,
  ConnectionLineType,
  // applyEdgeChanges
  // ******************************************* I *** spent 6 hrs just bcoz i made up a same name of reducer which was already there in reactflow library,
} from "reactflow";
import { applyNodeChanges, applyEdgeChanges } from "../features/flow/NewBoxSlice";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Download } from "./Download";


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


  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );
 
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
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      style={{ background: "#E5E4E2"}}
      fitView 
      className=" "
    >
      {" "}
      <Panel position="top-right"></Panel>
      <Controls showInteractive={true} >
      <ControlButton  >
          {/* <MagicWandIcon></MagicWandIcon> */}
          <Download></Download>
          
          
        </ControlButton>
      </Controls>
      
    
      <Background  color="#5d6473" variant={BackgroundVariant.Dots}  ></Background>
      <MiniMap nodeStrokeWidth={3} pannable={true} />
      <Panel position="top-right">
       
        {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
      </Panel>
    </ReactFlow>
  );


}

export default Flow;
