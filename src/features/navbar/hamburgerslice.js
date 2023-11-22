import { createSlice } from "@reduxjs/toolkit";

const initialState =false
const slice =createSlice({
    name:"hamburgertoggler",
    initialState,
    reducers:{
        ison:(state,action)=>{
            return !state
        }
    }
}
)
export const  {ison} =slice.actions
export default slice.reducer