import { createSlice } from "@reduxjs/toolkit";

export const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelinedata: null,
    resault:'',
    video: '',
  },
  reducers: {
    timeline: (state, action) => {
      state.timelinedata = action.payload
        // console.log("this is reudcer timelis",action.payload);
    },
    resaults: (state,action) => {
      state.resault= action.payload;
      console.log("resaults reducer payload", state.resault);
    },
    drawvideo: (state, action)=>{
      state.video = action.payload;
    },
    
  },
});

export const { timeline, resaults, drawvideo } = timelineSlice.actions;

export default timelineSlice.reducer;
