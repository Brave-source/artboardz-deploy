import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: {},
    isFetching: false,
    isAuthenticated: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getAdminStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAdminSuccess: (state, action) => {
      state.isFetching = false;
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    getAdminFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    }
})

export const {
    getAdminStart,
    getAdminSuccess,
    getAdminFailure,
  } = adminSlice.actions;
  
  export default adminSlice.reducer;