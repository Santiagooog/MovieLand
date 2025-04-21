import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../api/Movies'
import { Link } from 'react-router-dom'


export const Home = () => {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    getTrendingMovies().then(setMovies)
  },[])

  return(
    <div className="grid grid-cols-2 gap-4 p-4">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <div className="border rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-2">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p>{movie.release_date?.split('-')[0]}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 