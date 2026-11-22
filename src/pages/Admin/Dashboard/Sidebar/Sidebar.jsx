import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin/movies/dashboard" },
  { label: "Create Movie", to: "/admin/movies/create" },
  { label: "Create Genre", to: "/admin/movies/genre" },
  { label: "Update Movie", to: "/admin/movies-list" },
  { label: "Comments", to: "/admin/movies/comments" },
];

const Sidebar = () => {
  return (
    <aside
      aria-label="Admin navigation"
      className="w-full shrink-0 border-b border-slate-800/80 bg-slate-950/95 text-slate-100 backdrop-blur-md lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r"
    >
      <div className="flex flex-col px-4 py-4 lg:h-full lg:px-4 lg:py-7">
        {/* Sidebar Header */}
        <div className="mb-3 flex items-center justify-between px-2 lg:mb-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
              Admin Panel
            </span>
            <h2 className="text-base font-bold tracking-tight text-white">
              Studio Console
            </h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;