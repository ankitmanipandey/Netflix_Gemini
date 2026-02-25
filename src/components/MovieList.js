import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

export default function MovieList({ title, movies }) {
    return (
        <div className='px-6 bg-transparent relative z-20'>
            <h1 className='text-xl md:text-3xl py-2 text-white font-bold drop-shadow-lg'>{title}</h1>
            <div className='flex overflow-x-scroll no-scrollbar scroll-smooth pt-10 pb-10 -mt-4 -mb-4 px-2'>
                <div className='flex gap-4'>
                    {movies && movies.map(movie => (
                        <Link key={movie?.id} to={`/trailer/${movie?.id}`}>
                            <MovieCard posterPath={movie.poster_path} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}