import React from 'react'
import MovieTrailer from './MovieTrailer'

export default function VideoTitle({ title, overview }) {
    return (
        <div className='w-screen aspect-video pt-[20%] px-10 md:px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-2xl md:text-5xl font-bold mt-20 md:mt-0'>{title}</h1>
            <p className='py-6 text-base w-1/4 hidden md:block'>{overview}</p>
            <div>
                <button className='bg-white text-xl text-black py-1 px-3 md:py-3 md:px-8 rounded-lg hover:bg-opacity-80' ><i className="fa-solid fa-play mx-1" />Play</button>
                <button className='mx-2 bg-white text-xl text-black  py-1 px-3 md:py-3 md:px-8 rounded-lg hover:bg-opacity-80'><i className="fas fa-info-circle mx-1"></i>More Info</button>
            </div>
        </div >
    )
}
