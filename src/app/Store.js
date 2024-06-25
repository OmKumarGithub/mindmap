import { configureStore } from "@reduxjs/toolkit"
import togglereducer from "../features/navbar/Togglebutton"
import hamburgerslice from "../features/navbar/hamburgerslice"
import rfSlice from "../features/flow/NewBoxSlice"
import PresentNodeOrIdSlice from "../features/flow/PresentNodeOrIdSlice"

export const  store= configureStore({
reducer:{
toggle:togglereducer,
togglehamburger:hamburgerslice,
rf:rfSlice,
PresentNodeOrIdSlice:PresentNodeOrIdSlice,
}
})