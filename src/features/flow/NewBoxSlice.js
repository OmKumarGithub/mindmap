import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";

const initialState = {
  nodes: [
    {
      id: "1",
      type: "mindmap",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
      parentNode: null,
    },

    {
      id: "2",
      type: "mindmap",
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
      parentNode: "1",
    },
    // {
    //   id: "3",
    //   type: "output",
    //   data: { label: "Output Node" },
    //   position: { x: 250, y: 250 },
    // },
  ],
  edges: [
    // { id: "e1-2", source: "1", target: "2" },
    // { id: "e2-3", source: "2", target: "3", animated: true },
  ],
};

const rfSlice = createSlice({
  name: "rf",
  initialState,
  reducers: {
    applyNodeChanges: (state, action) => {
      const { changes } = action.payload;
      state.nodes = state.nodes.map((node) => {
        const change = changes.find((change) => change.id === node.id);
        if (change) {
          return { ...node, ...change };
        } else {
          return node;
        }
      });
    },
    applyEdgeChanges: (state, action) => {
      const { changes } = action.payload;
      state.edges = state.edges.map((edge) => {
        const change = changes.find((change) => change.id === edge.id);
        if (change) {
          console.log("gvhjv");
          return { ...edge, ...change };
        } else {
          console.log("kkkk");

          return edge;
        }
      });
    },

    updateNodeLabel: (state, action) => {
      const { nodeId, label } = action.payload;
      state.nodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { label },
          };
        } else {
          return node;
        }
      });
      console.log(label);
    },

    addChildNode: (state, action) => {
      const { parentid, position } = action.payload;
      const nodeId = nanoid();
      const newNode = {
        id: nodeId,
        type: "mindmap",
        data: { label: "" },
        position,
        dragHandle: ".dragHandle",
        parentNode: `${parentid}`,
      };

      const newEdge = {
        id: `${nanoid()}`,
        source: `${parentid}`,
        target: `${nodeId}`,
      };
      console.log(newEdge);
      console.log(newNode);

      state.nodes.push(newNode);
      state.edges.push(newEdge);
    },
  },
});

export const {
  applyNodeChanges,
  applyEdgeChanges,
  updateNodeLabel,
  addChildNode,
} = rfSlice.actions;

export default rfSlice.reducer;
