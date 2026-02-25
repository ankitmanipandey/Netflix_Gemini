import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import { API_OPTIONS } from '../utils/constants'
import { addGeminiMovieResult } from '../utils/geminiSlice'
import { setSpinner } from '../utils/spinnerSlice'

export default function GeminiSearchBar() {
    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef(null)
    const dispatch = useDispatch();
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        const json = await data.json();
        return json.results;
    }
    const handleSearchClick = async () => {
        if (searchText.current.value) {
            dispatch(setSpinner(true))
            const { GoogleGenerativeAI } = require("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const geminiQuery = `Act as a movie recommendation system. Suggest movies for the query: "${searchText.current.value}". 
                                If the query is a specific movie name, return ONLY that movie name. 
                                Otherwise, suggest 5 similar movies, comma-separated. 
                                Example Output: Gadar, Sholay, Don, Dhoom, Krrish
                                Do not output any other text.`;
            const prompt = geminiQuery;
            const result = await model.generateContent(prompt);
            const movies = (result.response.text()).split(",");
            const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
            const tmdbResult = await Promise.all(promiseArray);
            dispatch(addGeminiMovieResult({ movieNames: movies, movieResults: tmdbResult }))
            dispatch(setSpinner(false))
        }
    }
    return (
        <div className='pt-[10%] flex justify-center '>
            <form className='w-full bg-black grid grid-cols-12 rounded-lg mt-[50%]  md:mt-0 md:w-1/2 ' onSubmit={(e) => e.preventDefault()}>
                <input type="text" ref={searchText} className='p-4 m-4 col-span-9 rounded-lg bg-gray-800 text-white' placeholder={lang[langKey].geminiSearchPlaceholder} />
                <button type="submit" className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg text-sm md:text-lg' onClick={handleSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
}
