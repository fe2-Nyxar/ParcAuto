import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authState: false,
};

const authStateSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAuth(state, action) {
            state.authState = action.payload;
        },
    },
});

export const { updateAuth } = authStateSlice.actions;
export default authStateSlice.reducer;
