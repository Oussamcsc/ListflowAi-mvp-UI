import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isOnboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual API call
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      const mockUser: User = {
        id: '1',
        email,
        name,
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate OAuth flow
      
      const mockUser: User = {
        id: '1',
        email: 'user@gmail.com',
        name: 'Google User',
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithMicrosoft = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Microsoft OAuth
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate OAuth flow
      
      const mockUser: User = {
        id: '1',
        email: 'user@outlook.com',
        name: 'Microsoft User',
        isOnboarded: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Microsoft login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Password reset email sent to:', email);
    } catch (error) {
      throw new Error('Failed to send password reset email. Please try again.');
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    loginWithGoogle,
    loginWithMicrosoft,
    resetPassword,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};