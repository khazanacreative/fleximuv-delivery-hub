
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import LoginForm from '@/components/authentication/LoginForm';
import RegisterDialog from '@/components/authentication/RegisterDialog';
import { useState } from 'react';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center mb-8">
        <Link to="/landing" className="inline-flex items-center justify-center gap-2 mb-5">
        <div className="w-10 h-10 bg-fleximuv-500 rounded-md flex items-center justify-center">
            <img src="https://www.svgrepo.com/show/34953/courier.svg" alt="Courier Icon" className="w-6 h-6 text-white" />
          </div>
        <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold font-display">FlexiMuv</h1>
            <span className="text-sm tracking-wide leading-tight text-muted-foreground">Delivery Hub</span>
          </div>
        </Link>
        <p className="text-muted-foreground">
          The complete delivery management platform for your business
        </p>
      </div>
      
      <LoginForm />
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <button 
          onClick={() => setRegisterOpen(true)}
          className="font-medium text-fleximuv-500 hover:text-fleximuv-600"
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
