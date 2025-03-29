
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser } from '@/types';
import { toast as sonnerToast } from "sonner";

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<AppUser>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to fetch user profile data 
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          name: data.full_name || '',
          email: session?.user?.email || '',
          phone: data.phone || '',
          role: data.role as any, 
          avatar: data.avatar_url,
          createdAt: new Date(data.created_at),
          balance: data.balance || 0,
          partnerType: data.partner_type as any,
          status: data.status as any,
          hasDrivers: data.has_drivers,
          canEditOrders: data.can_edit_orders,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  // Function to refresh user data
  const refreshUser = async () => {
    if (session?.user?.id) {
      const userData = await fetchUserProfile(session.user.id);
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
            const userData = await fetchUserProfile(currentSession.user.id);
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
        const userData = await fetchUserProfile(currentSession.user.id);
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
      // Create the user in Supabase Auth
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

export const useRole = (role: string | string[]) => {
  const { user } = useAuth();
  
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};
