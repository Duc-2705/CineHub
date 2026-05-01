import { useState, useEffect, useMemo } from 'react';
import { getUsers, saveUsers } from '../../utils/dataStore';
import { useAuth } from '../../hooks/useAuth';

export default function AdminUsers() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;
    const lower = debouncedSearch.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(lower) || 
      u.email.toLowerCase().includes(lower)
    );
  }, [users, debouncedSearch]);

  const handleToggleStatus = (userId) => {
    if (userId === currentUser.id) return; // Prevent self-lock
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'locked' ? 'active' : 'locked' };
      }
      return u;
    });
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const handleToggleRole = (userId) => {
    if (userId === currentUser.id) return; // Prevent self-demotion
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return { ...u, role: u.role === 'admin' ? 'user' : 'admin' };
      }
      return u;
    });
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-lg text-white">Manage Users</h1>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-surface-container border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-1 focus:ring-red-600 outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container border-b border-white/5">
            <tr>
              <th className="p-4 text-gray-400 font-label-md">Name</th>
              <th className="p-4 text-gray-400 font-label-md">Email</th>
              <th className="p-4 text-gray-400 font-label-md">Role</th>
              <th className="p-4 text-gray-400 font-label-md">Status</th>
              <th className="p-4 text-gray-400 font-label-md text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-bold">{user.name}</td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-600/20 text-purple-500' : 'bg-surface-container text-gray-400'}`}>
                    {user.role || 'user'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.status === 'locked' ? 'bg-red-600/20 text-red-500' : 'bg-green-600/20 text-green-500'}`}>
                    {user.status || 'active'}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button 
                    onClick={() => handleToggleRole(user.id)}
                    disabled={user.id === currentUser.id}
                    className={`px-3 py-1.5 rounded text-sm font-bold border transition-colors ${user.id === currentUser.id ? 'opacity-50 cursor-not-allowed border-white/5 text-gray-500' : 'border-white/10 text-white hover:bg-surface-container-high'}`}
                  >
                    Toggle Role
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(user.id)}
                    disabled={user.id === currentUser.id}
                    className={`px-3 py-1.5 rounded text-sm font-bold border transition-colors ${user.id === currentUser.id ? 'opacity-50 cursor-not-allowed border-white/5 text-gray-500' : user.status === 'locked' ? 'border-green-600/50 text-green-500 hover:bg-green-600/10' : 'border-red-600/50 text-red-500 hover:bg-red-600/10'}`}
                  >
                    {user.status === 'locked' ? 'Unlock' : 'Lock'}
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
