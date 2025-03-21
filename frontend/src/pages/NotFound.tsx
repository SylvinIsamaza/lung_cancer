
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-xl text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-medical-100 rounded-full flex items-center justify-center">
          <span className="text-medical-600 text-4xl font-bold">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <NavLink to="/">
          <Button className="bg-medical-600 hover:bg-medical-700 w-full">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
