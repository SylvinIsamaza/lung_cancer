
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-primary font-semibold text-xl">LungCancer</span>
      <span className="text-medical-600 font-bold text-xl">Risk</span>
    </Link>
  );
};

export default NavLogo;
