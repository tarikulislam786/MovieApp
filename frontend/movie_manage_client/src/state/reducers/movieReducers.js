import {createSlice} from "@reduxjs/toolkit";
export const listingMovie = createSlice({
    name: "movie",
    initialState: {
        movie: null
    },
    reducers: {
        movieList: (state, action) => {
            state.movie = action.payload;
        }
    }
});

export const {movieList} = listingMovie.actions;
export const selectMovie = (state) =>  state.movie;
export default listingMovie.reducer;