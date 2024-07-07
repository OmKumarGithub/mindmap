import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";
import { Background } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const initialState = {
  nodes: [
    {
      id: "1",
      type: "mindmap",
      draggable: false,
      data: { label: "File Name ........" },
      position,
    },
    {
      id: "2",
      type: "mindmap",
      data: { label: "Demo text 2......" },
      position,
    },
    {
      id: "3",
      type: "mindmap",
      data: { label: "Demo text 3 ......." },
      position,
    },
  ],
  edges: [
    { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
    { id: "e13", source: "1", target: "3", type: edgeType, animated: true },
  ],
  isNodesEdgesStateChanged: false,
  fun: true,
};

const rfSlice = createSlice({
  name: "rf",
  initialState,
  reducers: {
    applyNodeChanges: (state, action) => {
      const { changes } = action.payload;
      state.nodes = JSON.parse(changes);
    },

    applyEdgeChanges: (state, action) => {
      const { changes } = action.payload;
      state.edges = JSON.parse(changes);
    },

    updateNodeLabel: (state, action) => {
      const { nodeId, label } = action.payload;
      for (let i = 0; i < state.nodes.length; i++) {
        if (state.nodes[i].id == nodeId) {
          state.nodes[i].data.value = label;
          break;
        }
      }
    },

    addChildNode: (state, action) => {
      const { parentid } = action.payload;
      let nid = "" + nanoid();
      let edgeid = "e" + parentid + "" + nid + "";
      return {
        ...state,
        nodes: [
          ...state.nodes,
          { id: nid, type: "mindmap", data: { label: "ooooooooo" }, position },
        ],
        edges: [
          ...state.edges,
          { id: edgeid, source: parentid, target: nid, animated: true },
        ],
        isNodesEdgesStateChanged: true,
      };

      // you cannnot use this approach bcoz reducer function should compulsory return something
      //u cannot change directly state object first u have to spread it and then add the change on it
      // state.nodes: [...state.nodes,{ id: nid, type: "mindmap",data: { label: "" },position,parentid: parentid,},],
      // state.edges: [...state.edges,{ id: edgeid, source: parentid, target: nid, type: edgeType, animated: true,},],
    },

    setfun: (state, action) => {
      // const { pfun } = action.payload;
      state.fun = !state.fun;
    },
  },
});

export const {
  applyNodeChanges,
  applyEdgeChanges,
  updateNodeLabel,
  addChildNode,
  setfun,
} = rfSlice.actions;

export default rfSlice.reducer;
