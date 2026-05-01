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

  // Persistence: Restore user on load and ensure default admin
  useEffect(() => {
    // Seed default admin if it doesn't exist
    let users = JSON.parse(localStorage.getItem('cinehub_users') || '[]');
    const adminExists = users.some(u => u.email === 'admin@cinehub.com');
    if (!adminExists) {
      const defaultAdmin = {
        id: 'admin_0',
        name: 'Admin',
        email: 'admin@cinehub.com',
        passwordHash: hashPassword('admin123'),
        role: 'admin',
        status: 'active',
        subscription: null
      };
      users.push(defaultAdmin);
      localStorage.setItem('cinehub_users', JSON.stringify(users));
    }

    const storedUser = localStorage.getItem('cinehub_current_user');
    if (storedUser) {
      // Refresh user data from db to get latest status/role
      const parsedUser = JSON.parse(storedUser);
      const dbUser = users.find(u => u.email === parsedUser.email);
      if (dbUser && dbUser.status !== 'locked') {
        const userData = { id: dbUser.id, name: dbUser.name, email: dbUser.email, subscription: dbUser.subscription, role: dbUser.role, status: dbUser.status };
        setCurrentUser(userData);
      } else {
        localStorage.removeItem('cinehub_current_user');
      }
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

    if (user.status === 'locked') {
      throw new Error('Your account has been locked. Please contact support.');
    }

    const userData = { id: user.id, name: user.name, email: user.email, subscription: user.subscription, role: user.role || 'user', status: user.status || 'active' };
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
      passwordHash: hashPassword(password),
      role: 'user',
      status: 'active'
    };

    users.push(newUser);
    localStorage.setItem('cinehub_users', JSON.stringify(users));

    const userData = { id: newUser.id, name: newUser.name, email: newUser.email, subscription: null, role: newUser.role, status: newUser.status };
    setCurrentUser(userData);
    localStorage.setItem('cinehub_current_user', JSON.stringify(userData));
    return userData;
  };

  const updateSubscription = async (subscriptionData) => {
    if (!currentUser) return;
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const updatedUser = { ...currentUser, subscription: subscriptionData };
    setCurrentUser(updatedUser);
    localStorage.setItem('cinehub_current_user', JSON.stringify(updatedUser));

    // Also update in users array
    const users = JSON.parse(localStorage.getItem('cinehub_users') || '[]');
    const userIndex = users.findIndex((u) => u.email === updatedUser.email);
    if (userIndex !== -1) {
      users[userIndex].subscription = subscriptionData;
      localStorage.setItem('cinehub_users', JSON.stringify(users));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cinehub_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading, updateSubscription }}>
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
