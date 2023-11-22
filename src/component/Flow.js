import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useRef } from "react";
import "reactflow/dist/style.css";
import FlowBlockTemplate from "./FlowBlockTemplate";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addChildNode,
} from "../features/flow/NewBoxSlice";
import {
  actionpresentnode,
  actionpresentnodeid,
} from "../features/flow/PresentNodeOrIdSlice";
import ReactFlow, {
  ConnectionLineType,
  NodeOrigin,
  Node,
  OnConnectEnd,
  OnConnectStart,
  useReactFlow,
  useStoreApi,
  Controls,
  Panel,
  Background,
} from "reactflow";

const nodeTypes = {
  mindmap: FlowBlockTemplate,
};

const nodeOrigin = [0.5, 0.5];
export var NodeIdOfCurrentHandleClick = null;
//export var NodeOfCurrentHandleClick=null
// console.log(NodeOfCurrentHandleClick)

function Flow() {
  const reactflowstore = useStoreApi();
  const dispatch = useDispatch();
  const { project } = useReactFlow();
  const connectingNodeId = useRef(null);

  const nodes = useSelector((state) => state.rf.nodes);
  const edges = useSelector((state) => state.rf.edges);

  const getChildNodePosition = (event, NodeOfCurrentHandleClick) => {
    const { domNode } = reactflowstore.getState();
    if (
      !NodeOfCurrentHandleClick ||
      !NodeOfCurrentHandleClick.position ||
      !NodeOfCurrentHandleClick.position.x ||
      !NodeOfCurrentHandleClick.position.y ||
      !NodeOfCurrentHandleClick.width ||
      !NodeOfCurrentHandleClick.height
    ) {
      return null;
    }
    const { top, left } = domNode.getBoundingClientRect();
    const panePosition = project({
      x: event.clientX - left,
      y: event.clientY - top,
    });
    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x:
        panePosition.x -
        NodeOfCurrentHandleClick.positionAbsolute.x +
        NodeOfCurrentHandleClick.width / 2,
      y:
        panePosition.y -
        NodeOfCurrentHandleClick.positionAbsolute.y +
        NodeOfCurrentHandleClick.height / 2,
    };
  };

  //ye function tabhi chlega jab node ke handle par click hoga
  //reminder.........node par jitna click krle ye function nhi chlega ,,,,,haan agar handle ho tab chlega
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
    NodeIdOfCurrentHandleClick = connectingNodeId.current;
    dispatch(
      actionpresentnodeid({ payloadpresentnodeid: NodeIdOfCurrentHandleClick })
    );
    console.log(nodeId);
  }, []);

  //onconnectionstart mein hum handle ko click kr rhe the ,jab hum click kar krke handle ko chor denge tab onnconnectionend function chlega
  const onConnectEnd = useCallback(
    (event) => {
      const { nodeInternals } = reactflowstore.getState();
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      const node = event.target.closest(".react-flow__node");

      if (node) {
        node.querySelector("input")?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const NodeOfCurrentHandleClick = nodeInternals.get(
          connectingNodeId.current
        );
        dispatch(
          actionpresentnode({ payloadpresentnode: NodeOfCurrentHandleClick })
        );

        console.log(NodeOfCurrentHandleClick);
        const childNodePosition = getChildNodePosition(
          event,
          NodeOfCurrentHandleClick
        );
        if (NodeOfCurrentHandleClick && childNodePosition) {
          dispatch(
            addChildNode({
              parentid: NodeIdOfCurrentHandleClick,
              position: childNodePosition,
            })
          );
        }
      }
    },
    [getChildNodePosition]
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={() => dispatch(applyNodeChanges({ changes: nodes }))}
      onEdgesChange={() => dispatch(applyEdgeChanges({ changes: edges }))}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={nodeOrigin}
      // defaultEdgeOptions={defaultEdgeOptions}
      // connectionLineStyle={connectionLineStyle}
      // connectionLineType={ConnectionLineType.Straight}
      fitView
      className="overflow-hidden "
    >
      <Controls showInteractive={false} />
      <Background></Background>
      <Panel position="top-left" className="header">
        React Flow Mind Map
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
