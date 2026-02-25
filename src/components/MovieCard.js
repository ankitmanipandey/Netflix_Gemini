import { IMG_CDN_URL } from '../utils/constants';

export default function MovieCard({ posterPath }) {
    if (!posterPath) return null;
    
    return (
        <div className='w-36 md:w-48 transition-all duration-300 hover:z-50 relative'>
            <div className='
                w-full h-full rounded-lg overflow-hidden
                transition-transform duration-300 ease-out
                hover:scale-110 hover:-translate-y-2
                hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] 
                hover:ring-2 hover:ring-white
            '>
                <img 
                    src={IMG_CDN_URL + posterPath} 
                    alt="Movie Card" 
                    className='object-cover w-full h-full' 
                />
            </div>
        </div>
    );
}