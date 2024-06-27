import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const initialState = {
  nodes: [
    {
        "id": "3",
        "type": "mindmap",
        "data": {
            "label": "ooooooooo",
        },
        "position": {
            "x": 577.5,
            "y": 16.5
        },
        "positionAbsolute": {
            "x": 577.5,
            "y": 16.5
        },
        "x": 577.5,
        "y": 16.5,
        "rank": 4,
        "width": 156,
        "height": 33
    },
    {
        "id": "2",
        "type": "mindmap",
        "data": {
            "label": "ooooooooo"
        },
        "position": {
            "x": 336.5,
            "y": 16.5
        },
        "positionAbsolute": {
            "x": 336.5,
            "y": 16.5
        },
        "x": 336.5,
        "y": 16.5,
        "rank": 2,
        "width": 191,
        "height": 33
    },
    {
        "id": "1",
        "type": "mindmap",
        "data": {
            "value": ""
        },
        "position": {
            "x": 95.5,
            "y": 16.5
        },
        "parentNode": null,
        "positionAbsolute": {
            "x": 95.5,
            "y": 16.5
        },
        "x": 95.5,
        "y": 16.5,
        "rank": 0,
        "width": 191,
        "height": 33
    }
  ],
  edges:[
    {
        "id": "e23",
        "source": "2",
        "target": "3",
        "animated": true
    },
    {
        "id": "e12",
        "source": "1",
        "target": "2",
        "animated": true
    }
  ],
  isNodesEdgesStateChanged: false,
  fun: null,
};

const rfSlice = createSlice({
  name: "rf",
  initialState,
  reducers: {
    applyNodeChanges: (state, action) => {
      const { changes } = action.payload;
      state.nodes = [...changes];
    },

    applyEdgeChanges: (state, action) => {
      const { changes } = action.payload;
      state.nodes = [...changes];
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

    addNodeTargetPosition: (state, action) => {
      const { nodeId, bool } = action.payload;
      for (let i = 0; i < state.nodes.length; i++) {
        if (state.nodes[i].id == nodeId) {
          Object.defineProperty(state.nodes[i], "targetPosition", {
            value: bool,
          });
        }
      }
    },

    addNodeSourcePosition: (state, action) => {
      const { nodeId, bool } = action.payload;
      for (let i = 0; i < state.nodes.length; i++) {
        if (state.nodes[i].id == nodeId) {
          Object.defineProperty(state.nodes[i], "sourcePosition", {
            value: bool,
          });
        }
      }
    },

    setNodePosition: (state, action) => {
      const { nodeId, x, y } = action.payload;
      for (let i = 0; i < state.nodes.length; i++) {
        if (state.nodes[i].id == nodeId) {
          state.nodes[i].position = { x: x, y: y };
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

    ChangeisNodesEdgesStateChanged: (state, action) => {
      const { bool } = action.payload;
      state.isNodesEdgesStateChanged = Boolean(bool);
    },

    setfun: (state, action) => {
      const { pfun } = action.payload;
      state.fun = pfun;
    },
  },
});

export const {
  applyNodeChanges,
  applyEdgeChanges,
  updateNodeLabel,
  addChildNode,
  setfun,
  ChangeisNodesEdgesStateChanged,
  setNodePosition,
  addNodeSourcePosition,
  addNodeTargetPosition,
} = rfSlice.actions;

export default rfSlice.reducer;
