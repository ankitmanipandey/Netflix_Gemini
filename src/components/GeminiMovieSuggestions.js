import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieList from './MovieList';
import Spinner from './Spinner.js'
import { toggleSpinner } from '../utils/spinnerSlice.js'

export default function GeminiMovieSuggestions() {
  const gemini = useSelector(store => store.gemini)
  const dispatch = useDispatch()
  const showSpinner = useSelector(store => store.spinner.showSpinner)
  const { movieResults, movieNames } = gemini;

  return (
    <>
      {showSpinner ? <Spinner /> :
        <>
          {movieNames && (<div className='p-4 m-4 bg-black text-white bg-opacity-70 rounded-lg' >
            {movieNames?.map((movieName, index) => (
              <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
            ))}
          </div>)}
        </>
      }
    </>
  )
}
