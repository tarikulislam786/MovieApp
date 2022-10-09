import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userReducers";
import movieReducers from "./reducers/movieReducers";

export default configureStore({
    reducer: {
        user: userReducers,
        movie: movieReducers
    }
})