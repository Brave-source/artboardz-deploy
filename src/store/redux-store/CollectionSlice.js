import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
    vendor: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCollectionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCollectionSuccess: (state, action) => {
      state.isFetching = false;
      state.collections = action.payload;
    },
    getCollectionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCollectionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCollectionSuccess: (state, action) => {
      state.isFetching = false;
      state.collections.splice(
        state.collections.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCollectionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCollectionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCollectionSuccess: (state, action) => {
      state.isFetching = false;
      state.collections[
        state.collections.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.updateInput;
      state.collections.sort((a, b) => a.createdAt - b.createdAt)
    },
    updateCollectionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addCollectionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCollectionSuccess: (state, action) => {
      state.isFetching = false;
      state.collections.push(action.payload);
      state.collections.sort((a, b) => a.createdAt - b.createdAt)
    },
    addCollectionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addVendor: (state, action) => {
      state.vendor = action.payload;
    },
  },
});

export const {
  getCollectionStart,
  getCollectionSuccess,
  getCollectionFailure,
  deleteCollectionStart,
  deleteCollectionSuccess,
  deleteCollectionFailure,
  updateCollectionStart,
  updateCollectionSuccess,
  updateCollectionFailure,
  addCollectionStart,
  addCollectionSuccess,
  addCollectionFailure,
  addVendor,
} = collectionSlice.actions;

export default collectionSlice.reducer;
