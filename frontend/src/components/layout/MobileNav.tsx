
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";

interface MobileNavProps {
  navigationLinks: Array<{ href: string; label: string }>;
  authenticatedLinks: Array<{ href: string; label: string }>;
  isLoggedIn: boolean;
  handleLogout: () => void;
  isActiveLink: (href: string) => boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ 
  navigationLinks, 
  authenticatedLinks, 
  isLoggedIn, 
  handleLogout, 
  isActiveLink,
  isOpen,
  setIsOpen
}: MobileNavProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <NavLogo />
          
          <div className="flex flex-col space-y-3 mt-8">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActiveLink(link.href)}
                onClick={() => setIsOpen(false)}
              />
            ))}
            
            {isLoggedIn && authenticatedLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActiveLink(link.href)}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
          
          <div className="flex flex-col space-y-2 mt-auto mb-8">
            {isLoggedIn ? (
              <>
                <span className="text-sm font-medium text-muted-foreground py-2">
                  Logged in as: {localStorage.getItem("username") || "User"}
                </span>
                <Button variant="outline" onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
