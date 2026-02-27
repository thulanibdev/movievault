'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import MovieCard from '@/components/MovieCard'
import { searchMovies, getTrending } from '@/lib/tmdb'

// Grid skeleton loader
function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[2/3] rounded-lg skeleton" />
          <div className="mt-2 h-4 skeleton rounded w-3/4" />
          <div className="mt-1 h-3 skeleton rounded w-1/3" />
        </div>
      ))}
    </div>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''

  const [movies, setMovies] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Load trending on first visit
  useEffect(() => {
    if (!query) {
      getTrending()
        .then((data) => setTrending(data.results || []))
        .catch(() => {})
    }
  }, [query])

  // Search whenever query or page changes
  useEffect(() => {
    if (!query) return
    setLoading(true)
    setError(null)
    searchMovies(query, page)
      .then((data) => {
        setMovies(data.results || [])
        setTotalPages(data.total_pages || 0)
      })
      .catch(() => setError('Could not fetch results. Check your API key.'))
      .finally(() => setLoading(false))
  }, [query, page])

  const handleSearch = (q) => {
    setPage(1)
    router.push(`/?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-4">
          Your Personal<br />
          <span className="text-vault-gold">Movie Vault.</span>
        </h1>
        <p className="text-vault-muted font-body text-lg mb-8">
          Search millions of movies, explore details, and build your watchlist.
        </p>
        <SearchBar defaultValue={query} onSearch={handleSearch} />
      </div>

      {/* Results or Trending */}
      {query ? (
        <section>
          <h2 className="font-display text-xl font-semibold text-white mb-6">
            {loading ? 'Searching...' : `Results for "${query}"`}
          </h2>
          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 font-body">{error}</p>
              <p className="text-vault-muted text-sm mt-2">
                Make sure <code className="text-vault-gold">NEXT_PUBLIC_TMDB_API_KEY</code> is set in your <code>.env.local</code> file.
              </p>
            </div>
          )}
          {loading ? (
            <GridSkeleton />
          ) : movies.length === 0 && !error ? (
            <p className="text-vault-muted font-body text-center py-20">No movies found for "{query}".</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie, i) => (
                  <MovieCard key={movie.id} movie={movie} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-full border border-vault-border text-vault-muted font-body text-sm hover:border-vault-gold hover:text-vault-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  <span className="text-vault-muted font-body text-sm">
                    Page {page} of {Math.min(totalPages, 500)}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-4 py-2 rounded-full border border-vault-border text-vault-muted font-body text-sm hover:border-vault-gold hover:text-vault-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      ) : (
        <section>
          <h2 className="font-display text-xl font-semibold text-white mb-6">
            🔥 Trending This Week
          </h2>
          {trending.length === 0 ? (
            <GridSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trending.slice(0, 20).map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-6 py-24 text-center text-vault-muted">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
