import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchOverlay from './SearchOverlay'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Movies & Shows', to: '/movies' },
  { label: 'Support', to: '/support' },
  { label: 'Subscriptions', to: '/subscriptions' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-2xl shadow-black/50">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center h-20 px-10 md:px-20 w-full">
          <Link to="/" className="text-2xl font-black text-red-600 tracking-tight uppercase font-['Be_Vietnam_Pro']">
            CineHub
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-['Be_Vietnam_Pro'] font-medium text-sm tracking-wide">
            {NAV_LINKS.map(({ label, to }) => {
              const active = pathname === to || (to !== '/' && pathname.startsWith(to))
              return (
                <Link
                  key={to}
                  to={to}
                  className={active
                    ? 'text-white border-b-2 border-red-600 pb-1'
                    : 'text-gray-400 hover:text-white transition-colors'}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => setSearchOpen(true)} className="hover:scale-105 transition-all duration-200">
              <span className="material-symbols-outlined text-on-surface">search</span>
            </button>
            <button onClick={() => navigate('/my-list')} className="hover:scale-105 transition-all duration-200">
              <span className="material-symbols-outlined text-on-surface">bookmarks</span>
            </button>
            <button className="hover:scale-105 transition-all duration-200">
              <span className="material-symbols-outlined text-on-surface">notifications</span>
            </button>
          </div>
        </div>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
