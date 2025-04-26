import { tmdb } from './tmdb';

export const getTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/week');
  return response.data.results;
};

export const getMovieDetails = async (id: string) => {
  const response = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  })
  return response.data;
}

export const searchMovies = async (query: string) => {
  const response = await tmdb.get('/search/movie', {
    params: { query }
  });
  return response.data.results;
};