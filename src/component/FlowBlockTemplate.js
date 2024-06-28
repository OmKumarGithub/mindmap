import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChildNode,
  applyEdgeChanges,
  applyNodeChanges,
  updateNodeLabel,
} from "../features/flow/NewBoxSlice";
import { Background, Handle, Position, useReactFlow } from "reactflow";
import { nanoid } from "nanoid/non-secure";
import Dagre from "@dagrejs/dagre";
import { Tooltip } from "flowbite-react";

// *************************BOLIER PLATE CODE***************************
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);
  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
// ***************************************************************************

//ye id jo hum parameter mein de rhe hein wo reactflow khud detect kar rha hai
//......reactflow ke andar ek parameter pass kr rkha hai nodetypes naam ka aur wo ek object leta hai
//jismein flowblocktemplate ki value hai

export function FlowBlockTemplate({ id, data }) {
  const omnodes = useSelector((state) => state.rf.nodes);
  const omedges = useSelector((state) => state.rf.edges);
  const fun = useSelector((state) => state.rf.fun);

  const dispatch = useDispatch();

  const instance = useReactFlow();
  const deleteElements = instance.deleteElements;
  const nodes = instance.getNodes();
  const edges = instance.getEdges();
  const node = instance.getNode(`${id}`);
  var [inputDataValue, SetInputDataValue] = useState(data.value);
  const [rows ,setrows] =useState(1)

  const onclickHandle = () => {
    let nid = "" + nanoid();
    let edgeid = "e" + id + "" + nid + "";
    instance.addNodes({
      id: nid,
      type: "mindmap",
      data: { label: "ooooooooo" },
      position: { x: node.position.x + 250, y: node.position.y },
    });

    instance.addEdges({ id: edgeid, source: id, target: nid, animated: true });
    dispatch(addChildNode({ parentid: id }));
    console.log(nodes);
    console.log(edges);
  };



  function findingalldeletenodesId(tempid, pdeletedNodesId, omedges) {
    let count = 0;
    let deletedSiblingsId = [];

    for (let i = 0; i < omedges.length; i++) {
      if (omedges[i].source === tempid) {
        deletedSiblingsId.push(omedges[i].target);
        // Found at least one child
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
        omedges
      );
    }

    return [...pdeletedNodesId, tempid];
  }

  const [isUpdating, setIsUpdating] = useState(false);

  const onLayout = useCallback(
    (direction) => {
      if (isUpdating) return;

      setIsUpdating(true);

      const layouted = getLayoutedElements(nodes, edges, { direction });

      instance.setNodes([...layouted.nodes]);
      instance.setEdges([...layouted.edges]);

      //  cyclic dependency aa rhi thi isliye kra
      setTimeout(() => {
        dispatch(
          applyNodeChanges({ changes: JSON.stringify([...layouted.nodes]) })
        );
        dispatch(
          applyEdgeChanges({ changes: JSON.stringify([...layouted.edges]) })
        );
        setIsUpdating(false);
      }, 0);

      window.requestAnimationFrame(() => {
        instance.fitView();
      });
    },
    [nodes, edges]
  );

  const onclickdelete = () => {
    let deletedNodesId = findingalldeletenodesId(id, [], omedges);

    let newNodes = omnodes.filter(
      (oknode) => !deletedNodesId.includes(oknode.id)
    );
    let newEdges = omedges.filter(
      (okedge) =>
        !deletedNodesId.includes(okedge.source) &&
        !deletedNodesId.includes(okedge.target)
    );


    // console.log("before from nodes");
    // console.log(nodes);
    // console.log(typeof nodes);
    // console.log("*********************************");

    // console.log("before from reduxnodes");
    // console.log(omnodes);
    // console.log(typeof omnodes);
    // console.log("*********************************");

    
    instance.setNodes([...newNodes]);
    instance.setEdges([...newEdges]);

    onLayout("LR");
  };

  useLayoutEffect(() => {
    onLayout("LR");
  });

  const onChange = (evt) => {
    SetInputDataValue(evt.target.value);
    dispatch(updateNodeLabel({ nodeId: id, label: inputDataValue }));
    for (let i = 0; i < omnodes.length; i++) {
      if (omnodes[i].id == id) {
        console.log(omnodes[i].data);
      }

     let tempRows = Math.ceil((evt.target.value.length /15)-(evt.target.value.length)/80)
      setrows(tempRows);


    }
  };

  //added window listner
  useEffect(() => {
    window.addEventListener("resize", instance.fitView);

    return () => {
      window.removeEventListener("resize", instance.fitView);
    };
  }, []);

  // nothing is working other than top and left\




  
  const handleStyle = {
    left:160,
    top: -5.5,

background:"white"

  };

  return (
    <>
      <div className=" border p-1 shadow-md rounded-lg bg-white">
      {/* <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"> */}





      <textarea
      
            value={inputDataValue}
            onChange={onChange}
            className="resize-none border rounded-md p-2"
            style={{ height: 'auto',overflow:'hidden', minHeight: '80px'  }}
            rows= {rows}
            placeholder="Enter text..."
        />
        {/* <div>
          <input
            id="text"
            value={inputDataValue}
            name="text"
            onChange={onChange}
            className="nodrag text-center"
          />
        </div> */}
        {id !== "1" ? (<>
          <Handle type="target" className="" position={Position.Left}></Handle>
</>
        ) : (
          <></>
        )}
        
        <Handle
          type="source"
          position={Position.Right}
          onClick={onclickHandle}
        >
          
        </Handle>

        <Handle
          onClick={() => {
            onclickdelete();
          }}
          position={Position.Bottom}
          id="a"
          style={handleStyle}
        >
<svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1"  className=" cursor-pointer   hover:animate-pulse" >
    
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
        <g id="Icon-Set-Filled"  transform="translate(-570.000000, -1089.000000)" fill="#000000">
            <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" >

</path>
        </g>
    </g>
</svg>

        </Handle>
      </div>
    </>
  );
}

export default FlowBlockTemplate;
