import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleShowTrailer } from '../utils/moviesSlice';

export default function MovieTrailer({ trailerVideo }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoBackFromTrailer = () => {
        navigate(`/trailer/${trailerVideo?.id}`);
        dispatch(toggleShowTrailer());
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center">
            {/* Close Button Top Right */}
            <button 
                onClick={handleGoBackFromTrailer}
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-4xl transition-colors z-50"
            >
                &times;
            </button>

            <div className="w-full h-full max-w-7xl max-h-[80vh] flex flex-col">
                <div className="relative w-full h-full">
                    <iframe 
                        className="w-full h-full rounded-xl shadow-[0_0_50px_rgba(255,0,0,0.15)]"
                        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=t_AGnUi8iQKQxIMD&autoplay=1&rel=0`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen 
                    ></iframe>
                </div>
                
                <div className="mt-6 flex justify-center">
                    <button 
                        className='text-white border border-gray-600 hover:bg-white hover:text-black px-8 py-2 rounded-full font-sans text-sm transition-all uppercase tracking-widest' 
                        onClick={handleGoBackFromTrailer}
                    >
                        Return to details
                    </button>
                </div>
            </div>
        </div>
    );
}