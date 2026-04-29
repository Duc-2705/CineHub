import { Link } from 'react-router-dom'

const FOOTER_COLS = [
  { title: 'Home', links: [{ label: 'Categories', to: '/movies' }, { label: 'Movies', to: '/movies' }, { label: 'Shows', to: '/movies' }] },
  { title: 'Movies', links: [{ label: 'Genres', to: '/movies' }, { label: 'Trending', to: '/movies' }, { label: 'New Release', to: '/movies' }] },
  { title: 'Support', links: [{ label: 'Contact Us', to: '/support' }, { label: 'FAQ', to: '/support' }, { label: 'Feedback', to: '/support' }] },
  { title: 'Subscription', links: [{ label: 'Plans', to: '/subscriptions' }, { label: 'Features', to: '/subscriptions' }] },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-10 md:px-20 py-24 flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-xs">
          <div className="text-xl font-bold text-red-600 mb-6 font-['Be_Vietnam_Pro'] uppercase">CineHub</div>
          <p className="font-['Be_Vietnam_Pro'] text-sm text-gray-400 mb-8">
            CineHub is the premier platform for cinematic exploration. Immerse yourself in worlds beyond imagination.
          </p>
          <div className="flex gap-4">
            {['social_leaderboard', 'retweet', 'link'].map((icon) => (
              <span key={icon} onClick={() => alert('Social links coming soon!')} className="material-symbols-outlined text-white p-2 bg-surface-container rounded-lg cursor-pointer hover:text-red-600 transition-colors">
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h5 className="text-white font-bold font-['Be_Vietnam_Pro']">{col.title}</h5>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} className="text-gray-500 hover:text-white transition-colors font-['Be_Vietnam_Pro'] text-sm">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-10 md:px-20 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-['Be_Vietnam_Pro'] text-sm text-gray-400">© 2024 CineHub. All rights reserved.</p>
        <div className="flex gap-6 font-['Be_Vietnam_Pro'] text-xs text-gray-500">
          {['Terms of Use', 'Privacy Policy', 'Cookie Policy'].map((t) => (
            <button key={t} onClick={() => alert('Legal info coming soon!')} className="hover:text-white transition-colors">{t}</button>
          ))}
        </div>
      </div>
    </footer>
  )
}
