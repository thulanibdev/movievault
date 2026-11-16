# MovieVault

A movie discovery and watchlist project using the TMDB API.

[Live demo](https://movievault-jade.vercel.app/) · [Source](https://github.com/thulanibdev/movievault)

## Features

Movie search, trending titles, detail pages and a browser-stored watchlist.

Watchlist changes are shared between components and tabs, and existing data is preserved on page load.

## Stack and data

Next.js 14, React, Tailwind CSS and TMDB.

Browser-stored data belongs to the current browser profile. It does not sync to a user account, and clearing site data removes it. This is a portfolio project in ongoing development.

## Run locally

```bash
npm ci
cp .env.local.example .env.local
# Add the required API credentials locally.
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_TMDB_API_KEY` for TMDB movie data. This public-prefixed value is visible in browser code; it must not be treated as a server secret.

## Verification

```bash
npm test
npm run build
```

The tests cover the project's persistence or business logic and error cases. They do not validate third-party services or prove that every live-demo feature works.

## Development priorities

Improve accessibility, document design decisions and add integration coverage as the project develops. Keep secret keys in local environment configuration and out of Git.
