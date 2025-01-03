import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

export default function MainContainer() {
    const movies = useSelector(store => store.movies?.trendingMovies);
    if (!movies) return;
    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie
    return (
        <div className='pt-[50%] bg-black md:pt-0'>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}
