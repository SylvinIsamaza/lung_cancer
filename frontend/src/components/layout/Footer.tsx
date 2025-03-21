
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-gray-50/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-medical-600 text-white flex items-center justify-center">
                <span className="font-bold">LC</span>
              </div>
              <span className="font-semibold text-lg">LungCheck</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              An advanced tool for lung cancer risk assessment, designed to help you understand your potential risk factors.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-sm hover:text-medical-600 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/assessment" className="text-sm hover:text-medical-600 transition-colors">
                  Risk Assessment
                </NavLink>
              </li>
              <li>
                <NavLink to="/education" className="text-sm hover:text-medical-600 transition-colors">
                  Education
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-sm hover:text-medical-600 transition-colors">
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/terms" className="text-sm hover:text-medical-600 transition-colors">
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className="text-sm hover:text-medical-600 transition-colors">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/disclaimer" className="text-sm hover:text-medical-600 transition-colors">
                  Medical Disclaimer
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm">support@lungcheck.example</li>
              <li className="text-sm">+1 (555) 123-4567</li>
              <li className="text-sm">123 Medical Plaza, Suite 400</li>
              <li className="text-sm">San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} LungCheck. All rights reserved.</p>
          <p className="mt-2 md:mt-0">This is a predictive tool and not a medical diagnosis.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
