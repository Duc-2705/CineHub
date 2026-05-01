import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Simple hash function for demo purposes
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Persistence: Restore user on load
  useEffect(() => {
    const storedUser = localStorage.getItem('cinehub_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = JSON.parse(localStorage.getItem('cinehub_users') || '[]');
    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.passwordHash !== hashPassword(password)) {
      throw new Error('Invalid email or password');
    }

    const userData = { id: user.id, name: user.name, email: user.email };
    setCurrentUser(userData);
    localStorage.setItem('cinehub_current_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = JSON.parse(localStorage.getItem('cinehub_users') || '[]');
    
    if (users.some((u) => u.email === email)) {
      throw new Error('Email is already registered');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash: hashPassword(password)
    };

    users.push(newUser);
    localStorage.setItem('cinehub_users', JSON.stringify(users));

    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setCurrentUser(userData);
    localStorage.setItem('cinehub_current_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cinehub_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
