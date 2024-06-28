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
    left: 190,
    top: -7,
    background:'#FF0000',
    scale:'2',
    cursor: 'pointer',
    

  };

  return (
    <>
      <div className=" border p-1 rounded-lg">
        <div>
          <input
            id="text"
            value={inputDataValue}
            name="text"
            onChange={onChange}
            className="nodrag text-center"
          />
        </div>
        {id !== 1 ? (
          <Handle type="target" className="" position={Position.Left}></Handle>
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
        />
      </div>
    </>
  );
}

export default FlowBlockTemplate;
