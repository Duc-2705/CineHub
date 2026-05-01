import { useEffect, useState } from 'react';
import { getMovies, getUsers, getViews, getSupportMessages } from '../../utils/dataStore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMovies: 0,
    totalViews: 0,
    pendingSupport: 0
  });

  useEffect(() => {
    setStats({
      totalUsers: getUsers().length,
      totalMovies: getMovies().length,
      totalViews: getViews().length,
      pendingSupport: getSupportMessages().filter(m => m.status === 'pending').length
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-headline-lg text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon="group" color="bg-blue-600/20 text-blue-500" />
        <StatCard title="Total Movies" value={stats.totalMovies} icon="movie" color="bg-purple-600/20 text-purple-500" />
        <StatCard title="Total Views" value={stats.totalViews} icon="visibility" color="bg-green-600/20 text-green-500" />
        <StatCard title="Pending Support" value={stats.pendingSupport} icon="support_agent" color="bg-orange-600/20 text-orange-500" />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex items-center gap-6">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div>
        <p className="text-gray-400 font-label-sm uppercase tracking-wider mb-1">{title}</p>
        <p className="text-white font-headline-md">{value}</p>
      </div>
    </div>
  );
}
