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
  // *******************************************i spent 6 hrs just bcoz i made same name of reducer which was already there in reactflow library,
} from "reactflow";
import { applyNodeChanges, applyEdgeChanges } from "../features/flow/NewBoxSlice";


const nodeTypes = {
  mindmap: FlowBlockTemplate,
};











const omnodes= [
  {
      "id": "3",
      "type": "mindmap",
      "data": {
          "label": "ooooooooo",
      },
      "position": {
          "x": 577.5,
          "y": 16.5
      },
      "positionAbsolute": {
          "x": 577.5,
          "y": 16.5
      },
      "x": 577.5,
      "y": 16.5,
      "rank": 4,
      "width": 156,
      "height": 33
  },
  {
      "id": "2",
      "type": "mindmap",
      "data": {
          "label": "ooooooooo"
      },
      "position": {
          "x": 336.5,
          "y": 16.5
      },
      "positionAbsolute": {
          "x": 336.5,
          "y": 16.5
      },
      "x": 336.5,
      "y": 16.5,
      "rank": 2,
      "width": 191,
      "height": 33
  },
  {
      "id": "1",
      "type": "mindmap",
      "data": {
          "value": ""
      },
      "position": {
          "x": 95.5,
          "y": 16.5
      },
      "parentNode": null,
      "positionAbsolute": {
          "x": 95.5,
          "y": 16.5
      },
      "x": 95.5,
      "y": 16.5,
      "rank": 0,
      "width": 191,
      "height": 33
  }
]

const omedges=[
  {
      "id": "e23",
      "source": "2",
      "target": "3",
      "animated": true
  },
  {
      "id": "e12",
      "source": "1",
      "target": "2",
      "animated": true
  }
]




















function Flow() {
  const initialNodes = useSelector((state) => state.rf.nodes);
  const initialEdges = useSelector((state) => state.rf.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const instance = useReactFlow();
  const dispatch =useDispatch()
  
  // useEffect(()=>{
    // // console.log("from instance.getNodes")
    // // console.log(instance.getNodes())
    // // console.log(typeof instance.getNodes())
    // console.log("*********************************")

    // console.log("from nodes")
    // console.log(nodes)
    // console.log(typeof nodes)
    // console.log("*********************************")


    // console.log("from redux nodes")
    // console.log(initialNodes)
    // console.log(typeof initialNodes)
    // console.log("*********************************") 
  //   dispatch(applyNodeChanges({changes:JSON.stringify([...nodes])}))
  //   dispatch(applyEdgeChanges({changes:JSON.stringify([...edges])}))
  // },[nodes,edges])

  function om (){
    // console.log(instance.getEdges())
    // console.log(instance.getNodes())
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
