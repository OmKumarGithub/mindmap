import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  presentnode: null,
  presentnodeid: null,
};

const PresentNodeOrIdSlice = createSlice({
  name: "present",
  initialState,
  reducers: {
    actionpresentnode: (state, action) => {
      const { payloadpresentnode } = action.payload;
      state.presentnode = payloadpresentnode;
      console.log("function started");
    },
    actionpresentnodeid: (state, action) => {
      const { payloadpresentnodeid } = action.payload;
      state.presentnodeid = payloadpresentnodeid;
    },
  },
});

export const { actionpresentnode, actionpresentnodeid } =
  PresentNodeOrIdSlice.actions;

export default PresentNodeOrIdSlice.reducer;
