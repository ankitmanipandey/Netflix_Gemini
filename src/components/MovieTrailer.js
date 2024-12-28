import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleShowTrailer } from '../utils/moviesSlice'
export default function MovieTrailer({ trailerVideo }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoBackFromTrailer = () => {
        navigate(`/trailer/${trailerVideo?.id}`)
        dispatch(toggleShowTrailer())
    }
    return (
        <div>
            <div className='z-10 fixed md:mx-[20%] mt-[40%] md:mt-[4%] my-9 w-screen'>
                <iframe className='w-screen aspect-video h-96 md:w-[60%] md:aspect-video ' src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=t_AGnUi8iQKQxIMD&autoplay=1&mute=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen ></iframe>
                <button className='text-white bg-red-800 w-40 mt-4 p-4 md:p-2  rounded-xl font-serif mx-[30%] md:mx-[23%] text-xl' onClick={handleGoBackFromTrailer}>
                    Go Back
                </button>
            </div>
        </div>
    )
}
