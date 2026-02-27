'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useWatchlist } from '@/hooks/useWatchlist'
import { POSTER_SM } from '@/lib/tmdb'

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  if (watchlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="text-7xl mb-6">🎬</div>
        <h1 className="font-display text-4xl font-black text-white mb-4">Your Watchlist is Empty</h1>
        <p className="text-vault-muted font-body mb-8">
          Start adding movies you want to watch using the <span className="text-vault-gold">+</span> button on any movie.
        </p>
        <Link
          href="/"
          className="inline-block bg-vault-gold hover:bg-vault-gold-light text-black font-body font-bold px-6 py-3 rounded-full transition-colors"
        >
          Discover Movies
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
            Your <span className="text-vault-gold">Watchlist</span>
          </h1>
          <p className="text-vault-muted font-body mt-1">{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} saved</p>
        </div>
        <Link href="/" className="text-vault-muted hover:text-vault-gold text-sm font-body transition-colors">
          + Add more
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {watchlist.map((movie, index) => {
          const year = movie.release_date?.slice(0, 4) || '—'
          const rating = movie.vote_average?.toFixed(1) || 'N/A'
          const posterUrl = movie.poster_path ? `${POSTER_SM}${movie.poster_path}` : null

          return (
            <div
              key={movie.id}
              className="flex items-center gap-4 bg-vault-card border border-vault-border rounded-xl p-3 hover:border-vault-gold/40 transition-colors animate-fadeUp"
              style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both', opacity: 0 }}
            >
              {/* Number */}
              <span className="text-vault-muted font-body text-sm w-6 text-center flex-shrink-0">
                {index + 1}
              </span>

              {/* Poster */}
              <Link href={`/movie/${movie.id}`} className="flex-shrink-0">
                <div className="relative w-10 h-14 rounded overflow-hidden bg-vault-border">
                  {posterUrl ? (
                    <Image src={posterUrl} alt={movie.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm">🎬</div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/movie/${movie.id}`}>
                  <h3 className="font-display font-semibold text-white hover:text-vault-gold transition-colors truncate">
                    {movie.title}
                  </h3>
                </Link>
                <p className="text-vault-muted font-body text-xs">{year}</p>
              </div>

              {/* Rating */}
              <div className="flex-shrink-0 flex items-center gap-1 text-sm">
                <span className="text-vault-gold">★</span>
                <span className="text-white font-body font-bold">{rating}</span>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                title="Remove from watchlist"
                className="flex-shrink-0 w-8 h-8 rounded-full border border-vault-border text-vault-muted hover:border-vault-red hover:text-vault-red flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
