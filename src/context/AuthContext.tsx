import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name: string;
  email: string;
  baseline: number | null;
  goal: number | null;
  progress: number;
  badges: string[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  saveBaseline: (score: number) => void;
  setGoal: (target: number) => void;
  logAction: (reduction: number) => void;
  unlockBadge: (badgeId: string) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load mock session from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('carbonly_mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, name: string = 'User') => {
    const savedUserStr = localStorage.getItem('carbonly_mock_user');
    let mockUser: User = { email, name, baseline: null, goal: null, progress: 0, badges: [] };
    
    if (savedUserStr) {
      const savedUser = JSON.parse(savedUserStr);
      if (savedUser.email === email) {
        mockUser = savedUser;
      }
    }
    
    setUser(mockUser);
    localStorage.setItem('carbonly_mock_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carbonly_mock_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('carbonly_mock_user', JSON.stringify(updatedUser));
  };

  const saveBaseline = (score: number) => updateUser({ baseline: score });
  const setGoal = (target: number) => updateUser({ goal: target });
  const logAction = (reduction: number) => updateUser({ progress: (user?.progress || 0) + reduction });
  const unlockBadge = (badgeId: string) => {
    if (!user?.badges.includes(badgeId)) {
      updateUser({ badges: [...(user?.badges || []), badgeId] });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, saveBaseline, setGoal, logAction, unlockBadge, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
