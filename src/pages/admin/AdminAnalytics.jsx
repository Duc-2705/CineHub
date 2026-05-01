import { useState, useEffect } from 'react';
import { getViews, getMovies } from '../../utils/dataStore';

export default function AdminAnalytics() {
  const [stats, setStats] = useState({ today: 0, thisMonth: 0, thisYear: 0 });
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const views = getViews();
    const movies = getMovies();
    const now = new Date();
    
    let todayCount = 0;
    let monthCount = 0;
    let yearCount = 0;

    const movieViewCounts = {};

    views.forEach(v => {
      const viewDate = new Date(v.date);
      
      // Calculate time buckets
      if (viewDate.getFullYear() === now.getFullYear()) {
        yearCount++;
        if (viewDate.getMonth() === now.getMonth()) {
          monthCount++;
          if (viewDate.getDate() === now.getDate()) {
            todayCount++;
          }
        }
      }

      // Calculate totals per movie
      movieViewCounts[v.movieId] = (movieViewCounts[v.movieId] || 0) + 1;
    });

    setStats({ today: todayCount, thisMonth: monthCount, thisYear: yearCount });

    // Find top movies
    const top = Object.entries(movieViewCounts)
      .map(([id, count]) => {
        const movie = movies.find(m => m.id === id);
        return {
          id,
          title: movie ? movie.title : 'Unknown Movie',
          count
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setTopMovies(top);
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-headline-lg text-white mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 text-center">
          <p className="text-gray-400 font-label-md uppercase tracking-wider mb-2">Views Today</p>
          <p className="text-white font-headline-xl text-5xl">{stats.today}</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 text-center">
          <p className="text-gray-400 font-label-md uppercase tracking-wider mb-2">Views This Month</p>
          <p className="text-white font-headline-xl text-5xl">{stats.thisMonth}</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 text-center">
          <p className="text-gray-400 font-label-md uppercase tracking-wider mb-2">Views This Year</p>
          <p className="text-white font-headline-xl text-5xl">{stats.thisYear}</p>
        </div>
      </div>

      <h2 className="font-headline-md text-white mb-6">Top Viewed Movies</h2>
      <div className="bg-surface-container-low rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container border-b border-white/5">
            <tr>
              <th className="p-4 text-gray-400 font-label-md w-16 text-center">Rank</th>
              <th className="p-4 text-gray-400 font-label-md">Movie Title</th>
              <th className="p-4 text-gray-400 font-label-md text-right">Total Views</th>
            </tr>
          </thead>
          <tbody>
            {topMovies.map((movie, index) => (
              <tr key={movie.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="p-4 text-center font-bold text-gray-500">#{index + 1}</td>
                <td className="p-4 text-white font-bold">{movie.title}</td>
                <td className="p-4 text-right text-gray-300 font-mono">{movie.count}</td>
              </tr>
            ))}
            {topMovies.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">No viewing data available yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
