import React from 'react'
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'

export default function MovieList({ title, movies }) {
    return (

        <div className='px-6'>
            <h1 className='text-xl md:text-3xl py-5 text-white font-bold'>{title}</h1>
            <div className='flex overflow-x-auto no-scrollbar'>
                <div className='flex'>
                    {movies && movies?.map(movie => <Link key={movie?.id} to={`/trailer/${movie?.id}`}>< MovieCard posterPath={movie.poster_path} /></Link>)}
                </div>
            </div>
        </div>
    )
}
