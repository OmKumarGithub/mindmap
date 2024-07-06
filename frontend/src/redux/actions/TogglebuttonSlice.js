import { createSlice } from "@reduxjs/toolkit";

const initialState=false
const toggleslice=createSlice({
    name:"toggle",
    initialState,
    reducers:{
        ischecked:(state,action)=>{
          return  !state
        }
    }
})

export const  {ischecked} =toggleslice.actions
export default toggleslice.reducer