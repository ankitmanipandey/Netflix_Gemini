import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

export default function MovieCard({ posterPath }) {
    if (!posterPath) return null;
    return (
        <div className=' w-36 md:w-48 p-3'>
            <img src={IMG_CDN_URL + posterPath} alt="Movie Card" className='rounded-xl ' />
        </div>
    )
}
