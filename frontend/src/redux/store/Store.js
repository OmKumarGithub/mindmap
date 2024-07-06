import { configureStore } from "@reduxjs/toolkit"
import togglereducer from "../actions/TogglebuttonSlice"
import hamburgerslice from "../actions/hamburgerslice"
import rfSlice from "../actions/NewBoxSlice"
// import PresentNodeOrIdSlice from "../../features/flow/PresentNodeOrIdSlice"

export const  store= configureStore({
reducer:{
toggle:togglereducer,
togglehamburger:hamburgerslice,
rf:rfSlice,
// PresentNodeOrIdSlice:PresentNodeOrIdSlice,
}
})