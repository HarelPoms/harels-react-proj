import { createSlice } from "@reduxjs/toolkit";
import ROUTES from "../routes/ROUTES";
const initialState = {
    currentPage: ROUTES.HOMEPAGE,
};

const searchTrackerSlice = createSlice({
    name: "searchTracker",
    initialState,
    reducers: {
        homeSearch(state) {
            state.currentPage = ROUTES.HOME;
        },
        favoritesSearch(state) {
            state.currentPage = ROUTES.MYFAVS;
        },
        myCardsSearch(state){
            state.currentPage = ROUTES.MYCARDS;
        }
    },
});

export const searchTrackerActions = searchTrackerSlice.actions;

export default searchTrackerSlice.reducer;
