
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import LoginForm from '@/components/authentication/LoginForm';

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 mb-5">
          <div className="w-10 h-10 bg-fleximov-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">FM</span>
          </div>
          <h1 className="text-2xl font-bold">Fleximov Delivery Hub</h1>
        </div>
        <p className="text-muted-foreground">
          The complete delivery management platform for your business
        </p>
      </div>
      
      <LoginForm />
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-fleximov-500 hover:text-fleximov-600">
          Contact us to get started
        </a>
      </p>
    </div>
  );
};

export default Login;
