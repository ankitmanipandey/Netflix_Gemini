import React from 'react'
import Header from './Header'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import GeminiSearch from './GeminiSearch'
import { useSelector } from 'react-redux'
import useTrendingMovies from '../hooks/useTrendingMovies'
import usePopularMovies from '../hooks/usePopularMovies'

export default function Browse() {
  useTrendingMovies();
  usePopularMovies();
  const showGeminiSearch = useSelector(store => store.gemini.showGeminiSearch)
  return (
    <div>
      <Header />
      {showGeminiSearch ? (
        <GeminiSearch />
      )
        : (
          <> <MainContainer />
            <SecondaryContainer />
          </>
        )}

    </div>
  )
}
