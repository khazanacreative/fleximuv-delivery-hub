
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting to login with:', { email, passwordProvided: !!password });
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Attempt login with clear console logs
      console.log(`Login form submitting with email: ${email}`);
      await login(email, password);
      console.log('Login function completed successfully');
      
      // Navigation happens in the auth provider after successful login
    } catch (error: any) {
      console.error('Login form error:', error);
      toast.error('Login failed', {
        description: error.message || 'Please check your credentials and try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Set both email and password when selecting a demo account
  const handleDemoAccountClick = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    toast.info(`Demo account selected`, {
      description: `Email: ${demoEmail}, Password: password123`
    });
  };

  // Define the demo accounts
  const demoAccounts = [
    { name: "Bambang Supratman (Admin)", email: "admin@fleximov.com" },
    { name: "Joko Widodo (Fleet Partner)", email: "fleet@partner.com" },
    { name: "Agus Santoso (Independent Courier)", email: "courier@partner.com" },
    { name: "Siti Rahayu (Business Partner)", email: "business@partner.com" },
    { name: "Budi Setiawan (Driver)", email: "driver@fleximov.com" },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Login to Fleximov</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" size="sm" className="p-0 h-auto text-xs text-fleximov-500" asChild>
                <a href="#" className="text-sm">Forgot password?</a>
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Test Accounts (password: password123):</p>
            <ul className="mt-2 space-y-1">
              {demoAccounts.map((account, index) => (
                <li key={index} className="text-xs">
                  <button
                    type="button"
                    className="text-fleximov-500 hover:underline"
                    onClick={() => handleDemoAccountClick(account.email)}
                  >
                    {account.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-fleximov-500 hover:bg-fleximov-600"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button 
              variant="link" 
              className="p-0 h-auto text-fleximov-500"
              type="button"
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
