
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import LoginForm from '@/components/authentication/LoginForm';
import { useState, useEffect } from 'react';
import RegisterDialog from '@/components/authentication/RegisterDialog';

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);

  // Add additional debug logging
  useEffect(() => {
    console.log('Login page: Authentication status -', isAuthenticated ? 'Authenticated' : 'Not authenticated');
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-fleximov-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('Redirecting to dashboard from login page');
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center mb-8">
        <Link to="/landing" className="inline-flex items-center justify-center gap-2 mb-5">
          <div className="w-10 h-10 bg-fleximov-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">FM</span>
          </div>
          <h1 className="text-2xl font-bold">Fleximov Delivery Hub</h1>
        </Link>
        <p className="text-muted-foreground">
          The complete delivery management platform for your business
        </p>
      </div>
      
      <LoginForm />
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Need a business account?{' '}
        <button 
          onClick={() => setRegisterOpen(true)}
          className="font-medium text-fleximov-500 hover:text-fleximov-600"
        >
          Contact us to get started
        </button>
      </p>

      <RegisterDialog 
        isOpen={registerOpen} 
        onOpenChange={setRegisterOpen} 
      />
    </div>
  );
};

export default Login;
