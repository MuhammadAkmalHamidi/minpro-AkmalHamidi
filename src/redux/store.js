import { configureStore } from "@reduxjs/toolkit";
import acountSlice from "./acountSlice";

export const store = configureStore({
    reducer : {
        user: acountSlice
    }
})