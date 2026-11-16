'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useWatchlist } from '@/hooks/useWatchlist'

export default function Navbar() {
  const pathname = usePathname()
  const { watchlist } = useWatchlist()
  const watchlistCount = watchlist.length
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-vault-black/95 backdrop-blur-md border-b border-vault-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-vault-gold text-2xl font-display font-black tracking-tight group-hover:text-vault-gold-light transition-colors">
            Movie<span className="text-white">Vault</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-body tracking-wide transition-colors ${
              pathname === '/' ? 'text-vault-gold' : 'text-vault-muted hover:text-white'
            }`}
          >
            Discover
          </Link>

          <Link
            href="/watchlist"
            className={`relative text-sm font-body tracking-wide transition-colors flex items-center gap-2 ${
              pathname === '/watchlist' ? 'text-vault-gold' : 'text-vault-muted hover:text-white'
            }`}
          >
            Watchlist
            {watchlistCount > 0 && (
              <span className="bg-vault-gold text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {watchlistCount > 99 ? '99+' : watchlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
