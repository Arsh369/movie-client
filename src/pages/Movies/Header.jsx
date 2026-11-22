import { NavLink } from "react-router-dom";
import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <header className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Quick Header Navigation */}
          <nav
            aria-label="Header quick links"
            className="flex flex-row items-center gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2 lg:col-span-3 lg:flex-col lg:items-stretch lg:p-3"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                    : "text-slate-300 hover:bg-slate-800/90 hover:text-amber-300"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/25"
                    : "text-slate-300 hover:bg-slate-800/90 hover:text-amber-300"
                }`
              }
            >
              Browse Movies
            </NavLink>
          </nav>

          {/* Featured New Releases Carousel */}
          <div className="min-w-0 lg:col-span-9">
            <SliderUtil data={data} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;