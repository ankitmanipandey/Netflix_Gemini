import React from 'react'
import GeminiSearchBar from './GeminiSearchBar'
import GeminiMovieSuggestions from './GeminiMovieSuggestions.js'
import { logo } from '../utils/constants.js'

export default function GeminiSearch() {
    return (
        <div>
            <div className='fixed -z-10'>
                <img src={logo} className='h-screen object-cover md:h-auto'/>
            </div>
            <GeminiSearchBar />
            <GeminiMovieSuggestions />
        </div>
    )
}
