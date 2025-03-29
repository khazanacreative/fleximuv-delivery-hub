
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
      try {
        const userData = await fetchUserProfile(session.user.id, session);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error refreshing user:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email || 'No user');
        
        // Update session state immediately
        setSession(currentSession);

        if (currentSession?.user) {
          // Defer profile fetching to prevent deadlocks
          setTimeout(async () => {
            try {
              const userData = await fetchUserProfile(currentSession.user.id, currentSession);
              console.log('User profile fetched:', userData);
              setUser(userData);
              
              if (event === 'SIGNED_IN') {
                console.log('User signed in, navigating to dashboard');
                navigate('/dashboard');
                sonnerToast.success("Login Successful", {
                  description: "Welcome back!",
                });
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
            } finally {
              setIsLoading(false);
            }
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
          if (event === 'SIGNED_OUT') {
            console.log('User signed out');
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log('Initial session check:', currentSession?.user?.email || 'No session');
      
      // Update session state
      setSession(currentSession);

      if (currentSession?.user) {
        try {
          const userData = await fetchUserProfile(currentSession.user.id, currentSession);
          console.log('Initial user profile:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching initial user profile:', error);
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string): Promise<void> => {
    console.log('Login attempt with email:', email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
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
      
      console.log('Login successful:', data.user?.email);
      // Return void instead of data to match the expected return type
    } catch (error: any) {
      console.error('Login error details:', error);
      throw error;
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
