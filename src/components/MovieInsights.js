import React, { useEffect } from 'react'
import { logo } from '../utils/constants';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';
import useMovieDetail from '../hooks/useMovieDetail'
import MovieTrailer from './MovieTrailer';
import MovieDetails from './MovieDetails';
import Spinner from './Spinner';

export default function MovieInsights() {
    const { id } = useParams();
    const trailerVideo = useSelector(store => store.movies?.trailerVideo)
    const showTrailer = useSelector(store => store.movies?.showTrailer)
    const movieData = useSelector(store => store.movies.movieData)
    useMovieDetail({ trailerVideo, id });
    useMovieTrailer(id);
    return (
        <div className='absolute md:static'>
            <div className='fixed'>
                <img src={logo} className='h-screen object-cover md:h-auto' />
            </div>
            <>
                {!movieData ? <div className='relative mt-[50%] h-96 w-screen md:mt-14 md:p-2 md:fixed md:-mx-2'><Spinner /></div> : <>{!showTrailer && <MovieDetails movieData={movieData} />}</>}
                {showTrailer && <MovieTrailer trailerVideo={trailerVideo} />}
            </>
        </div>
    )


}
