import { useState, useEffect } from 'react';
import { getMovies, saveMovies, getViews } from '../../utils/dataStore';

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const movieData = {
      id: editingMovie.id || Date.now().toString(),
      title: formData.get('title'),
      year: formData.get('year'),
      duration: formData.get('duration'),
      rating: Number(formData.get('rating')),
      genres: formData.get('genres').split(',').map(s => s.trim()),
      posterUrl: formData.get('posterUrl'),
      backdropUrl: formData.get('backdropUrl'),
      trailerUrl: formData.get('trailerUrl'),
      fullMovieUrl: formData.get('fullMovieUrl'),
      description: formData.get('description'),
      isTrending: formData.get('isTrending') === 'on',
      isNew: formData.get('isNew') === 'on'
    };

    let updatedMovies;
    if (editingMovie.id) {
      updatedMovies = movies.map(m => m.id === editingMovie.id ? { ...m, ...movieData } : m);
    } else {
      updatedMovies = [movieData, ...movies];
    }

    setMovies(updatedMovies);
    saveMovies(updatedMovies);
    setEditingMovie(null);
  };

  const handleDelete = () => {
    const updatedMovies = movies.filter(m => m.id !== showDeleteConfirm);
    setMovies(updatedMovies);
    saveMovies(updatedMovies);
    
    // Cleanup views
    const views = getViews();
    const updatedViews = views.filter(v => v.movieId !== showDeleteConfirm);
    localStorage.setItem('cinehub_views', JSON.stringify(updatedViews));

    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-white">Manage Movies</h1>
        <button 
          onClick={() => setEditingMovie({})} 
          className="bg-primary-container text-white px-4 py-2 rounded-lg font-bold hover:brightness-110 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add Movie
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="bg-surface-container-low rounded-xl overflow-hidden border border-white/5 flex flex-col group">
            <div className="aspect-[2/3] relative">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                <button 
                  onClick={() => setEditingMovie(movie)}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg font-bold hover:bg-white/30 backdrop-blur-sm"
                >
                  Edit Movie
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(movie.id)}
                  className="bg-red-600/80 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 backdrop-blur-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white line-clamp-1">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-surface-container-high p-8 rounded-xl border border-white/10 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Delete Movie</h2>
            <p className="text-gray-400 mb-8">Are you sure you want to delete this movie? This action cannot be undone and will remove associated analytics.</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 text-white font-bold hover:bg-white/5 rounded-lg">Cancel</button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {editingMovie && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high p-8 rounded-xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">{editingMovie.id ? 'Edit Movie' : 'Add New Movie'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input required name="title" defaultValue={editingMovie.title} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Year</label>
                  <input required name="year" defaultValue={editingMovie.year} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration (e.g. 2h 15m)</label>
                  <input required name="duration" defaultValue={editingMovie.duration} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Rating (0-10)</label>
                  <input required name="rating" type="number" step="0.1" defaultValue={editingMovie.rating} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Genres (comma separated)</label>
                  <input required name="genres" defaultValue={editingMovie.genres?.join(', ')} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Poster URL</label>
                  <input required name="posterUrl" defaultValue={editingMovie.posterUrl} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Backdrop URL</label>
                  <input required name="backdropUrl" defaultValue={editingMovie.backdropUrl} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Trailer URL (YouTube)</label>
                  <input name="trailerUrl" defaultValue={editingMovie.trailerUrl} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Movie URL</label>
                  <input name="fullMovieUrl" defaultValue={editingMovie.fullMovieUrl} className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea required name="description" defaultValue={editingMovie.description} rows="4" className="w-full bg-surface border border-white/10 rounded-lg p-2.5 text-white resize-none"></textarea>
                </div>
                <div className="md:col-span-2 flex gap-6">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input type="checkbox" name="isTrending" defaultChecked={editingMovie.isTrending} className="rounded bg-surface border-white/10 text-red-600 focus:ring-red-600" />
                    Trending
                  </label>
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input type="checkbox" name="isNew" defaultChecked={editingMovie.isNew} className="rounded bg-surface border-white/10 text-red-600 focus:ring-red-600" />
                    New Release
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setEditingMovie(null)} className="px-6 py-2 text-white font-bold hover:bg-white/5 rounded-lg">Cancel</button>
                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Save Movie</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
