import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchOverlay from './SearchOverlay'
import { useAuth } from '../hooks/useAuth'
import { getNotifications, markNotificationAsRead } from '../utils/dataStore'

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

  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  // Polling notifications
  useEffect(() => {
    if (!currentUser) {
      setNotifications([])
      return
    }

    const fetchNotifs = () => {
      const all = getNotifications()
      setNotifications(
        all.filter(n => n.userId === currentUser.id)
           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    }

    fetchNotifs()
    const interval = setInterval(fetchNotifs, 3000)
    return () => clearInterval(interval)
  }, [currentUser])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (n) => {
    if (!n.isRead) {
      markNotificationAsRead(n.id)
      setNotifications(prev => prev.map(p => p.id === n.id ? { ...p, isRead: true } : p))
    }
    setShowNotifications(false)
    if (n.supportId) {
      navigate(`/support#msg-${n.supportId}`)
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

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
            
            {currentUser && (
              <div className="relative hidden md:block" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)} 
                  className="hover:scale-105 transition-all duration-200 relative pt-1"
                >
                  <span className="material-symbols-outlined text-on-surface">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-4 w-80 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface-container">
                      <h3 className="font-bold text-white">Notifications</h3>
                      {unreadCount > 0 && <span className="text-xs text-red-500 font-bold">{unreadCount} unread</span>}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div 
                            key={n.id} 
                            onClick={() => handleNotificationClick(n)}
                            className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 flex gap-4 items-start ${!n.isRead ? 'bg-red-600/5' : ''}`}
                          >
                            <div className="mt-1">
                              {n.type === 'support_reply' && <span className="material-symbols-outlined text-red-500 text-sm">support_agent</span>}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm mb-1 ${!n.isRead ? 'text-white font-bold' : 'text-gray-300'}`}>{n.message}</p>
                              <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
                            </div>
                            {!n.isRead && <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5"></div>}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
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
                  {currentUser.role === 'admin' && (
                    <button 
                      onClick={() => navigate('/admin')}
                      className="bg-purple-600/20 text-purple-500 border border-purple-500/30 px-3 py-1 rounded-lg text-xs font-bold hover:bg-purple-600/30 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                      Admin
                    </button>
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
