# 🎬 MovieVault

A full-featured movie search and watchlist app built with **Next.js 14**, **Tailwind CSS**, and the free **TMDB API**.

![MovieVault Preview](https://image.tmdb.org/t/p/w780/placeholder.jpg)

## Features

- 🔍 **Search** millions of movies instantly
- 🔥 **Trending** movies loaded on the homepage
- 🎬 **Movie detail pages** with cast, trailer link, ratings, and similar movies
- ✅ **Personal watchlist** — saved to localStorage, no account needed
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ⚡ **Deployed on Vercel** in one click

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/movievault.git
cd movievault
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a free TMDB API key

1. Go to [https://www.themoviedb.org](https://www.themoviedb.org) and create a free account
2. Go to **Settings → API** and request an API key (choose "Developer")
3. Copy your **API Key (v3 auth)**

### 4. Set up your environment

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and replace `your_tmdb_api_key_here` with your actual key:

```
NEXT_PUBLIC_TMDB_API_KEY=abc123yourkeyhere
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"**
3. Import your GitHub repository
4. In the **Environment Variables** section, add:
   - Key: `NEXT_PUBLIC_TMDB_API_KEY`
   - Value: your TMDB API key
5. Click **Deploy** — done! 🎉

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js 14](https://nextjs.org) | React framework with App Router |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [TMDB API](https://developer.themoviedb.org) | Movie data |
| [Vercel](https://vercel.com) | Hosting & deployment |

---

## Project Structure

```
movievault/
├── app/
│   ├── layout.js          # Root layout with Navbar
│   ├── page.js            # Home: search + trending
│   ├── movie/[id]/
│   │   └── page.js        # Movie detail page
│   └── watchlist/
│       └── page.js        # Saved watchlist
├── components/
│   ├── Navbar.js          # Top navigation
│   ├── MovieCard.js       # Reusable movie card
│   └── SearchBar.js       # Search input
├── hooks/
│   └── useWatchlist.js    # Watchlist logic (localStorage)
├── lib/
│   └── tmdb.js            # All TMDB API calls
└── .env.local.example     # Environment variable template
```

---

## License

MIT — free to use and modify.
