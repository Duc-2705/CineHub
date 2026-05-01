import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovies } from '../utils/dataStore'
import MovieCard from '../components/MovieCard'
import GenreCard from '../components/GenreCard'
import FAQItem from '../components/FAQItem'
import PricingCard from '../components/PricingCard'
import CTABanner from '../components/CTABanner'

const movies = getMovies()
const GENRE_NAMES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror']
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

const DEVICES = [
  { icon: 'smartphone', title: 'Smartphones', desc: 'CineHub is optimized for both Android and iOS devices. Watch on our mobile app or web browser.' },
  { icon: 'tablet_mac', title: 'Tablet', desc: 'Enjoy the larger screen of your tablet for a more immersive viewing experience on the go.' },
  { icon: 'tv', title: 'Smart TV', desc: 'Watch on your big screen with our native Smart TV apps for Samsung, LG, and more.' },
  { icon: 'laptop', title: 'Laptops', desc: 'Stream directly from your Chrome, Safari, or Firefox browser on any PC or Mac.' },
  { icon: 'sports_esports', title: 'Gaming Consoles', desc: 'Available on PlayStation and Xbox consoles for a seamless entertainment hub setup.' },
  { icon: 'vrpano', title: 'VR Headsets', desc: 'Experience a virtual cinema environment with our cutting-edge VR application.' },
]

const FAQS = [
  { q: 'What is CineHub?', a: 'CineHub is a streaming service that allows you to watch movies and shows on your favorite devices.' },
  { q: 'How much does CineHub cost?', a: 'CineHub offers multiple subscription plans starting from just $9.99/month. Choose between Basic, Standard, and Premium.' },
  { q: 'What content is available on CineHub?', a: 'We offer thousands of movies and TV shows across all genres, including new releases and exclusive originals.' },
  { q: 'How can I watch CineHub?', a: 'Watch on smartphones, tablets, laptops, smart TVs, gaming consoles, and VR headsets.' },
  { q: 'How do I cancel my subscription?', a: 'You can cancel anytime from your account settings — no fees, no commitments.' },
]

const PLANS = [
  { name: 'Basic Plan', monthlyPrice: 9.99, description: 'Enjoy an extensive library of movies and shows, featuring a range of content.', featured: false },
  { name: 'Standard Plan', monthlyPrice: 14.99, description: 'Access to a wider selection of movies and shows, including HD content.', featured: true },
  { name: 'Premium Plan', monthlyPrice: 19.99, description: 'Experience the best streaming quality with 4K Ultra HD and multi-device access.', featured: false },
]

const trending = movies.filter((m) => m.isTrending).slice(0, 5)
const newReleases = movies.filter((m) => m.isNew).slice(0, 5)

export default function HomePage() {
  const navigate = useNavigate()
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="bg-background font-body-md text-on-surface">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Cinematic background"
            className="w-full h-full object-cover opacity-30"
            src="https://picsum.photos/seed/hero-home/1400/900"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="mb-10 flex justify-center">
            <div className="bg-red-600/20 px-4 py-2 rounded-full border border-red-600/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              <span className="text-xs font-bold tracking-widest uppercase text-white">Stream the future</span>
            </div>
          </div>
          <h1 className="font-headline-xl text-white mb-6 md:text-7xl">The Best Streaming Experience</h1>
          <p className="font-body-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            CineHub is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.
          </p>
          <button
            onClick={() => navigate('/movies')}
            className="bg-primary-container text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 mx-auto hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            Start Watching Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 py-section-gap">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-white mb-4">Explore our wide variety of categories</h2>
            <p className="font-body-md text-gray-400">Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
          {GENRES.map((g) => <GenreCard key={g.name} genre={g} />)}
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 pb-section-gap">
        <h2 className="font-headline-lg text-white mb-8">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {trending.map((m) => <MovieCard key={m.id} movie={m} variant="poster" />)}
        </div>
      </section>

      {/* New Releases */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 pb-section-gap">
        <h2 className="font-headline-lg text-white mb-8">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {newReleases.map((m) => (
            <div
              key={m.id}
              className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/movie/${m.id}`)}
            >
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={m.posterUrl} alt={m.title} />
              <div className="absolute top-2 left-2 bg-red-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">New</div>
            </div>
          ))}
        </div>
      </section>

      {/* Devices */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 py-section-gap">
        <div className="mb-16">
          <h2 className="font-headline-lg text-white mb-4">We Provide you streaming experience across various devices</h2>
          <p className="font-body-md text-gray-400 max-w-3xl">With CineHub, you can enjoy your favorite movies and TV shows anytime, anywhere.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {DEVICES.map((d) => (
            <div key={d.title} className="p-8 bg-gradient-to-br from-surface-container-high to-surface-container border border-white/5 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-red-600/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600">{d.icon}</span>
                </div>
                <h3 className="font-headline-md text-white">{d.title}</h3>
              </div>
              <p className="text-gray-400 font-body-md leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 py-section-gap">
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-12">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-white mb-4">Frequently Asked Questions</h2>
            <p className="font-body-md text-gray-400">Got questions? We've got answers!</p>
            <button onClick={() => { window.scrollTo(0, 0); navigate('/support'); }} className="mt-8 bg-primary-container text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all">Ask a Question</button>
          </div>
          <div className="flex-1 space-y-4">
            {FAQS.map((f, i) => <FAQItem key={i} number={i + 1} question={f.q} answer={f.a} />)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-[1440px] mx-auto px-10 md:px-20 py-section-gap">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-white mb-4">Choose the plan that's right for you</h2>
            <p className="font-body-md text-gray-400">Join CineHub and select from our flexible subscription plans.</p>
          </div>
          <div className="flex p-2 bg-black border border-white/10 rounded-xl">
            <button onClick={() => setIsYearly(false)} className={`px-6 py-2 font-bold rounded-lg transition-colors ${!isYearly ? 'bg-surface-container-high text-white' : 'text-gray-400 hover:text-white'}`}>Monthly</button>
            <button onClick={() => setIsYearly(true)} className={`px-6 py-2 font-bold rounded-lg transition-colors ${isYearly ? 'bg-surface-container-high text-white' : 'text-gray-400 hover:text-white'}`}>Yearly</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-center">
          {PLANS.map((p) => <PricingCard key={p.name} plan={p} isYearly={isYearly} />)}
        </div>
      </section>

      <CTABanner />
    </div>
  )
}
