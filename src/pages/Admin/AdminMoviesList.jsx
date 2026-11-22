import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full shrink-0 md:w-64">
        <Sidebar />
      </aside>
      <div className="min-w-0 flex-1 p-4">
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Movies Catalog
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage titles, review summaries, and update movie details.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
            <span>All Movies</span>
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
              {movies?.length ?? 0}
            </span>
          </div>
        </div>

        {/* Responsive Card Grid */}
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <article
                key={movie._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-slate-900/90"
              >
                {/* Poster Image */}
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="relative block aspect-video w-full overflow-hidden bg-slate-950"
                >
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </Link>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="line-clamp-1 text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-amber-400"
                    >
                      {movie.name}
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                      {movie.detail}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-5 border-t border-slate-800/80 pt-4">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-500/20 transition-all duration-200 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-14 text-center">
            <p className="text-sm text-slate-400">No movies found in the catalog yet.</p>
          </div>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;

