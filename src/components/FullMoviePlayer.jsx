import { useEffect } from 'react'

export default function FullMoviePlayer({ isOpen, onClose, movieUrl }) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-8"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full md:max-w-[1400px] md:h-auto aspect-video bg-black md:rounded-2xl overflow-hidden border-0 md:border md:border-white/10 shadow-2xl shadow-primary-container/20"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/90 to-transparent flex justify-end z-10 pointer-events-none transition-opacity hover:opacity-100">
          <button 
            onClick={onClose}
            className="pointer-events-auto bg-black/60 hover:bg-red-600 border border-white/20 text-white rounded-full p-2 flex items-center justify-center transition-colors"
            aria-label="Close player"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Embed */}
        {movieUrl ? (
          <iframe 
            src={`${movieUrl}?autoplay=1&rel=0&modestbranding=1&fs=1`}
            title="Full Movie Player"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">error</span>
            <p>Full movie playback unavailable</p>
          </div>
        )}
      </div>
    </div>
  )
}
