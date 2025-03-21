
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useAuthStatus();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Navigation links
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/assessment", label: "Risk Assessment" },
    { href: "/education", label: "Education" },
  ];
  
  // Authenticated links
  const authenticatedLinks = [
    // { href: "/dashboard", label: "Dashboard" },
  ];

  // Check if the current path is the active link
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <NavLogo />
        
        {/* Desktop Navigation */}
        <DesktopNav 
          navigationLinks={navigationLinks}
          authenticatedLinks={authenticatedLinks}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isActiveLink={isActiveLink}
        />
        
        {/* Mobile Navigation */}
        {isMobile && (
          <MobileNav 
            navigationLinks={navigationLinks}
            authenticatedLinks={authenticatedLinks}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            isActiveLink={isActiveLink}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
