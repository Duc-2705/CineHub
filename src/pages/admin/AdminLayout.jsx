import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const navLinks = [
    { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
    { to: '/admin/users', icon: 'group', label: 'Users', end: false },
    { to: '/admin/movies', icon: 'movie', label: 'Movies', end: false },
    { to: '/admin/analytics', icon: 'analytics', label: 'Analytics', end: false },
    { to: '/admin/support', icon: 'support_agent', label: 'Support', end: false },
  ];

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface flex pt-[80px]">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6">
          <h2 className="text-gray-400 font-label-md uppercase tracking-wider">Admin Panel</h2>
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-label-md transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
