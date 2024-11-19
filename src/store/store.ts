import { configureStore } from "@reduxjs/toolkit";
import main from "./slices/main";

export const store = configureStore({
    reducer: {
        main: main,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch