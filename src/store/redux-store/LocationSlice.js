import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "location",
    initialState: {
        locations: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // Get all locations
        getLocationStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getLocationSuccess: (state, action) => {
            state.locations = action.payload;
            state.isFetching = false;
        },
        getLocationFailure: (state) => {
            state.isFetching = false,
            state.error = true;
        },
        // update location
        updateLocationStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateLocationSuccess: (state, action) => {
            state.locations[
                state.locations.findIndex((item) => item._id == action.payload.id)
            ] = action.payload.data;
            state.isFetching = false;
        },
        updateLocationFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        },
        // Add location
        addLocationStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addLocationSuccess: (state, action) => {
            state.locations.push(action.payload);
            state.isFetching = false;
        },
        addLocationFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        },
        deleteLocationStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteLocationSuccess: (state, action) => {
            state.locations.splice(
                state.locations.findIndex((item) => item._id === action.payload),
                1
            );
            state.isFetching = false;
        },
        deleteLocationFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

export const {
    getLocationStart,
    getLocationSuccess,
    getLocationFailure,
    updateLocationFailure,
    updateLocationStart,
    updateLocationSuccess,
    addLocationFailure,
    addLocationSuccess,
    addLocationStart,
    deleteLocationFailure,
    deleteLocationStart,
    deleteLocationSuccess,
} = locationSlice.actions;

export default locationSlice.reducer;