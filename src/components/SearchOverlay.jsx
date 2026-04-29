import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import movies from '../data/movies.json'

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const results = query.trim().length > 1
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : []

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center pt-32 px-6" onClick={onClose}>
      <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 bg-surface-container border border-white/10 rounded-xl px-6 py-4 mb-6">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, genres…"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 text-lg"
          />
          <button onClick={onClose}>
            <span className="material-symbols-outlined text-gray-400 hover:text-white">close</span>
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-surface-container border border-white/10 rounded-xl overflow-hidden">
            {results.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-high cursor-pointer border-b border-white/5 last:border-0"
                onClick={() => { navigate(`/movie/${m.id}`); onClose() }}
              >
                <img src={m.posterUrl} alt={m.title} className="w-10 h-14 object-cover rounded" />
                <div>
                  <p className="text-white font-bold">{m.title}</p>
                  <p className="text-xs text-gray-400">{m.genres.join(' • ')} · {m.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {query.trim().length > 1 && results.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No results for "{query}"</p>
        )}
      </div>
    </div>
  )
}
