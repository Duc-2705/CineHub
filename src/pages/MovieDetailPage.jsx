import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import movies from '../data/movies.json'
import { useMyList } from '../hooks/useMyList'
import { useAuth } from '../hooks/useAuth'
import StarRating from '../components/StarRating'
import CTABanner from '../components/CTABanner'
import TrailerModal from '../components/TrailerModal'
import FullMoviePlayer from '../components/FullMoviePlayer'

export default function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isInList, toggleList } = useMyList()
  const { currentUser } = useAuth()
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [fullMovieOpen, setFullMovieOpen] = useState(false)

  const [userRating, setUserRating] = useState(0)
  const [userReviews, setUserReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    if (id) {
      const storedRating = localStorage.getItem(`cinehub_rating_${id}`)
      if (storedRating) setUserRating(Number(storedRating))

      const storedReviews = localStorage.getItem(`cinehub_reviews_${id}`)
      if (storedReviews) setUserReviews(JSON.parse(storedReviews))
    }
  }, [id])

  const handleRatingChange = (newRating) => {
    setUserRating(newRating)
    localStorage.setItem(`cinehub_rating_${id}`, newRating)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewText.trim()) return

    const newReview = {
      author: currentUser?.name || 'Anonymous',
      from: 'CineHub User',
      rating: reviewRating,
      text: reviewText,
      id: Date.now()
    }

    const updatedReviews = [newReview, ...userReviews]
    setUserReviews(updatedReviews)
    localStorage.setItem(`cinehub_reviews_${id}`, JSON.stringify(updatedReviews))

    // Reset
    setReviewName('')
    setReviewRating(5)
    setReviewText('')
    setShowReviewForm(false)
    alert('Review added successfully!')
  }

  const movie = movies.find((m) => m.id === id)

  if (!movie) return (
    <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-white gap-4">
      <p className="text-2xl font-bold">Movie not found</p>
      <button onClick={() => navigate('/movies')} className="text-red-500 hover:underline">← Browse all movies</button>
    </div>
  )

  const inList = isInList(movie.id)

  const handlePlay = () => {
    setTrailerOpen(true)
  }

  return (
    <div className="bg-background font-body-md text-on-surface">
      <TrailerModal 
        isOpen={trailerOpen} 
        onClose={() => setTrailerOpen(false)} 
        trailerUrl={movie.trailerUrl} 
      />
      <FullMoviePlayer
        isOpen={fullMovieOpen}
        onClose={() => setFullMovieOpen(false)}
        movieUrl={movie.fullMovieUrl}
      />

      {/* Hero */}
      <section className="relative pt-20 w-full px-10 md:px-20 mt-6">
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl bg-surface-container-high">
          {movie.backdropUrl && <img alt={movie.title} className="w-full h-full object-cover" src={movie.backdropUrl} />}
          <div className="absolute inset-0 cinema-gradient flex flex-col justify-end items-center text-center pb-16 px-4">
            <h1 className="font-headline-xl text-white mb-4 tracking-tight">{movie.title}</h1>
            <p className="max-w-2xl text-gray-300 font-body-md mb-8">{movie.description}</p>
            <div className="flex gap-4">
              <button onClick={() => setFullMovieOpen(true)} className="bg-primary-container text-white px-6 py-3 rounded-lg font-label-md flex items-center gap-2 hover:scale-105 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                Watch Full Movie (Demo)
              </button>
              <button onClick={() => setTrailerOpen(true)} className="bg-surface-container-highest/80 border border-white/20 text-white px-6 py-3 rounded-lg font-label-md flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
                Trailer
              </button>
              <button
                onClick={() => toggleList(movie.id)}
                className="bg-surface-container-highest/60 border border-white/10 p-3 rounded-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined" style={inList ? { fontVariationSettings: "'FILL' 1", color: '#e50000' } : {}}>
                  {inList ? 'bookmark' : 'bookmark_add'}
                </span>
              </button>
              <div className="bg-surface-container-highest/60 border border-white/10 px-4 py-2 rounded-lg flex flex-col justify-center items-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Rate this</span>
                <StarRating rating={userRating} onRatingChange={handleRatingChange} size="text-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* Description */}
          <div className="bg-surface-container-low p-10 rounded-xl border border-white/5">
            <h2 className="text-gray-400 font-label-md mb-4">Description</h2>
            <p className="font-body-lg text-white leading-relaxed">{movie.description}</p>
          </div>

          {/* Cast */}
          <div className="bg-surface-container-low p-10 rounded-xl border border-white/5">
            <h2 className="text-gray-400 font-label-md mb-6">Cast</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {movie.cast && movie.cast.length > 0 ? (
                movie.cast.map((c) => (
                  <div key={c.name} className="flex-shrink-0 w-24 text-center">
                    {c.imageUrl ? (
                      <img alt={c.name} className="w-24 h-24 rounded-lg object-cover mb-2 border border-white/10" src={c.imageUrl} />
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-surface-container-highest mb-2 border border-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-500">person</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-400">{c.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No cast information available.</p>
              )}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-surface-container-low p-10 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-gray-400 font-label-md">Reviews</h2>
              <button 
                onClick={() => {
                  if (!currentUser) {
                    navigate('/login', { state: { from: location } });
                    return;
                  }
                  setShowReviewForm(!showReviewForm)
                }} 
                className="bg-surface-container-highest px-4 py-2 rounded-lg text-sm border border-white/10 flex items-center gap-2 hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-sm">{showReviewForm ? 'close' : 'add'}</span> {showReviewForm ? 'Cancel' : 'Add Your Review'}
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="mb-8 bg-surface p-6 rounded-lg border border-white/10 flex flex-col gap-4">
                <h3 className="font-bold text-white mb-2">Write a Review</h3>
                <div className="text-sm text-gray-400 mb-2">
                  Posting as <span className="text-white font-bold">{currentUser?.name}</span>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Your Rating</label>
                  <StarRating rating={reviewRating} onRatingChange={setReviewRating} size="text-lg" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Comment</label>
                  <textarea required value={reviewText} onChange={e => setReviewText(e.target.value)} rows="3" className="w-full bg-surface-container px-4 py-2 rounded border border-white/5 text-white focus:outline-none focus:border-red-600" placeholder="What did you think of the movie?"></textarea>
                </div>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors self-start">Submit Review</button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(() => {
                const allReviews = [...userReviews, ...(movie.reviews || [])]
                if (allReviews.length === 0) return <p className="text-gray-500 text-sm italic">No reviews yet.</p>
                
                return allReviews.map((r, idx) => (
                  <div key={r.author} className="bg-surface p-6 rounded-lg border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white font-bold text-sm">{r.author}</h4>
                        <p className="text-xs text-gray-500">From {r.from}</p>
                      </div>
                      <div className="bg-surface-container-high px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                        <span className="material-symbols-outlined text-xs text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-xs text-white">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{r.text}</p>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low p-10 rounded-xl border border-white/5 flex flex-col gap-8">
            <div>
              <h3 className="text-gray-500 font-label-md mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span> Released Year
              </h3>
              <p className="text-white font-headline-md text-lg">{movie.year}</p>
            </div>
            <div>
              <h3 className="text-gray-500 font-label-md mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span> Duration
              </h3>
              <p className="text-white font-headline-md text-lg">{movie.duration}</p>
            </div>
            <div>
              <h3 className="text-gray-500 font-label-md mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">language</span> Available Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.languages && movie.languages.length > 0 ? (
                  movie.languages.map((l) => (
                    <span key={l} className="bg-surface-container px-3 py-1 rounded-md text-sm border border-white/5">{l}</span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">Not specified</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 font-label-md mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">star</span> Ratings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface p-3 rounded-lg border border-white/10">
                  <p className="text-xs text-gray-500 mb-1">IMDb</p>
                  <div className="flex items-center gap-1 text-red-600">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-white font-bold">{movie.rating}</span>
                  </div>
                </div>
                <div className="bg-surface p-3 rounded-lg border border-white/10 flex flex-col justify-center">
                  <p className="text-xs text-gray-500 mb-1 flex justify-between">
                    CineHub
                    <span className="text-gray-400">{(() => {
                      const allR = [...userReviews, ...(movie.reviews || [])]
                      if (allR.length === 0) return (movie.rating / 2).toFixed(1)
                      return (allR.reduce((sum, r) => sum + r.rating, 0) / allR.length).toFixed(1)
                    })()}</span>
                  </p>
                  <StarRating rating={(() => {
                    const allR = [...userReviews, ...(movie.reviews || [])]
                    if (allR.length === 0) return movie.rating / 2
                    return allR.reduce((sum, r) => sum + r.rating, 0) / allR.length
                  })()} />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 font-label-md mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">movie</span> Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres && movie.genres.length > 0 ? (
                  movie.genres.map((g) => (
                    <span key={g} className="bg-surface-container px-3 py-1 rounded-md text-sm border border-white/5">{g}</span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">None</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 font-label-md mb-2">Director</h3>
              {movie.director ? (
                <div className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-white/5">
                  {movie.director.imageUrl ? (
                    <img alt={movie.director.name} className="w-12 h-12 rounded-lg object-cover" src={movie.director.imageUrl} />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-gray-500">person</span>
                    </div>
                  )}
                  <div>
                    <p className="text-white text-sm font-bold">{movie.director.name}</p>
                    <p className="text-xs text-gray-500">{movie.director.origin || 'Unknown'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">Unknown</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
