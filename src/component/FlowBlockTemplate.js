import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChildNode,
  applyEdgeChanges,
  applyNodeChanges,
  updateNodeLabel,
} from "../features/flow/NewBoxSlice";
import { Handle, Position, useReactFlow } from "reactflow";
import { nanoid } from "nanoid/non-secure";
import Dagre from "@dagrejs/dagre";
import CrossSvg from "./CrossSvg";

// *************************BOLIER PLATE CODE***************************
const dagreGraph = new Dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 136;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

// const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
//   initialNodes,
//   initialEdges
// );
// ***************************************************************************

//*************************************************** */
function findingalldeletenodesId(tempid, pdeletedNodesId, funParEdges) {
  let count = 0;
  let deletedSiblingsId = [];

  for (let i = 0; i < funParEdges.length; i++) {
    if (funParEdges[i].source === tempid) {
      deletedSiblingsId.push(funParEdges[i].target);
      count = 1;
    }
  }

  // ye leaf node hai and base statement
  if (count === 0) {
    return [...pdeletedNodesId, tempid];
  }

  // ye sibling hai
  for (let j = 0; j < deletedSiblingsId.length; j++) {
    pdeletedNodesId = findingalldeletenodesId(
      deletedSiblingsId[j],
      pdeletedNodesId,
      funParEdges
    );
  }

  return [...pdeletedNodesId, tempid];
}
// *********************************************************

//ye id jo hum parameter mein de rhe hein wo reactflow khud detect kar rha hai
//......reactflow ke andar ek parameter pass kr rkha hai nodetypes naam ka aur wo ek object leta hai
//jismein flowblocktemplate ki value hai

export function FlowBlockTemplate({ id, data }) {
  const [inputDataValue, SetInputDataValue] = useState(data.label);
  // const [rows, setrows] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const omnodes = useSelector((state) => state.rf.nodes);
  const omedges = useSelector((state) => state.rf.edges);

  const dispatch = useDispatch();

  const instance = useReactFlow();
  const nodes = instance.getNodes();
  const edges = instance.getEdges();
  const node = instance.getNode(`${id}`);
  // console.log(node.data.label);
  const [rows, setrows] = useState(1);

  //added window listner
  useLayoutEffect(() => {
    window.addEventListener("resize", instance.fitView);

    return () => {
      window.removeEventListener("resize", instance.fitView);
    };
  }, []);
  //  instance.setNodes(prev => [...layouted.nodes]);
  //       instance.setEdges(prev =>[...layouted.edges]);
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      // setNodes([...layoutedNodes]);
      // setEdges([...layoutedEdges]);
      instance.setNodes((prev) => [...layoutedNodes]);
      instance.setEdges((prev) => [...layoutedEdges]);


      // instance.fitView()
      window.requestAnimationFrame(() => instance.fitView());
    

    },
    [nodes, edges , instance]
  );

  useLayoutEffect(() => {
    onLayout("LR");
  }, []);

  // add krega node but u can use this as well .........  const deleteElements = instance.deleteElements;
  //i dont know what it takes as parameter
  const onclickHandle = () => {
    let nid = "" + nanoid();
    let edgeid = "e" + id + "" + nid + "";

    instance.setNodes((prev) => [
      ...prev,
      {
        id: nid,
        type: "mindmap",
        data: { label: "" },
        position: { x: 0, y: 0 },
      },
    ]);
    const edgeType = "smoothstep";
    instance.setEdges((prev => [...prev , { id: edgeid, source: id, target: nid, type: edgeType, animated: true  }]))
    // dispatch(addChildNode({ parentid: id }));

    console.log(nodes);
    console.log(edges);
  };

  const onclickdelete = () => {
    let deletedNodesId = findingalldeletenodesId(id, [], edges);

    console.log(nodes)
    console.log(deletedNodesId)
    console.log(id)
    console.log(edges)
//     let newNodes = omnodes.filter(
//       (oknode) => !deletedNodesId.includes(oknode.id)
//     );
//     let newEdges = omedges.filter(
//       (okedge) =>
//         !deletedNodesId.includes(okedge.source) &&
//         !deletedNodesId.includes(okedge.target)
//     );


// instance.setNodes([...newNodes])
// instance.setEdges([...newEdges])



    instance.setNodes((prev) => prev.filter((oknode) => !deletedNodesId.includes(oknode.id)));
    
    instance.setEdges((prev) => prev.filter((okedge) =>!deletedNodesId.includes(okedge.source) &&!deletedNodesId.includes(okedge.target)));



    // window.requestAnimationFrame(() => onLayout("LR"));
    // onLayout("LR");
  };

  const onChange = (evt) => {
    SetInputDataValue(evt.target.value);
    dispatch(updateNodeLabel({ nodeId: id, label: inputDataValue }));
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        console.log(omnodes[i].data);
      }
    }
    let tempRows = Math.ceil(evt.target.value.length / 15);
    setrows(tempRows);

    instance.setNodes((pre) =>
      pre.map((ok) => {
        if (ok.id != id) {
          return ok;
        } else {
          return {
            ...ok,
            data: {
              ...ok.data,
              label: evt.target.value,
            },
          };
        }
      })
    );
  };

  // nothing is working other than top and left .........i think react flow will override some property when rendering
  const handleStyle = {
    left: 160,
    top: -5.5,
    background: "white",
  };

  return (
    <>
      <div className=" border p-1 shadow-md rounded-lg bg-white">
        {/* <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"> */}

        <textarea
         value={inputDataValue}
          onChange={onChange}
          className="resize-none border rounded-md p-2"
          style={{ height: "auto", overflow: "hidden", minHeight: "80px" }}
          rows={rows}
          placeholder="Enter text..."
        >
          {inputDataValue}
        </textarea>

        {id !== "1" ? (
          <>
            <Handle
              type="target"
              className=""
              position={Position.Left}
            ></Handle>
          </>
        ) : (
          <></>
        )}

        <Handle
          type="source"
          position={Position.Right}
          onClick={onclickHandle}
        ></Handle>

        <Handle
          onClick={() => {
            onclickdelete();
          }}
          position={Position.Bottom}
          id="a"
          style={handleStyle}
        >
          <CrossSvg></CrossSvg>
        </Handle>
      </div>
    </>
  );
}

export default FlowBlockTemplate;
