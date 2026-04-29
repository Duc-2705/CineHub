import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMyList } from '../hooks/useMyList'
import StarRating from './StarRating'
import TrailerModal from './TrailerModal'

export default function MovieCard({ movie, variant = 'default' }) {
  const navigate = useNavigate()
  const { isInList, toggleList } = useMyList()
  const [trailerOpen, setTrailerOpen] = useState(false)
  const inList = isInList(movie.id)

  if (variant === 'poster') {
    return (
      <div
        className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={movie.posterUrl}
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={(e) => { e.stopPropagation(); setTrailerOpen(true); }}
              className="bg-red-600/90 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg shadow-red-600/50 flex items-center justify-center"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </button>
          </div>
          <p className="text-white font-bold relative z-10">{movie.title}</p>
          <p className="text-xs text-gray-300 relative z-10">{movie.duration}</p>
        </div>
        {movie.isNew && (
          <div className="absolute top-2 left-2 bg-red-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">New</div>
        )}
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1 rounded-full"
          onClick={(e) => { e.stopPropagation(); toggleList(movie.id) }}
        >
          <span className="material-symbols-outlined text-sm" style={inList ? { fontVariationSettings: "'FILL' 1", color: '#e50000' } : {}}>
            bookmark
          </span>
        </button>
        <TrailerModal 
          isOpen={trailerOpen} 
          onClose={() => setTrailerOpen(false)} 
          trailerUrl={movie.trailerUrl} 
        />
      </div>
    )
  }

  return (
    <div
      className="bg-surface-container p-4 rounded-xl border border-white/5 hover:bg-surface-container-high transition-all cursor-pointer relative group"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105" src={movie.posterUrl} alt={movie.title} />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={(e) => { e.stopPropagation(); setTrailerOpen(true); }}
            className="bg-red-600/90 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg shadow-red-600/50 flex items-center justify-center"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-white truncate pr-2">{movie.title}</span>
        <button
          onClick={(e) => { e.stopPropagation(); toggleList(movie.id) }}
          className="shrink-0"
        >
          <span className="material-symbols-outlined text-sm" style={inList ? { fontVariationSettings: "'FILL' 1", color: '#e50000' } : { color: '#9ca3af' }}>
            bookmark
          </span>
        </button>
      </div>
      <StarRating rating={movie.rating / 2} />
      <p className="text-xs text-gray-500 mt-1">{movie.genres.join(' • ')} • {movie.duration}</p>
      <TrailerModal 
        isOpen={trailerOpen} 
        onClose={() => setTrailerOpen(false)} 
        trailerUrl={movie.trailerUrl} 
      />
    </div>
  )
}
