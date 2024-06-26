import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";


const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const initialState = {
  nodes: [
    {
      id: "1",
      type: "mindmap",
      data: { value: "Input Node" },
      position,
      parentId :0,
    },
    {
      id: "2",
      type: "mindmap",
      data: { value: "Input Node" },
      position,
      parentId :0,
    },
    {
      id: "2a",
      type: "mindmap",
      data: { value: "Input Node" },
      position,
      parentId :0,
    },
    {
      id: "2b",
      type: "mindmap",
      data: { value: "Input Node" },
      position,
      parentId :0,
    },
    {
      id: "2c",
      type: "mindmap",
      data: { value: "Input Node" },
      position,
      parentId :0,
    },

 
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" ,type: edgeType, animated: true},
    { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
  ],
};

const rfSlice = createSlice({
  name: "rf",
  initialState,
  reducers: {
    applyNodeChanges: (state, action) => {
      const { changes } = action.payload;
      state.nodes = [...changes]
    },


    applyEdgeChanges: (state, action) => {
      const { changes } = action.payload;
      state.nodes = [...changes]
    },

    updateNodeLabel: (state, action) => {
      const { nodeId, label } = action.payload;
     for(let i =0;i<state.nodes.length;i++){
      if(state.nodes[i].id==nodeId){
        state.nodes[i].data.value=label
        break;
      }
     }
    },

    addNodeTargetPosition:(state,action)=>{
      const { nodeId,bool} = action.payload;
      for(let i =0;i<state.nodes.length;i++){
        if(state.nodes[i].id==nodeId){
        Object.defineProperty(state.nodes[i], "targetPosition", {value:bool})
        }
      }
    },

    addNodeSourcePosition:(state,action)=>{
      const { nodeId,bool} = action.payload;
      for(let i =0;i<state.nodes.length;i++){
        if(state.nodes[i].id==nodeId){
        Object.defineProperty(state.nodes[i], "sourcePosition", {value:bool})
        }
      }
    },
 
    setNodePosition:(state,action)=>{
      const { nodeId,x,y} = action.payload;
      for(let i =0;i<state.nodes.length;i++){
        if(state.nodes[i].id==nodeId){
          state.nodes[i].position={x:x,y:y}
          break
        }
      }
    },


addChildNode:(state,action)=>{
  const{parentid}=action.payload;
  // for(let i;i<state.nodes.length;i++){
  //   if(state.nodes[i].id==parentid){
  //     state.nodes.push({id:nanoid,type:"mindmap",data:{label:""},position:{ x: 350, y: 25 },parentid:parentid})
  //     let edgeid = "e" + parentid +"-"+ nanoid+"";
  //     state.edges.push({ id: edgeid, source: parentid, target: nanoid })

      
  //     break;
  //   }

let nid=nanoid()
let edgeid = "e" + parentid +"-"+ nid+"";
  return {
    ...state,
    nodes: [...state.nodes,{id:nid,type:"mindmap",data:{label:""},position,parentid:parentid} ],
    edges: [...state.edges, { id: edgeid, source: parentid, target: nid ,type: edgeType, animated: true}],
  };


  
},





    

    // addChildNode: (state, action) => {
    //   const { parentid, position } = action.payload;
    //   const nodeId = nanoid();
    //   const newNode = {
    //     id: nodeId,
    //     type: "mindmap",
    //     data: { label: "" },
    //     position,
    //     dragHandle: ".dragHandle",
    //     parentNode: `${parentid}`,
    //   };

    //   const newEdge = {
    //     id: `${nanoid()}`,
    //     source: `${parentid}`,
    //     target: `${nodeId}`,
    //   };
    //   console.log(newEdge);
    //   console.log(newNode);

    //   state.nodes.push(newNode);
    //   state.edges.push(newEdge);
    // },
  },
});

export const {
  applyNodeChanges,
  applyEdgeChanges,
  updateNodeLabel,
  addChildNode,
  setNodePosition,
  addNodeSourcePosition,
  addNodeTargetPosition
} = rfSlice.actions;

export default rfSlice.reducer;
