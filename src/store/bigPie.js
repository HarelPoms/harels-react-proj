import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import counterReducer from "./counter";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    counterSlice: counterReducer
  },
});

export default store;
