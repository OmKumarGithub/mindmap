import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import Addsvg from "./Addsvg";
import ImageaddSvg from "./ImageaddSvg";
import '../index.css'

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

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      console.log("onlayout......nodes      edges");
      console.log(nodes);
      console.log(edges);
      console.log("onlayout......layooutednodes      layoutededges");
      console.log(layoutedNodes);
      console.log(layoutedEdges);
      instance.setNodes((prev) => [...layoutedNodes]);
      instance.setEdges((prev) => [...layoutedEdges]);

      // instance.fitView()
      window.requestAnimationFrame(() => instance.fitView());
    },
    [nodes.position, edges, instance]
  );

  useLayoutEffect(() => {
    onLayout("LR");
  }, []);

  // add krega node but u can use this as well .........  const deleteElements = instance.deleteElements;
  //i dont know what it takes as parameter
  const onclickHandle = useCallback(() => {
    if(data.label==""){
    return  alert("Hey User!!!!!!! first write something in node ........");
    
    }

    let nid = "" + nanoid();
    let edgeid = "e" + id + "" + nid + "";

    const edgeType = "smoothstep";



      instance.addNodes( {
        id: nid,
        type: "mindmap",
        data: { label: "" },
        position: { x: 0, y: 0 },
      })

     
      instance.addEdges({ id: edgeid, source: id, target: nid, type: edgeType, animated: true })
    // instance.setNodes((prev) => [
    //   ...prev,
      // {
      //   id: nid,
      //   type: "mindmap",
      //   data: { label: "" },
      //   position: { x: 0, y: 0 },
      // },
    // ]);
    // const edgeType = "smoothstep";
    // instance.setEdges((prev) => [
    //   ...prev,
      // { id: edgeid, source: id, target: nid, type: edgeType, animated: true },
    // ]);
    // dispatch(addChildNode({ parentid: id }));
  },[nodes,edges]);

  const onclickdelete = useCallback(() => {
    let deletedNodesId = findingalldeletenodesId(id, [], edges);
    console.log("in onclickdelete nodes , deletenodesid , id ,edges");
    console.log(nodes);
    console.log(deletedNodesId);
    console.log(id);
    console.log(edges);

    let demonodes = nodes.filter(
      (oknode) => !deletedNodesId.includes(oknode.id)
    );
    let demoedges = edges.filter(
      (okedge) =>
        !deletedNodesId.includes(okedge.source) &&
        !deletedNodesId.includes(okedge.target)
    );
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      demonodes,
      demoedges,
      "LR"
    );
    instance.setNodes((prev) => [...layoutedNodes]);
    instance.setEdges((prev) => [...layoutedEdges]);
    window.requestAnimationFrame(() => instance.fitView());

    setTimeout(() => {
      const { nodes: ekaurlayoutedNodes, edges: ekaurlayoutedEdges } =
        getLayoutedElements(layoutedNodes, layoutedEdges, "LR");
      instance.setNodes((prev) => [...ekaurlayoutedNodes]);
      instance.setEdges((prev) => [...ekaurlayoutedEdges]);
      window.requestAnimationFrame(() => instance.fitView());
      // window.requestAnimationFrame(() => onLayout("LR"))
    }, 0);

    // instance.setNodes((prev) => prev.filter((oknode) => !deletedNodesId.includes(oknode.id)));

    // instance.setEdges((prev) => prev.filter((okedge) =>!deletedNodesId.includes(okedge.source) &&!deletedNodesId.includes(okedge.target)));
    // onLayout("LR")
  },[nodes,edges]);

  const onChange = (evt) => {
    SetInputDataValue(evt.target.value);
    // dispatch(updateNodeLabel({ nodeId: id, label: inputDataValue }));

    let tempRows = Math.ceil(evt.target.value.length / 15);
    // setrows(tempRows);

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
  // const handleStyle = {
  //   left: 160,
  //   top: -5.5,
  //   background: "white",
  // };
  const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    


  const onclickHandlingFile =()=>{

  }

  return (
    <>
      <div className=" border p-1 shadow-md rounded-lg bg-white">
        {id !== "1" ? (
          <>
            <textarea
              value={inputDataValue}
              onChange={onChange}
              className="resize-none border rounded-md p-2"
              style={{ height: "auto", overflow: "hidden", minHeight: "80px" }}
              rows={3}
              placeholder="Enter text..."
            >
              {inputDataValue}
            </textarea>
            <Handle
              type="target"
              className=""
              position={Position.Left}
            ></Handle>
          </>
        ) : (
          <textarea
            value={inputDataValue}
            disabled="disabled"
            onChange={onChange}
            className="resize-none border  cursor-not-allowed rounded-md p-2"
            style={{ height: "auto", overflow: "hidden", minHeight: "80px" }}
            rows={1}
            placeholder="Enter text..."
          >
            {inputDataValue}
          </textarea>
        )}
        <Handle type="source" position={Position.Right} onClick={onclickHandle}>
          <Addsvg></Addsvg>
        </Handle>

        {/* we have to define it 2 times i dont know why, if we dont ,it just break into shambles */}
        {id !== "1" ? (
          <Handle
            onClick={() => {
              onclickdelete();
            }}
            position={Position.Top}
            style={{position:"Relative",top:-102, left:170}}
            id="a"
          >
            <CrossSvg></CrossSvg>
          </Handle>
        ) : (
          <></>
        )}

        {id !== "1" ? (
          <Handle
            onClick={() => {
              onclickHandlingFile();
            }}
            position={Position.Left}
            id="a"
            
          >
          {/* <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" /> */}

           <ImageaddSvg></ImageaddSvg> 
          {/* </input> */}
          
          </Handle>
        ):(<></>)}


      </div>
    </>
  );
}

export default FlowBlockTemplate;
