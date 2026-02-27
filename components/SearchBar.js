'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar({ defaultValue = '', onSearch }) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    if (onSearch) {
      onSearch(trimmed)
    } else {
      router.push(`/?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full bg-vault-card border border-vault-border rounded-full px-6 py-3.5 pr-32 text-white placeholder-vault-muted font-body text-sm outline-none focus:border-vault-gold transition-colors duration-200"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-vault-gold hover:bg-vault-gold-light text-black font-body font-bold text-sm px-5 py-2 rounded-full transition-colors duration-200"
      >
        Search
      </button>
    </form>
  )
}
