
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mock-data';
import { User, UserRole } from '../types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('fleximov_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple mock authentication
    if (password !== 'password') {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      toast({
        title: "Login Failed",
        description: "User not found",
        variant: "destructive",
      });
      setIsLoading(false);
      throw new Error('User not found');
    }
    
    setUser(foundUser);
    localStorage.setItem('fleximov_user', JSON.stringify(foundUser));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${foundUser.name}!`,
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fleximov_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        logout, 
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRole = (role: UserRole | UserRole[]) => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};
