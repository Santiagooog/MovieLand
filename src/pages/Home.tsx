import { useEffect, useState, useCallback } from 'react'
import { getTrendingMovies, searchMovies } from '../api/Movies'
import { Link } from 'react-router-dom'
import { Search } from '../components/Search'
import { Nav } from '../components/Nav'
import debounce from 'debounce'

export const Home = () => {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    getTrendingMovies().then(setMovies)
  }, [])

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === '') {
        const trending = await getTrendingMovies()
        setMovies(trending)
      } else {
        const results = await searchMovies(query)
        setMovies(results)
      }
    }, 500),
    []
  )

  const handleSearch = (query: string) => {
    debouncedSearch(query)
  }

  return (
    <>
      <Nav />
      <div className="px-4">
        <Search onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div>
    </>
  )
}
