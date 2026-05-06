import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getMovies } from '../utils/dataStore'
import MovieCard from '../components/MovieCard'
import GenreCard from '../components/GenreCard'
import CTABanner from '../components/CTABanner'
import TrailerModal from '../components/TrailerModal'
import Slider from '../components/Slider'
const GENRE_NAMES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror']
const GENRE_TABS = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror']

export default function MoviesShowsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const activeGenre = searchParams.get('genre') || 'All'
  const [trailerOpen, setTrailerOpen] = useState(false)
  const top10Ref = useRef(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const load = (source) => {
      const next = getMovies()
      setMovies(next)
    }

    load('mount')
    const onUpdated = () => load('cinehub_movies_updated')
    window.addEventListener('cinehub_movies_updated', onUpdated)
    return () => window.removeEventListener('cinehub_movies_updated', onUpdated)
  }, [])

  useEffect(() => {
    const genre = searchParams.get('genre')
    if (genre && top10Ref.current) {
      setTimeout(() => {
        top10Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [searchParams])

  const GENRES = GENRE_NAMES.map(name => {
    const matching = movies.filter(m => m.genres && m.genres.includes(name)).map(m => m.posterUrl)
    let images = [...matching]
    if (images.length > 0) {
      while (images.length < 4) images = [...images, ...images]
    } else {
      images = ['','','','']
    }
    return { name, images: images.slice(0, 4) }
  })

  const featured = movies.find((m) => m.isTrending) || movies[0] || {}
  const top10 = movies.filter((m) => m.topRank).sort((a, b) => a.topRank - b.topRank)
  const trending = movies.filter((m) => m.isTrending)
  const newReleases = movies.filter((m) => m.isNew)
  const mustWatch = movies.filter(m => m.rating >= 7.5)

  const filtered = activeGenre === 'All'
    ? movies
    : movies.filter((m) => m.genres.includes(activeGenre))

  const handlePlay = () => {
    setTrailerOpen(true)
  }

  return (
    <div className="bg-background font-body-md text-on-surface">
      <TrailerModal 
        isOpen={trailerOpen} 
        onClose={() => setTrailerOpen(false)} 
        trailerUrl={featured.trailerUrl} 
      />

      {/* Hero */}
      <header className="relative w-full h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${featured.backdropUrl}')` }}
        />
        <div className="absolute inset-0 cinema-gradient" />
        <div className="relative z-10 h-full flex flex-col justify-end items-center text-center px-10 pb-20 max-w-[1200px] mx-auto">
          <h1 className="font-headline-xl text-white mb-4">{featured.title}</h1>
          <p className="font-body-lg text-gray-300 max-w-3xl mb-10">{featured.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={handlePlay} className="flex items-center gap-2 bg-primary-container text-white px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Play Now
            </button>
            <button onClick={() => featured.id && navigate(`/movie/${featured.id}`)} className="p-4 bg-surface-container rounded-lg border border-white/10 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined">info</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-10 md:px-20 -mt-10 relative z-20 pb-24">

        {/* Genres */}
        <section className="mb-section-gap mt-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-2 inline-block">Explore</span>
              <h2 className="font-headline-lg text-white">Our Genres</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
            {GENRES.map((g) => <GenreCard key={g.name} genre={g} />)}
          </div>
        </section>

        {/* Top 10 */}
        <section ref={top10Ref} className="mb-section-gap scroll-mt-24">
          <h2 className="font-headline-lg text-white mb-8">Popular Top 10 In Genres</h2>
          <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
            {GENRE_TABS.map((g) => (
              <button
                key={g}
                onClick={() => setSearchParams(g === 'All' ? {} : { genre: g })}
                className={`px-6 py-2 rounded-lg whitespace-nowrap font-bold transition-colors ${activeGenre === g ? 'bg-primary-container text-white' : 'bg-surface-container text-gray-400 hover:text-white'}`}
              >
                {g}
              </button>
            ))}
          </div>
          <Slider
            items={activeGenre === 'All' ? top10 : filtered}
            renderItem={(m, i) => (
              <div key={m.id} className="bg-surface-container p-4 rounded-xl border border-white/5 hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => navigate(`/movie/${m.id}`)}>
                <img className="w-full aspect-[2/3] object-cover rounded-lg mb-4" src={m.posterUrl} alt={m.title} />
                <div className="flex justify-between items-center">
                  <span className="bg-surface-container-highest px-3 py-1 rounded text-xs text-white">Top 10 #{i + 1}</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-red-600 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs text-white">{m.rating}</span>
                  </div>
                </div>
              </div>
            )}
          />
        </section>

        {/* Trending Now */}
        <section className="mb-section-gap">
          <h2 className="font-headline-lg text-white mb-8">Trending Now</h2>
          <Slider 
            items={trending} 
            renderItem={(m) => <MovieCard key={m.id} movie={m} variant="poster" />} 
          />
        </section>

        {/* New Releases */}
        <section className="mb-section-gap">
          <h2 className="font-headline-lg text-white mb-8">New Releases</h2>
          <Slider
            items={newReleases}
            renderItem={(m) => (
              <div key={m.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer" onClick={() => navigate(`/movie/${m.id}`)}>
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={m.posterUrl} alt={m.title} />
                <div className="absolute top-2 left-2 bg-red-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">New</div>
              </div>
            )}
          />
        </section>

        {/* Must Watch */}
        <section className="mb-section-gap">
          <h2 className="font-headline-lg text-white mb-8">Must-Watch Movies</h2>
          <Slider 
            items={mustWatch} 
            renderItem={(m) => <MovieCard key={m.id} movie={m} />} 
          />
        </section>

        <CTABanner />
      </main>
    </div>
  )
}
