'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMovieDetails, POSTER_LG, BACKDROP, POSTER_SM } from '@/lib/tmdb'
import { useWatchlist } from '@/hooks/useWatchlist'
import MovieCard from '@/components/MovieCard'

export default function MoviePage({ params }) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  useEffect(() => {
    getMovieDetails(params.id)
      .then(setMovie)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="w-full h-64 skeleton rounded-xl mb-8" />
        <div className="h-8 skeleton rounded w-1/2 mb-4" />
        <div className="h-4 skeleton rounded w-full mb-2" />
        <div className="h-4 skeleton rounded w-5/6" />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="text-center py-32 text-vault-muted font-body">
        Movie not found. <Link href="/" className="text-vault-gold hover:underline">Go home</Link>
      </div>
    )
  }

  const inWatchlist = isInWatchlist(movie.id)
  const year = movie.release_date?.slice(0, 4) || '—'
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null
  const director = movie.credits?.crew?.find((c) => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 8) || []
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
  const similar = movie.similar?.results?.slice(0, 5) || []

  return (
    <div>
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <Image
            src={`${BACKDROP}${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-vault-black" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-44 md:w-56 aspect-[2/3] rounded-xl overflow-hidden border border-vault-border shadow-2xl">
              {movie.poster_path ? (
                <Image
                  src={`${POSTER_LG}${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-vault-card flex items-center justify-center text-4xl">🎬</div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            {/* Back link */}
            <Link href="/" className="text-vault-muted hover:text-vault-gold text-sm font-body transition-colors inline-block mb-4">
              ← Back to search
            </Link>

            <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-vault-gold font-body italic text-sm mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 mb-5 text-sm font-body text-vault-muted">
              <span>{year}</span>
              {runtime && <><span>·</span><span>{runtime}</span></>}
              {director && <><span>·</span><span>Dir. {director.name}</span></>}
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="text-vault-gold">★</span>
                <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}</span>
                <span className="text-vault-muted">({movie.vote_count?.toLocaleString()} votes)</span>
              </span>
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="border border-vault-border text-vault-muted text-xs font-body px-3 py-1 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-white/80 font-body text-sm leading-relaxed mb-6 max-w-2xl">
              {movie.overview}
            </p>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => toggleWatchlist(movie)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-bold text-sm transition-all duration-200 ${
                  inWatchlist
                    ? 'bg-vault-gold text-black hover:bg-vault-gold-light'
                    : 'border border-vault-border text-white hover:border-vault-gold hover:text-vault-gold'
                }`}
              >
                {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>

              {trailer && (
                <a
                  href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-vault-border text-vault-muted hover:border-vault-red hover:text-vault-red font-body text-sm transition-colors"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {cast.map((person) => (
                <div key={person.id} className="flex-shrink-0 text-center w-20">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-vault-card border border-vault-border mb-2">
                    {person.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                        alt={person.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                    )}
                  </div>
                  <p className="text-white text-xs font-body leading-tight">{person.name}</p>
                  <p className="text-vault-muted text-xs font-body leading-tight mt-0.5">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similar.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
