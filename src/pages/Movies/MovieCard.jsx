import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-amber-500/10">
      <Link
        to={`/movies/${movie._id}`}
        aria-label={movie.name || "View movie details"}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        {/* Poster Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
          <img
            src={movie.image}
            alt={movie.name || "Movie poster"}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Bottom Gradient Scrim for Readable Title */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95"
          />

          {/* Year Badge (if available) */}
          {movie.year && (
            <span className="absolute right-3 top-3 rounded-lg border border-slate-700/80 bg-slate-950/85 px-2.5 py-1 text-xs font-semibold text-amber-400 backdrop-blur-sm">
              {movie.year}
            </span>
          )}

          {/* Movie Title & Cue */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="line-clamp-2 text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-amber-400">
              {movie.name}
            </h3>
            <span className="mt-1.5 inline-flex items-center text-xs font-semibold text-amber-400 opacity-90 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default MovieCard;