
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/data/mock-data';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define the demo accounts we want to show with English translations
  const demoAccounts = [
    { name: "Bambang Supratman (Admin)", email: "bambang@fleximov.com" },
    { name: "Joko Widodo (Fleet Partner)", email: "joko@surabayaexpress.com" },
    { name: "Agus Santoso (Independent Courier)", email: "agus@surabayamart.com" },
    { name: "Siti Rahayu (Business Partner)", email: "siti@eastjavacourier.com" },
    { name: "Budi Setiawan (Driver)", email: "budi@gmail.com" },
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
              <a href="#" className="text-sm text-fleximov-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Demo Accounts (use password: 'password'):</p>
            <ul className="mt-2 space-y-1">
              {demoAccounts.map((account, index) => (
                <li key={index} className="text-xs">
                  <button
                    type="button"
                    className="text-fleximov-500 hover:underline"
                    onClick={() => setEmail(account.email)}
                  >
                    {account.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-fleximov-500 hover:bg-fleximov-600"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
