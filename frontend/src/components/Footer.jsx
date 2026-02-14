import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

const Footer = () => {
  return (
    <footer className="border-t border-ink/10 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8" />
              <span className="font-display font-semibold">ConnectWell</span>
            </div>
            <p className="text-xs text-ink/60">Strengthening human connection and emotional well-being.</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-ink/70">
              <li><NavLink to="/features" className="hover:text-mint transition">Features</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-mint transition">Pricing</NavLink></li>
              <li><NavLink to="/security" className="hover:text-mint transition">Security</NavLink></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-ink/70">
              <li><NavLink to="/about" className="hover:text-mint transition">About</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-mint transition">Blog</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-mint transition">Contact</NavLink></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-ink/70">
              <li><NavLink to="/privacy" className="hover:text-mint transition">Privacy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-mint transition">Terms</NavLink></li>
              <li><NavLink to="/help" className="hover:text-mint transition">Help</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-ink/10 pt-8 text-center text-sm text-ink/60">
          <p>&copy; 2026 ConnectWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
