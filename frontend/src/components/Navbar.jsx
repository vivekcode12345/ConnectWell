import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Logo from "./Logo.jsx";

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-ink text-sand"
      : "text-ink/70 hover:text-ink hover:bg-white/70"
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-sand/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <p className="font-display text-xl">ConnectWell</p>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              be seen. be heard.
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/mood" className={navClass}>
                Check-In
              </NavLink>
              <NavLink to="/communities" className={navClass}>
                Communities
              </NavLink>
              <NavLink to="/tone" className={navClass}>
                Tone
              </NavLink>
              <button
                onClick={logout}
                className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink hover:border-ink"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
