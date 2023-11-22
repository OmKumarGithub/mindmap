//iss code mein do function hein last wala main hai,reactflowprovider ke andar code wrap kar rha hai
//phela function hai layoutflow
//jo return kar rha hai reactflow,panel and panel ke andar do button hein
//reactflow parameter mein le rha hai nodes edges and onnodeschange and onedgeschange
//panel mein do button hein jo ek function call kr rhi hein with different value inside....on layout
//onlayout usecallback use kar rha hai,uske andar ek anonymous function hai with parameter direction
//hum iss function mein const bna rhe hein jo ki getlayoutelements ko call kr rha hai
//

import Dagre from "@dagrejs/dagre";
import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import { initialNodes, initialEdges } from "./nodes-edges.js";
import "reactflow/dist/style.css";

const dagreGraph = new Dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
//const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  dagreGraph({ rankdir: options.direction });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  nodes.forEach((node) => dagreGraph.setNode(node.id, node));

  Dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
