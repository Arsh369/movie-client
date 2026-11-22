import { useEffect, useRef, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2"
    >
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-800/90 bg-slate-900/90 px-3 py-2 text-slate-100 shadow-2xl shadow-black/70 backdrop-blur-md">
        {/* Primary Routes */}
        <div className="flex items-center gap-1.5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <AiOutlineHome size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <MdOutlineLocalMovies size={20} />
            <span>Movies</span>
          </NavLink>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-800" aria-hidden="true" />

        {/* Account / Auth Controls */}
        {userInfo ? (
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-500/50 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-400">
                {userInfo.username?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <span className="max-w-[6.5rem] truncate">
                {userInfo.username}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-amber-400" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul
                role="menu"
                className="absolute bottom-full right-0 mb-3 w-48 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 p-1.5 text-sm text-slate-200 shadow-2xl shadow-black/70 backdrop-blur-md"
              >
                {userInfo.isAdmin && (
                  <li role="none">
                    <Link
                      role="menuitem"
                      to="/admin/movies/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-xl px-3.5 py-2 font-medium text-amber-400 transition hover:bg-slate-800 hover:text-amber-300"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                <li role="none">
                  <Link
                    role="menuitem"
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-xl px-3.5 py-2 font-medium transition hover:bg-slate-800 hover:text-white"
                  >
                    Profile
                  </Link>
                </li>

                <li
                  role="none"
                  className="my-1 border-t border-slate-800/80 pt-1"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={logoutHandler}
                    className="block w-full rounded-xl px-3.5 py-2 text-left font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <AiOutlineLogin size={19} />
              <span>Login</span>
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                    : "border border-slate-700/80 bg-slate-950/70 text-slate-200 hover:border-amber-500/50 hover:text-amber-300"
                }`
              }
            >
              <AiOutlineUserAdd size={19} />
              <span className="hidden sm:inline">Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;