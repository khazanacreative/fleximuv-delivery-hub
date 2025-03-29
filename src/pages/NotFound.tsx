
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-fleximov-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you are looking for cannot be found</p>
        <Button 
          onClick={() => navigate("/dashboard")}
          className="bg-fleximov-500 hover:bg-fleximov-600"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
