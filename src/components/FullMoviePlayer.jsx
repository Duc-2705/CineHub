import { useEffect } from 'react'

export default function FullMoviePlayer({ isOpen, onClose, movieUrl }) {
  // All hooks MUST be called before any conditional returns (React Rules of Hooks)
  const isValidSource = movieUrl && (
    movieUrl.includes('youtube.com') ||
    movieUrl.includes('youtu.be') ||
    movieUrl.startsWith('/') ||
    movieUrl.includes('123embed.net')
  )

  const embedSrc = (() => {
    if (!movieUrl) return null
    if (movieUrl.includes('youtube.com') || movieUrl.includes('youtu.be')) {
      const separator = movieUrl.includes('?') ? '&' : '?'
      return `${movieUrl}${separator}autoplay=1&rel=0&modestbranding=1&fs=1`
    }
    return movieUrl
  })()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Conditional return ONLY after all hooks
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full md:max-w-[1400px] md:h-auto aspect-video bg-black md:rounded-2xl overflow-hidden border-0 md:border md:border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/90 to-transparent flex justify-end z-10 pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto bg-black/60 hover:bg-red-600 border border-white/20 text-white rounded-full p-2 flex items-center justify-center transition-colors"
            aria-label="Close player"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Player */}
        {isValidSource ? (
          <iframe
            key={embedSrc}
            src={embedSrc}
            title="Full Movie Player"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="material-symbols-outlined text-6xl opacity-50">movie_off</span>
            <p className="text-lg font-semibold">Full movie playback unavailable</p>
            <p className="text-sm opacity-60">This demo only supports YouTube links</p>
          </div>
        )}
      </div>
    </div>
  )
}
