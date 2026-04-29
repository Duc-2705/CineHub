import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movies from '../data/movies.json'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const results = query.trim().length > 1
    ? movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()) || m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase())))
    : []
  return (
    <div className="pt-28 min-h-screen max-w-[1440px] mx-auto px-10 md:px-20 pb-24">
      <h1 className="font-headline-lg text-white mb-8">Search</h1>
      <div className="flex items-center gap-4 bg-surface-container border border-white/10 rounded-xl px-6 py-4 mb-10 max-w-2xl">
        <span className="material-symbols-outlined text-gray-400">search</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies, genres…" className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 text-lg" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
        {results.map((m) => (
          <div key={m.id} className="bg-surface-container p-4 rounded-xl border border-white/5 cursor-pointer hover:bg-surface-container-high transition-all" onClick={() => navigate(`/movie/${m.id}`)}>
            <img src={m.posterUrl} alt={m.title} className="w-full aspect-[2/3] object-cover rounded-lg mb-3" />
            <p className="text-white font-bold text-sm">{m.title}</p>
            <p className="text-xs text-gray-500">{m.genres.join(' · ')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
