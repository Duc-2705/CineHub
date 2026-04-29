import { useEffect } from 'react'

export default function TrailerModal({ isOpen, onClose, trailerUrl }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[1200px] aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-red-600/20"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
      >
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-end z-10 pointer-events-none">
          <button 
            onClick={onClose}
            className="pointer-events-auto bg-black/50 hover:bg-red-600 border border-white/20 text-white rounded-full p-2 flex items-center justify-center transition-colors"
            aria-label="Close trailer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Embed */}
        {trailerUrl ? (
          <iframe 
            src={`${trailerUrl}?autoplay=1&rel=0`}
            title="Movie Trailer"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">movie</span>
            <p>Trailer coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
