import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'MovieVault — Your Personal Movie Tracker',
  description: 'Search, discover, and track movies you want to watch.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <footer className="border-t border-vault-border mt-20 py-8 text-center text-vault-muted text-sm font-body">
          <p>MovieVault · Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-vault-gold hover:underline">TMDB</a></p>
        </footer>
      </body>
    </html>
  )
}
