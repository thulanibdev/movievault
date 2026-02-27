'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'movievault-watchlist'

// Helper to dispatch a custom event so Navbar badge updates
const notifyUpdate = () => window.dispatchEvent(new Event('watchlist-updated'))

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setWatchlist(saved)
    } catch {
      setWatchlist([])
    }
  }, [])

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    notifyUpdate()
  }, [watchlist])

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }, [])

  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId))
  }, [])

  const isInWatchlist = useCallback(
    (movieId) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  )

  const toggleWatchlist = useCallback(
    (movie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id)
      } else {
        addToWatchlist(movie)
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  )

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }
}
