import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import getTrimmedOverview from '../utils/trimmedoutput'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeMovieData, toggleShowTrailer } from '../utils/moviesSlice'
export default function MovieDetails({ movieData }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoBackFromMovieDetail = () => {
        navigate("/browse")
        dispatch(removeMovieData())
    }
    const handleTrailer = () => {
        dispatch(toggleShowTrailer())
    }
    return (
        <div className='p-4'>
            <div className="bg-red-800 text-white font-bold font-sans text-2xl  px-4 py-4 mt-20 md:py-2 rounded-xl shadow-md inline-block relative mx-[20%] md:mt-20 w-7/12 text-center">
                {movieData?.title}
            </div>
            <div className="bg-black bg-opacity-80 w-full mt-24 mx-0 text-white md:w-7/12 h-960 px-4 py-2 rounded-xl shadow-md relative md:mx-[20%] md:mt-2 text-center flex">
                <div className="relative rounded-xl shadow-md overflow-hidden">
                    <img
                        src={IMG_CDN_URL + movieData?.backdrop_path}
                        alt="Movie Poster"
                        className="w-full md:w-auto md:h-44 md:object-fill rounded-xl"
                    />
                    <div className='font-mono text-sm md:text-lg text-left  m-2 flex flex-col'>
                        <div>
                            Release Date : {movieData?.release_date}
                        </div>
                        <div>
                            Original Language : {movieData?.original_language}
                        </div>
                        <div>
                            Run Time : {movieData?.runtime} min
                        </div>
                        <div>
                            Genre: {movieData?.genres[0]?.name}
                        </div>
                    </div>
                </div>

                <div className='font-thin italic mx-7 text-lg font-serif w-6/12 text-left flex flex-col'>
                    <div className='hidden md:block'>
                        Overview : {getTrimmedOverview(movieData?.overview)}
                    </div>
                    <div className='flex flex-col gap-5 mt-10 md:gap-1'>
                        <button className='text-white bg-red-800 mt-3 p-3 md:p-2 rounded-xl font-serif text-sm md:text-xl' onClick={handleTrailer}>
                            Watch Trailer
                        </button>
                        <button className='text-white bg-red-800 mt-3 p-3 md:p-2 rounded-xl font-serif text-sm md:text-xl' onClick={handleGoBackFromMovieDetail}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
