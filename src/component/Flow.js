import { useSelector } from "react-redux";
import React from "react";
import "reactflow/dist/style.css";
import FlowBlockTemplate from "./FlowBlockTemplate";

import ReactFlow, {
  Controls,
  Panel,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";


const nodeTypes = {
  mindmap: FlowBlockTemplate,
};

function Flow() {
  const initialNodes = useSelector((state) => state.rf.nodes);
  const initialEdges = useSelector((state) => state.rf.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
      <Panel position="top-left" className="header">
        React Flow Mind Map
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
