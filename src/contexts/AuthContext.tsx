import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  fullName: string;
  createdAt: string;
  lastLogin?: string;
  loginCount: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: ProfileData) => Promise<void>;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = authService.getToken();
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      authService.setToken(response.token);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      const response = await authService.signup(userData);
      setUser(response.user);
      authService.setToken(response.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
    
    // Redirect to landing page
    const landingUrl = process.env.NODE_ENV === 'production' 
      ? 'https://flowgen-arc.vercel.app'
      : window.location.origin;
    
    window.location.href = landingUrl;
  };

  const updateProfile = async (profileData: ProfileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}