import { configureStore } from "@reduxjs/toolkit";
import authsStateReducer from "@/features/authStateSlice"; 

const store = configureStore({
    reducer: {
        authState: authsStateReducer,
    },
});

export default store;
