import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../api/Movies'

export const MovieDetails = () => {
  const { id } = useParams()
  const [movie,setMovie] = useState<any>(null)

  useEffect(()=>{
    if(id){
      getMovieDetails(id).then(setMovie)
    }
  },[id])
  if(!movie){
    return(
      <div>Cargando...</div>
    )
  }
  return (
    <div className="p-4">
      <img
        src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-96 object-cover rounded-xl"
      />
      <h1 className="text-3xl font-bold mt-4">
        {movie.title} ({movie.release_date.split("-")[0]})
      </h1>
      <p className="mt-2">{movie.overview}</p>

      <h3 className="mt-4 font-semibold">Actores principales:</h3>
      <ul className="list-disc list-inside">
        {movie.credits?.cast?.slice(0, 5).map((actor: any) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  )
}