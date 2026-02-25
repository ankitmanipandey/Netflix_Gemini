import { IMG_CDN_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeMovieData, toggleShowTrailer } from '../utils/moviesSlice';

export default function MovieDetails({ movieData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoBackFromMovieDetail = () => {
        navigate("/browse");
        dispatch(removeMovieData());
    };

    const handleTrailer = () => {
        dispatch(toggleShowTrailer());
    };

    if (!movieData) return null;

    return (
        // Full screen fixed overlay with glassmorphism
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm overflow-y-auto pt-20 md:pt-0">
            
            {/* Background Image (Blurred & Dimmed) */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-30">
                <img 
                    src={IMG_CDN_URL + movieData?.backdrop_path} 
                    className="w-full h-full object-cover blur-sm" 
                    alt="background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-4 bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Close Button Mobile */}
                <button onClick={handleGoBackFromMovieDetail} className="absolute top-4 right-4 md:hidden text-white bg-black/50 p-2 rounded-full z-20">
                    ✕
                </button>

                {/* Left Side: Poster */}
                <div className="md:w-1/3 relative group">
                    <img
                        src={IMG_CDN_URL + movieData?.poster_path}
                        alt="Movie Poster"
                        className="w-full h-96 md:h-full object-cover"
                    />
                    {/* Play Button Overlay on Poster */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer" onClick={handleTrailer}>
                        <div className="bg-red-600 p-4 rounded-full shadow-lg scale-110">
                           <span className="text-white font-bold">▶</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Info */}
                <div className="md:w-2/3 p-6 md:p-10 text-white flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-2 font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                            {movieData?.title}
                        </h1>
                        <p className="text-gray-400 italic text-lg mb-6">{movieData?.tagline}</p>

                        {/* Metadata Tags */}
                        <div className="flex flex-wrap gap-4 mb-6 text-sm font-semibold text-gray-300">
                            <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                                📅 {movieData?.release_date?.split('-')[0]}
                            </span>
                            <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                                ⏱ {movieData?.runtime}m
                            </span>
                            <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full border border-gray-600 uppercase">
                                🌐 {movieData?.original_language}
                            </span>
                            {movieData?.genres?.map(g => (
                                <span key={g.id} className="bg-red-900/40 text-red-200 px-3 py-1 rounded-full border border-red-900">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2 border-l-4 border-red-600 pl-3">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                {movieData?.overview}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button 
                            onClick={handleTrailer}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-bold transition-all shadow-lg hover:shadow-red-900/50 flex items-center justify-center gap-2"
                        >
                            <span>▶</span> Watch Trailer
                        </button>
                        <button 
                            onClick={handleGoBackFromMovieDetail}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                        >
                             Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}