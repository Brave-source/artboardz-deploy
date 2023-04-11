import { createSlice } from "@reduxjs/toolkit";

export const collectorSlice = createSlice({
  name: "collector",
  initialState: {
    collectors: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCollectorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectorSuccess: (state, action) => {
      state.isFetching = false;
      state.collectors = action.payload;
    },
    getCollectorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCollectorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCollectorSuccess: (state, action) => {
      state.isFetching = false;
      state.collectors.splice(
        state.collectors.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCollectorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCollectorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCollectorSuccess: (state, action) => {
      state.isFetching = false;
      state.collectors[
        state.collectors.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
      state.collectors.sort((a, b) => a.createdAt - b.createdAt)
    },
    updateCollectorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addCollectorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCollectorSuccess: (state, action) => {
      state.isFetching = false;
      state.collectors.push(action.payload);
      state.collectors.sort((a, b) => a.createdAt - b.createdAt)
    },
    addCollectorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCollectorStart,
  getCollectorSuccess,
  getCollectorFailure,
  deleteCollectorStart,
  deleteCollectorSuccess,
  deleteCollectorFailure,
  updateCollectorStart,
  updateCollectorSuccess,
  updateCollectorFailure,
  addCollectorStart,
  addCollectorSuccess,
  addCollectorFailure,
} = collectorSlice.actions;

export default collectorSlice.reducer;
