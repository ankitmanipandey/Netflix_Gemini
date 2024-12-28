import React from 'react'
import MovieCard from './MovieCard'

export default function MovieList({ title, movies }) {
    return (

        <div className='px-6'>
            <h1 className='text-3xl py-5 text-white font-bold'>{title}</h1>
            <div className='flex overflow-x-auto no-scrollbar'>
                <div className='flex'>
                    {movies && movies.map(movie => <MovieCard posterPath={movie.poster_path} />)}

                </div>
            </div>
        </div>
    )
}
