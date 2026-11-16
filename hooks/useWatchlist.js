'use client'

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'movievault-watchlist'
const EVENT = 'watchlist-updated'
const EMPTY = []
let cachedRaw
let cachedList = EMPTY
let memoryOnly = false

function snapshot() {
  if (memoryOnly) return cachedList
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw !== cachedRaw) {
      cachedRaw = raw
      try {
        const parsed = raw ? JSON.parse(raw) : []
        cachedList = Array.isArray(parsed) ? parsed.filter(movie => movie && typeof movie.id === 'number') : []
      } catch { cachedList = EMPTY }
    }
  } catch { /* A malformed value or unavailable storage must not crash the page. */ }
  return cachedList
}

function subscribe(notify) {
  const onStorage = event => {
    if (event.key === STORAGE_KEY || event.key === null) {
      memoryOnly = false
      notify()
    }
  }
  window.addEventListener(EVENT, notify)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(EVENT, notify)
    window.removeEventListener('storage', onStorage)
  }
}

function update(transform) {
  const next = transform(snapshot())
  cachedList = next
  cachedRaw = JSON.stringify(next)
  try { localStorage.setItem(STORAGE_KEY, cachedRaw) }
  catch { memoryOnly = true }
  window.dispatchEvent(new Event(EVENT))
}

export function useWatchlist() {
  const watchlist = useSyncExternalStore(subscribe, snapshot, () => EMPTY)
  const addToWatchlist = movie => update(previous => previous.some(m => m.id === movie.id) ? previous : [...previous, movie])
  const removeFromWatchlist = id => update(previous => previous.filter(m => m.id !== id))
  const isInWatchlist = id => watchlist.some(m => m.id === id)
  const toggleWatchlist = movie => update(previous => previous.some(m => m.id === movie.id) ? previous.filter(m => m.id !== movie.id) : [...previous, movie])
  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }
}
