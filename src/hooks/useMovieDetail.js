import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"
import { addMovieData } from "../utils/moviesSlice"
import { useDispatch } from "react-redux"

const MovieDetail = ({ trailerVideo, id }) => {
    const dispatch = useDispatch()
    const getMovieDetail = async () => {
        if (!trailerVideo?.id) return
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS)
        const json = await data?.json()
        dispatch(addMovieData(json))
    }
    useEffect(() => {
        getMovieDetail()
    }, [trailerVideo?.id])
}
export default MovieDetail