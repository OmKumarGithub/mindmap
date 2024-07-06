import { useDispatch, useSelector  } from "react-redux";
import React, { useCallback, useEffect } from "react";
import "reactflow/dist/style.css";
import FlowBlockTemplate from "./FlowBlockTemplate";
import TurboEdge from  "./Edge.tsx"


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
import { applyNodeChanges, applyEdgeChanges } from "../redux/actions/NewBoxSlice";
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


  const edgeTypes = {
  turbo: TurboEdge,
};


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      // edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      // style={{ background: "#E5E4E2"}}
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
      {/* <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg> */}
      
    
      <Background  color="#5d6473" size={1.5} variant={BackgroundVariant.Dots}  ></Background>
      <MiniMap nodeStrokeWidth={3} pannable={true} />
      <Panel position="top-right">
       
        {/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
      </Panel>
    </ReactFlow>
  );


}

export default Flow;
