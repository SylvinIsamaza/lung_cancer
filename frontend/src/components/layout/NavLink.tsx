
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, isActive, onClick }: NavLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive 
          ? "text-medical-600 font-semibold" 
          : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;
