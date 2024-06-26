import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";


const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const initialState = {
  nodes: [
    {
      id: '1',
      type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 0, y: 100 },
    },
    {
      id: '2a',
       type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 0, y: 200 },
    },
    {
      id: '2b',
      type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 0, y: 300 },
    },
    {
      id: '2c',
      type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 0, y: 400 },
    },
    {
      id: '2d',
      type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 0, y: 500 },
    },
    {
      id: '3',
      type: "mindmap",
      data: { value: "Input Node" },
      position: { x: 200, y: 100 },
    }],
  edges: [
    { id: 'e12', source: '1', target: '2', animated: true },
    { id: 'e13', source: '1', target: '3', animated: true },
    { id: 'e22a', source: '2', target: '2a', animated: true },
    { id: 'e22b', source: '2', target: '2b', animated: true },
    { id: 'e22c', source: '2', target: '2c', animated: true },
    { id: 'e2c2d', source: '2c', target: '2d', animated: true },
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
