import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'admin' | 'naac_coordinator' | 'faculty' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@demo.com': {
    password: 'demo123',
    user: { id: '1', email: 'admin@demo.com', name: 'Dr. Keshav Patidar', role: 'admin', department: 'Administration' },
  },
  'naac@demo.com': {
    password: 'demo123',
    user: { id: '2', email: 'naac@demo.com', name: 'Dr. Brijendra Kumar Joshi', role: 'naac_coordinator', department: 'IQAC Cell' },
  },
  'faculty@demo.com': {
    password: 'demo123',
    user: { id: '3', email: 'faculty@demo.com', name: 'Dr. Shweta Agrawal', role: 'faculty', department: 'Artificial Intelligence and Machine Learning' },
  },
  'student@demo.com': {
    password: 'demo123',
    user: { id: '4', email: 'student@demo.com', name: 'Manasvi Gangrade', role: 'student', department: 'Artificial Intelligence and Machine Learning' },
  },
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('csr_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const entry = DEMO_USERS[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.user);
      localStorage.setItem('csr_user', JSON.stringify(entry.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('csr_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
