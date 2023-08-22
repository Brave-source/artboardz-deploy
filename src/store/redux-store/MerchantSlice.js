import { createSlice } from "@reduxjs/toolkit";

export const merchantSlice = createSlice({
  name: "merchant",
  initialState: {
    merchants: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getMerchantStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMerchantSuccess: (state, action) => {
      state.isFetching = false;
      state.merchants = action.payload;
    },
    getMerchantFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteMerchantStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteMerchantSuccess: (state, action) => {
      state.isFetching = false;
      state.merchants.splice(
        state.merchants.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteMerchantFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMerchantStart,
  getMerchantSuccess,
  getMerchantFailure,
  deleteMerchantStart,
  deleteMerchantSuccess,
  deleteMerchantFailure,
} = merchantSlice.actions;

export default merchantSlice.reducer;
