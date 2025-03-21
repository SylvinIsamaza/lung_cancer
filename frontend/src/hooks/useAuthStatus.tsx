
import { useState, useEffect } from "react";
import { getCurrentUser, logoutUser } from "@/services/api";
import { toast } from "sonner";

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const tokenExists = localStorage.getItem("token") !== null;
     
      
      // If token exists, verify with the API
      if (tokenExists ) {
        try {
          const response = await getCurrentUser();
          if (response.success) {
            setIsLoggedIn(true);
          } else {
            // If API call fails, user is not authenticated
            setIsLoggedIn(false);
            // Clear invalid token
            localStorage.removeItem("token");
     
          }
        } catch (error) {
          
          console.error("Auth check error:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      
      setIsLoading(false);
    };
    
    checkLoginStatus();
    
    // Add event listener for login status changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isLoggedIn" || event.key === "token") {
        checkLoginStatus();
      }
    };
    
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("storage", handleStorageChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  return { isLoggedIn, isLoading, handleLogout };
}
