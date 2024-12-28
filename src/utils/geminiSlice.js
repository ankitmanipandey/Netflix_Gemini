import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: 'gemini',
    initialState: {
        showGeminiSearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGeminiSearchView: (state) => {
            state.showGeminiSearch = !state.showGeminiSearch;
        },
        addGeminiMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
        removegeminiMovieResult: (state) => {
            state.movieNames = null
            state.movieResults = null
        }
    }
})

export const { toggleGeminiSearchView, addGeminiMovieResult, removegeminiMovieResult } = geminiSlice.actions;
export default geminiSlice.reducer;