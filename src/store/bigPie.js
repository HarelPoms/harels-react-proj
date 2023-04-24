import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import counterReducer from "./counter";
import searchPageTrackerReducer from "./searchPageTracker";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    counterSlice: counterReducer,
    searchSlice: searchPageTrackerReducer,
  },
});

export default store;
