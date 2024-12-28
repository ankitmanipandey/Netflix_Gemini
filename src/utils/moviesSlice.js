import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        trendingMovies: null,
        movieData: null,
        showTrailer: false,
        popularMovies: null,
        trailerVideo: null
    },
    reducers: {
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addMovieData: (state, action) => {
            state.movieData = action.payload;
        },
        removeMovieData: (state) => {
            state.movieData = null
        },
        toggleShowTrailer: (state) => {
            state.showTrailer = !state.showTrailer
        },
        addTrailerVideos: (state, action) => {
            state.trailerVideo = action.payload;
        },
        removeTrailerVideo: (state) => {
            state.trailerVideo = null
        }
    }
})
export const { addTrailerVideos, removeTrailerVideo, addTrendingMovies, addPopularMovies, addMovieData, toggleShowTrailer, removeMovieData } = moviesSlice.actions;
export default moviesSlice.reducer;