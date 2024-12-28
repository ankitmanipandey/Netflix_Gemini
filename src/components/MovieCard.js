import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

export default function MovieCard({ posterPath }) {
    return (
        <div className='w-48 p-3'>
            <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
        </div>
    )
}
