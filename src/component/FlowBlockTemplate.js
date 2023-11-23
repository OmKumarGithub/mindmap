// first commit
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChildNode,
  updateNodeLabel,
  applyEdgeChanges,
  applyNodeChanges,
} from "../features/flow/NewBoxSlice";
import { Handle, Position, useReactFlow } from "reactflow";

// import LogicNodes from "./LogicNodes";
// import { LogicNodes } from "./LogicNodes";

//ye id jo hum parameter mein de rhe hein wo reactflow khud detect kar rha hai
//......reactflow ke andar ek parameter pass kr rkha hai nodetypes naam ka aur wo ek object leta hai
//jismein flowblocktemplate ki value hai
export function FlowBlockTemplate({ id, data }) {
  const { fitView } = useReactFlow();
  const dispatch = useDispatch();
  const nodes = Object.seal(useSelector((state) => state.rf.nodes));
  const edges = Object.seal(useSelector((state) => state.rf.edges));

  const userinputbox = document.getElementById("userinputbox");
  var [count, setcount] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      userinputbox?.focus({ preventScroll: true });
      // userinputbox.blur();
    });
  });

  const onInput = (evt) => {
    dispatch(updateNodeLabel({ nodeId: id, label: evt.target.value }));
    if (evt.target.value.length > 30) {
      console.log(evt.target.value.length);
    }
  };

  const LogicNodes = (presentnodeid, count, parentx, parenty) => {
    // const dispatch = useDispatch();

    const newx = parentx - parentx / 2 + 250;
    const height = 32;
    const gap = 20;
    // const newy = position.y - 2.3;
    var newy = null;
    if (count === 1) {
      console.log("just 1");
      newy = parenty - 2.3;
      dispatch(
        addChildNode({
          parentid: presentnodeid,
          position: { x: newx, y: newy },
        })
      );
    } else if (count % 2 === 0) {
      //even
      const halfcount = count / 2;
      const vertical = (height + gap) * count;
      for (let i = 0; i < count; i++) {
        if (i <= halfcount) {
          //upper even starts
          newy = parenty + height / 2 - vertical / 2 + (height + gap) * i;
          dispatch(
            addChildNode({
              parentid: presentnodeid,
              position: { x: newx, y: newy },
            })
          );
        } //upper even ends here
        else if (i > halfcount) {
          //lower even part start here
          console.log("lower even");
          newy = parenty + height / 2 + (height + gap) * (i - count / 2);
          dispatch(
            addChildNode({
              parentid: presentnodeid,
              position: { x: newx, y: newy },
            })
          );
        } //lower even part ends here
      }
    } //even for loop ends
    else if (count % 2 !== 0) {
      //odd
      const halfCount = count / 2;
      const vertical = (height + gap) * count;

      for (let i = 0; i < count; i++) {
        if (i < Math.floor(halfCount)) {
          //upper odd starts
          console.log("upper odd");
          newy = parenty + height / 2 - vertical / 2 + (height + gap) * i;
          dispatch(
            addChildNode({
              parentid: presentnodeid,
              position: { x: newx, y: newy },
            })
          );
        } //upper odd ends
        else if (i === Math.ceil(halfCount)) {
          //middle odd starts
          console.log("middle odd");
          newy = parenty;
          dispatch(
            addChildNode({
              parentid: presentnodeid,
              position: { x: newx, y: newy },
            })
          );
        } //middle odd ends

        //lower odd part
        else if (i > Math.ceil(halfCount)) {
          console.log("lower odd");
          newy =
            parenty + height / 2 + (height + gap) * (i - Math.ceil(count / 2));
          dispatch(
            addChildNode({
              parentid: presentnodeid,
              position: { x: newx, y: newy },
            })
          );
        }
      }
    }
  };
  const onclickfun = () => {
    console.log("hello it works");
    console.log(id);
    setcount(count + 1);
    const presentnodeid = id;
    const node = nodes.find((node) => node.id === presentnodeid);
    const position = node.position;
    console.log(position);
    const parentx = position.x;
    const parenty = position.y;
    LogicNodes(presentnodeid, count, parentx, parenty);
  }; //onclickfun ends
  console.log(count);
  return (
    <>
      <div className=" border p-1 rounded-lg">
        <div>
          <input
            autocomplete="off "
            id="userinputbox"
            className="border h-min p-1 overflow-hidden w-56 text-center nodrag max-h-28 shadow-lg focus:outline-none"
            value={data.label}
            onChange={onInput}
            contentEditable
          />
        </div>
        {id !== 1 ? (
          <Handle type="target" position={Position.Left}></Handle>
        ) : (
          <></>
        )}
        <Handle
          type="source"
          position={Position.Right}
          onClick={onclickfun}
        ></Handle>
      </div>
    </>
  );
}

export default FlowBlockTemplate;
