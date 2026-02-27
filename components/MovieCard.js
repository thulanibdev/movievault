'use client'

import Link from 'next/link'
import Image from 'next/image'
import { POSTER_SM } from '@/lib/tmdb'
import { useWatchlist } from '@/hooks/useWatchlist'

export default function MovieCard({ movie, index = 0 }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(movie.id)

  const year = movie.release_date?.slice(0, 4) || '—'
  const rating = movie.vote_average?.toFixed(1) || 'N/A'
  const posterUrl = movie.poster_path ? `${POSTER_SM}${movie.poster_path}` : null

  return (
    <div
      className="group relative animate-fadeUp"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both', opacity: 0 }}
    >
      <Link href={`/movie/${movie.id}`} className="block">
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-vault-card border border-vault-border">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-vault-muted text-4xl">
              🎬
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
            <p className="text-xs text-white/80 font-body line-clamp-3">{movie.overview}</p>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
            <span className="text-vault-gold text-xs">★</span>
            <span className="text-white text-xs font-body font-bold">{rating}</span>
          </div>
        </div>
      </Link>

      {/* Info row */}
      <div className="mt-2 flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <Link href={`/movie/${movie.id}`}>
            <h3 className="font-display text-sm font-semibold text-white leading-tight line-clamp-2 hover:text-vault-gold transition-colors">
              {movie.title}
            </h3>
          </Link>
          <p className="text-vault-muted text-xs mt-0.5 font-body">{year}</p>
        </div>

        {/* Watchlist toggle */}
        <button
          onClick={() => toggleWatchlist(movie)}
          title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          className={`flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-200 border ${
            inWatchlist
              ? 'bg-vault-gold border-vault-gold text-black'
              : 'bg-transparent border-vault-border text-vault-muted hover:border-vault-gold hover:text-vault-gold'
          }`}
        >
          {inWatchlist ? '✓' : '+'}
        </button>
      </div>
    </div>
  )
}
