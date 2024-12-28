import React, { useEffect } from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux';
export default function VideoBackground({ movieId }) {
    const trailerVideo = useSelector(store => store.movies.trailerVideo);
    useMovieTrailer(movieId);
    return (
        <div className='w-screen'>
            <iframe className='w-screen aspect-video' src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=pcgGMlqujXqDd4hE&autoplay=1&mute=1&controls=0&rel=0&showinfo=0`}
                title="YouTube video player"
                referrerPolicy="strict-origin-when-cross-origin">
            </iframe>
        </div>
    )
}
