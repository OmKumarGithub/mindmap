import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  addChildNode, updateNodeLabel } from "../features/flow/NewBoxSlice";
import { Handle, Position, useReactFlow } from "reactflow";

//ye id jo hum parameter mein de rhe hein wo reactflow khud detect kar rha hai
//......reactflow ke andar ek parameter pass kr rkha hai nodetypes naam ka aur wo ek object leta hai
//jismein flowblocktemplate ki value hai
export function FlowBlockTemplate({ id, data }) {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.rf.nodes);
  const edges = useSelector((state) => state.rf.edges);

  var [inputDataValue, SetInputDataValue] = useState(data.value);

  const onclickHandle = () => {
    dispatch(addChildNode({ parentid: id }));
    console.log(nodes);
    console.log(edges);
  };

  const onChange = (evt) => {
    SetInputDataValue(evt.target.value);
    dispatch(updateNodeLabel({ nodeId: id, label: inputDataValue }));
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        console.log(nodes[i].data);
      }
    }
  };

  return (
    <>
      <div>
        <div>
          <input
            id="text"
            value={inputDataValue}
            name="text"
            onChange={onChange}
            className="nodrag"
          />
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          onClick={onclickHandle}
          id="a"
        />

        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
}

export default FlowBlockTemplate;
