import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import moviesReducer from './moviesSlice'
import geminiReducer from './geminiSlice'
import configReducer from './configSilce'
import spinnerReducer from './spinnerSlice'
const appStore = configureStore(
    {
        reducer: {
            user: userReducer,
            movies: moviesReducer,
            gemini: geminiReducer,
            config: configReducer,
            spinner: spinnerReducer,
        }
    }
);
export default appStore;