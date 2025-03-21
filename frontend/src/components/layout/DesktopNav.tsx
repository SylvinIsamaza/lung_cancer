
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";

interface DesktopNavProps {
  navigationLinks: Array<{ href: string; label: string }>;
  authenticatedLinks: Array<{ href: string; label: string }>;
  isLoggedIn: boolean;
  handleLogout: () => void;
  isActiveLink: (href: string) => boolean;
}

const DesktopNav = ({ 
  navigationLinks, 
  authenticatedLinks, 
  isLoggedIn, 
  handleLogout, 
  isActiveLink 
}: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <div className="flex space-x-6">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            isActive={isActiveLink(link.href)}
          />
        ))}
        
        {isLoggedIn && authenticatedLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            isActive={isActiveLink(link.href)}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>

            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
