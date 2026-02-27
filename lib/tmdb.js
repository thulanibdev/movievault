// All TMDB API calls live here so the key is managed in one place.
// The key is read from the environment variable NEXT_PUBLIC_TMDB_API_KEY.

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export const IMG_BASE = 'https://image.tmdb.org/t/p'
export const POSTER_SM = `${IMG_BASE}/w342`
export const POSTER_LG = `${IMG_BASE}/w780`
export const BACKDROP = `${IMG_BASE}/w1280`

async function fetcher(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

// Search movies by query string
export async function searchMovies(query, page = 1) {
  return fetcher('/search/movie', { query, page, include_adult: false })
}

// Get full movie details by id
export async function getMovieDetails(id) {
  return fetcher(`/movie/${id}`, {
    append_to_response: 'credits,videos,similar',
  })
}

// Trending movies of the week
export async function getTrending() {
  return fetcher('/trending/movie/week')
}

// Top rated movies
export async function getTopRated(page = 1) {
  return fetcher('/movie/top_rated', { page })
}
