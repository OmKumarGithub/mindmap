import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNodeLabel } from "../features/flow/NewBoxSlice";
import { Handle, Position, useReactFlow } from "reactflow";
import { nanoid } from "nanoid/non-secure";
import Dagre from "@dagrejs/dagre";

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
    console.log(nodes);
    console.log(edges);
  };



  const onclickdelete = () => {
    // let tempnodes=[]
    // let tempedges=[]
    // for(let i=0; i<omnodes.length;i++){
    //   if(omnodes[i].id==id){
    //     for(let j =0;j<tempedges.length;j++){
    //       if(omedges[j].target==id){
    //         continue
    //       }
    //       tempedges.push(omedges[j])
    //     }
    //     continue
    //   }
    //   tempnodes.push(omnodes[i])
    // }

    // instance.deleteElements({nodes:,edges:})
   
    console.log(omnodes)
    console.log(omedges)
    console.log("vbjf hj ")
  };




  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      instance.setNodes([...layouted.nodes]);
      instance.setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        instance.fitView();
      });
    },
    [nodes, edges]
  );

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




  // nothing is working other than top and left
  const handleStyle ={
    left:190,
    top: -7,
  }

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
        onClick={onclickdelete}
        position={Position.Bottom}
        id="a"
        style={handleStyle}
      />
      </div>
    </>
  );
}

export default FlowBlockTemplate;
