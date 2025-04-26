import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../api/Movies'

export const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<any>(null)
  const [comments, setComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    if (id) {
      getMovieDetails(id).then(setMovie)
      const savedComments = localStorage.getItem(`comments-${id}`)
      if (savedComments) {
        setComments(JSON.parse(savedComments))
      }
    }
  }, [id])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const updatedComments = [...comments, newComment]
    setComments(updatedComments)
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments))
    setNewComment('')
  }

  if (!movie) return <div>Cargando...</div>

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

      {/* COMENTARIOS */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Comentarios:</h2>
        <ul className="mb-4">
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-2">{comment}</li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            className="border rounded-xl p-2 flex-1"
            placeholder="Escribe un comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            onClick={handleAddComment}
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  )
}