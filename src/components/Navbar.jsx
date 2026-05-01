import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchOverlay from './SearchOverlay'
import { useAuth } from '../hooks/useAuth'

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
  const { currentUser, logout } = useAuth()

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
            <button onClick={() => alert('Notifications coming soon!')} className="hover:scale-105 transition-all duration-200 hidden md:block">
              <span className="material-symbols-outlined text-on-surface">notifications</span>
            </button>
            
            <div className="border-l border-white/20 h-6 mx-2 hidden md:block"></div>

            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 hidden md:flex">
                  <span className="text-sm font-bold text-white">Hi, {currentUser.name}</span>
                  {currentUser.subscription?.status === 'active' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/20 border border-yellow-400/50">
                      {currentUser.subscription.plan.replace(' Plan', '')}
                    </span>
                  )}
                </div>
                <button 
                  onClick={logout} 
                  className="bg-surface-container hover:bg-surface-container-high border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
