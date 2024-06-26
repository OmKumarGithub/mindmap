
import { useSelector } from "react-redux";
import { stratify, tree } from 'd3-hierarchy';
import React, { useCallback} from "react";
import "reactflow/dist/style.css";
import FlowBlockTemplate from "./FlowBlockTemplate";

import ReactFlow, {
  useReactFlow,
  Controls,
  Panel,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

const nodeTypes = {
  mindmap: FlowBlockTemplate,
};

export var NodeIdOfCurrentHandleClick = null;


const g = tree();



const getLayoutedElements = (nodes, edges, options) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    .getBoundingClientRect();
  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout
      .descendants()
      .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
    edges,
  };
};


function Flow() {
  
  const initialNodes = (useSelector(state => state.rf.nodes));
  const initialEdges =(useSelector(state => state.rf.edges));
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, {
        direction,
      });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

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
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      className="overflow-hidden "
    > <Panel position="top-right">
        <button className="border border-black" onClick={onLayout}>layout</button>
      </Panel>
      <Controls showInteractive={false} />
      <Background></Background>
      <Panel position="top-left" className="header">
        React Flow Mind Map
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
