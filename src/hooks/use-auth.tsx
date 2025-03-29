
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser } from '@/types';
import { toast as sonnerToast } from "sonner";
import { AuthContextType } from '@/types/auth';
import { fetchUserProfile } from '@/utils/auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to refresh user data
  const refreshUser = async () => {
    if (session?.user?.id) {
      const userData = await fetchUserProfile(session.user.id, session);
      if (userData) {
        setUser(userData);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        setSession(currentSession);

        if (currentSession?.user) {
          // Use setTimeout to prevent potential deadlocks
          setTimeout(async () => {
            const userData = await fetchUserProfile(currentSession.user.id, currentSession);
            setUser(userData);
            setIsLoading(false);
            if (event === 'SIGNED_IN') {
              navigate('/dashboard');
            }
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession);
      setSession(currentSession);

      if (currentSession?.user) {
        const userData = await fetchUserProfile(currentSession.user.id, currentSession);
        setUser(userData);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error details:', error);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        sonnerToast.error("Login Failed", {
          description: error.message,
        });
        throw error;
      }
      
      if (data.user) {
        console.log('Login successful:', data.user);
        toast({
          title: "Login Successful",
          description: `Welcome back!`,
        });
        sonnerToast.success("Login Successful", {
          description: "Welcome back!",
        });
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, userData: Partial<AppUser>) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.name,
            role: userData.role || 'customer',
            partner_type: userData.partnerType,
          },
        },
      });
      
      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Sign Up Successful",
        description: "Your account has been created. Please verify your email if required.",
      });
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session,
        isLoading, 
        login, 
        signup,
        logout, 
        isAuthenticated: !!session,
        refreshUser
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

export { useRole } from './use-role';
